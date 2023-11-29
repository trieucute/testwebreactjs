import React, { useState, useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import ImageResize from 'quill-image-resize-module-react';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import firebaseConfig from '../../../firebase'; // Import cấu hình Firebase của bạn
import axiosAdmin from '../axois-admin';
import { useEffect } from 'react';
import LoadingAd from '../../loadingAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { fetchPostDetail } from '../../../reduxTool/newsSlice';


Quill.register('modules/imageResize', ImageResize);

const UpdateNews = () => {

  const navigate = useNavigate()
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [active, setActive] = useState('');

  const [img, setImg] = useState('');
  const [sum, setSum] = useState('');

  const [imageData, setImageData] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { postDetail, isLoading } = useSelector(state => state.news)
  const itemList = postDetail.data
  const { id } = useParams();

  useEffect(() => {
    console.log("dispatch");
    dispatch(fetchPostDetail(id));
    window.scrollTo(0, 0);
  }, [])
  useEffect(()=>{
      setContent(postDetail.content)
      setTitle(postDetail.title)
      setActive(postDetail.active)
      setImg(postDetail.img)
      setSum(postDetail.summary)
  }, [postDetail])
  const handleEditorChange = (value) => {
    setContent(value);
  };

  const quillRef = useRef(null);
  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.on('text-change', (delta, oldDelta, source) => {
        if (source === 'user') {
          const insertedImage = delta.ops.find(op => op.insert && op.insert.image);
          if (insertedImage) {
            const imageData = insertedImage.insert.image;
            if (!imagesUploaded) {
              setImageData(prevData => [...prevData, imageData]);
            }
          }
        }
      });
    }
  }, [imagesUploaded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
  
    if(sum==='' || active==='' || content===''|| img===''|| title===''){
      setLoading(false)
      alert('Vui lòng nhập đầy đủ nội dung!')
      return
    }
      // Kiểm tra xem nội dung có chứa hình ảnh hay không
  const hasImage = /<img[^>]+>/g.test(content);

  if (!hasImage) {
    setLoading(false);
    alert('Vui lòng thêm hình ảnh trong khung nội dung!');
    return;
  }
    try {
      // Process and upload images in a batch
      if (!imagesUploaded && imageData.length > 0) {
        const newImageUrls = await Promise.all(imageData.map(uploadImageToFirebase));

        // Replace old image paths in the content with new URLs
        let updatedContent = content;
        imageData.forEach((oldImageData, index) => {
          updatedContent = updatedContent.replace(oldImageData, newImageUrls[index]);
        });

        setImagesUploaded(true);
        // Proceed with submission logic
        const postNew = {
          title: title,
          content: updatedContent,
          summary: sum,
          img: img,
          active: active,
        };
      
        // Make the API call with the updated data
        const res = await axiosAdmin.post(`/news/update/${id}`, postNew, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        navigate('/admin/news')
        console.log(res.data);
        setActive('');
        setContent('');
        setTitle('');
        setSum('');
        setImg('');
        setImageData([]);
        setLoading(false);
        // Reset form fields and show success message
        // ...
      }
      setImagesUploaded(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
      // Handle errors
      // ...
    } finally {
      setLoading(false);
      setImagesUploaded(false); // Đảm bảo rằng nếu có lỗi, trạng thái sẽ được reset
    }
  };

  // ... (rest of the component remains the same)
  
  const uploadImageToFirebase = async (imageData) => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);

    const timestamp = new Date().getTime();
    const fileExtension = 'png'; // Đổi phần này tùy thuộc vào định dạng hình ảnh bạn đang sử dụng
    const fileName = `${timestamp}_${Math.random()}.${fileExtension}`;
    const storageRef = ref(storage, 'images/' + fileName);
    const metadata = {
      contentType: 'image/' + fileExtension,
    };

    try {
      // Chuyển đổi dữ liệu base64 thành ArrayBuffer
      const arrayBuffer = Uint8Array.from(atob(imageData.split(',')[1]), c => c.charCodeAt(0));
      const fileBlob = new Blob([arrayBuffer], { type: `image/${fileExtension}` });

      await uploadBytes(storageRef, fileBlob, metadata);
      const imageUrl = await getDownloadURL(storageRef);
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const modules = {
    toolbar: [
      [{'header': [1, 2, 3, 4, 5, 6]}],
      // [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{'size': ['small', false, 'large', 'huge']}], 

      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'},
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'], [{ 'align': [] }],
      ['clean']
    ],
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize']
    }
  };

  const handleActiveChange = (e) => {
    const value = parseInt(e.target.value,10); // Chuyển giá trị sang kiểu number
    setActive(value); // Lưu giá trị đã chọn vào state
  };


  return (
    <div className='addNew-container'>
      {loading ? <LoadingAd/> : (
        <>
           <h3 className='h3-admin mb-4 text-center'> Cập nhật tin</h3>
      <form onSubmit={handleSubmit}  className='addNew-contents'>
        <div className='row m-0 justify-content-between'> 
          <div className='form-group'>
          <label htmlFor="">Tiêu đề</label>
          <input type="text" name='title' id='title' value={title}onChange={(e) => setTitle(e.target.value)}  className='form-control'/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Tóm tắt</label>
          <input type="text" name="summary" id='summary' value={sum}onChange={(e) => setSum(e.target.value)} className='form-control'/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Ảnh đại diện</label>
            <input name="image" type="file" accept='' onChange={(e) => setImg(e.target.files[0])}  className='form-control'/>
            <img src={postDetail.imgs} alt="" style={{width:"70px", height:"70px", marginTop:"1em",objectFit:"cover"}} />
          </div>
       
          <div className='form-group'>
            <label htmlFor="">Hiện / ẩn</label>
            <div className='form-control'>
            <input type="radio" name='active' id='active1' value={1} placeholder='active'  checked={active === 1}  onChange={handleActiveChange} /><label htmlFor="active1 m-0" onChange={handleActiveChange} style={{fontSize:"16px"}} >Hiện</label>
            <input type="radio" name='active' id='active0' value={0} placeholder='active'  checked={active === 0} onChange={handleActiveChange} /> <label htmlFor="active0 m-0" onChange={handleActiveChange} style={{fontSize:"16px"}} >Ẩn</label>
            </div>
            
          </div>
          <div className='form-group w-100'>
            <label htmlFor="">Nội dung</label>
          <ReactQuill
            theme="snow"
            value={content}
            onChange={handleEditorChange}
            modules={modules}
            ref={quillRef}
          />
            </div>

       
       <div className='form-group'><button className='btn-add' type="submit">Cập nhật</button></div>
       </div>
      </form>
        </>
      )}
   
      {/* <div>{content}</div> */}
    </div>
  );
};

export default UpdateNews;
