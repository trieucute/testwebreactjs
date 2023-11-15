// import React, { useState } from 'react';
// // import { CKEditor } from '@ckeditor/ckeditor5-react';
// // import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import { initializeApp } from 'firebase/app';
// import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// // import ImageResize from '@ckeditor/ckeditor5-image/src/imageresize';

// import { CKEditor } from 'ckeditor4-react';
// import firebaseConfig from '../../../firebase'; // Import your Firebase config
// import axiosAdmin from '../axois-admin';

// const AddNewsForm = () => {
//   // console.log(ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName ));
//   // ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName )
//   const [content, setContent] = useState('');
//   const [title, setTitle] = useState('');
//   const [img, setImg] = useState('');
//   const [sum, setSum] = useState('');
//   const [des, setDes] = useState('');

//   // const [content, setContent] = useState('');

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setContent(data);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle submission logic here
//     // console.log(content);
//     console.log(img);
//     const postNew= {
//       title: title,
//       content:content,
//       img:img,
//       summary:sum
//     }
//     axiosAdmin.post('/news',postNew,{
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//       })
//     .then(res=>{
//       console.log(res.data);
//     })
//     .catch(err=>{
//       console.error(err)
//     })
//   };

//   const app = initializeApp(firebaseConfig);
//   const storage = getStorage(app);

//   const uploadImage = async (file) => {
//     console.log('File nè:', file);
//     const timestamp = new Date().getTime();
    
//     // Kiểm tra xem file.name có giá trị không rỗng
//     const fileExtension = file.name ? file.name.split('.').pop() : 'jpg';
  
//     const fileName = `${timestamp}_${Math.random()}.${fileExtension}`;
//     const storageRef = ref(storage, 'images/' + fileName);
  
//     const metadata = {
//       contentType: file.type,
//     };
  
//     try {
//       await uploadBytes(storageRef, file, metadata);
//       const imageUrl = await getDownloadURL(storageRef);
//       console.log('img', imageUrl);
//     console.log('File nè:', file);

//       return imageUrl;
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       throw error;
//     }
//   };
  
//   function uploadAdapter(loader) {
//     return {
//       upload: async () => {
//         try {
//           // Đợi cho Promise được giải quyết trước khi log
//           const file = await loader.file;
//           console.log('Loader file:', file);
  
//           const imageUrl = await uploadImage(file);
          
//           return { default: imageUrl };
//         } catch (error) {
//           console.error('Error uploading image:', error);
//           throw error;
//         }
//       },
//     };
//   }
//   function uploadPlugin(editor) {
//     editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
//       console.log('Loader:', loader);
//       return uploadAdapter(loader);
//     };
//      // Thêm plugin ImageResize
//     //  editor.plugins.add(ImageResize)
//   }

//   return (
//     <div>
//       <h2>Add News</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input type="text" name='title' id='title' placeholder='title' onChange={(e)=>setTitle(e.target.value)}/>
//           <input type="text" name="summary" id='summary' placeholder='summary'onChange={(e)=>setSum(e.target.value)}  />
//           <input type="number" name='active'id='active' value={1} placeholder='active' />
//           {/* <input type="text" name='content 'id='content'  placeholder='content' onChange={(e)=>setDes(e.target.value)} /> */}

//           <input type="number" name='view' id='view' placeholder='view'  value={0}/>
//           <input type="file" accept='' onChange={(e)=>setImg(e.target.files[0])}/>
//           <h2>Using CKEditor 5 build in React</h2>
//           <CKEditor
       
//             // editor={ClassicEditor}   
//               config={{
//               extraPlugins: [uploadPlugin],
      
//             }}
//             data="<p>Hello from CKEditor 5!</p>"
//             onReady={(editor) => {
//               console.log('Editor is ready to use!', editor);
//             }}
//             onChange={handleEditorChange }
//             onFocus={(event, editor) => {
//               console.log('Focus.', editor);
//             }}
//           />
//         </div>
//         <button type="submit">Submit</button>
//       </form>
//       <div>{content}</div>
//     </div>
//   );
// };

// export default AddNewsForm;
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

Quill.register('modules/imageResize', ImageResize);

const AddNewsForm = () => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [active, setActive] = useState('');

  const [img, setImg] = useState('');
  const [sum, setSum] = useState('');

  const [imageData, setImageData] = useState([]);
  const [imagesUploaded, setImagesUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

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
        const res = await axiosAdmin.post('/news', postNew, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
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
           <h3 className='h3-admin mb-4 text-center'> Thêm tin mới</h3>
      <form onSubmit={handleSubmit}  className='addNew-contents'>
        <div className='row m-0 justify-content-between'> 
          <div className='form-group'>
          <label htmlFor="">Tiêu đề</label>
          <input type="text" name='title' id='title'onChange={(e) => setTitle(e.target.value)}  className='form-control'/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Tóm tắt</label>
          <input type="text" name="summary" id='summary'  onChange={(e) => setSum(e.target.value)} className='form-control'/>
          </div>
          <div className='form-group'>
            <label htmlFor="">Ảnh đại diện</label>
            <input type="file" accept='' onChange={(e) => setImg(e.target.files[0])}  className='form-control'/>
          </div>
       
          <div className='form-group'>
            <label htmlFor="">Hiện / ẩn</label>
            <div className='form-control'>
            <input type="radio" name='active' id='active1' value={1} placeholder='active'  checked={active === 1}  onChange={handleActiveChange} /><label htmlFor="active1 m-0" onChange={handleActiveChange} style={{fontSize:"16px"}} >Hiện</label>
            <input type="radio" name='active' id='active0' value={0} placeholder='active'    checked={active === 0} onChange={handleActiveChange} /> <label htmlFor="active0 m-0" onChange={handleActiveChange} style={{fontSize:"16px"}} >Ẩn</label>
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

       
       <div className='form-group'><button className='btn-add' type="submit">Thêm mới</button></div>
       </div>
      </form>
        </>
      )}
   
      {/* <div>{content}</div> */}
    </div>
  );
};

export default AddNewsForm;
