    import React, { useEffect, useState } from 'react';
    import axiosAdmin from './axois-admin.js';
    import { LineChart, Line, XAxis , YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,  BarChart,
        Bar,
        LabelList,
        Label,PieChart, Pie, Cell,   } from 'recharts';

    import { convertDateFormat } from '../../config.js';
    import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';
import { fetchnews } from '../../reduxTool/newsSlice.js';
import { useStateContext } from '../../context/ContextProvider.jsx';
import img from "../../assets/images/usernoavatar.png"
import { Tooltip as TooltipTrip } from 'react-tooltip';
import ReactPaginate from 'react-paginate';
    const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
        <div style={{ backgroundColor: 'white', padding: '5px', border: '1px solid #ccc' }}>
            <p>{`${data.city}: ${data.value}`}</p>
        </div>
        );
    }

    return null;
    };
    const DashBoard = () => {
    
       const {admin}= useStateContext()
    const [topTrip, setTopTrip]= useState('')
    const [detailTrip, setDetailTrip]= useState([])
console.log(admin);
    // const [day,setDay]= useState('')
    const [status, setStatus]=useState('')
    const fetchTripData = async () => {
        try {
        
        const tripResponse = await axiosAdmin.get('/statistical/trip');
        console.log(tripResponse.data.data );
        setTopTrip(tripResponse.data.data )
        return tripResponse ;
        } catch (error) {
        console.error('Error fetching trip data:', error);
        return null;
        }
    };
    const fetchTripDataDetail = async () => {
        try {
        const currentDate = new Date();
        const formattedDate = format(currentDate, 'dd/MM/yyyy');
        // setDay( formattedDate )
        const tripResponse = await axiosAdmin.post('/statisticalTripDetail/trip', {day: formattedDate });
        console.log(tripResponse.data.data );
        setDetailTrip(tripResponse.data.data )
        return tripResponse ;
        } catch (error) {
        console.error('Error fetching trip data:', error);
        return null;
        }
    };
    const dispatch= useDispatch()
    const { news} = useSelector(state => state.news)
    useEffect(()=>{
        fetchTripData()
        
        fetchTripDataDetail()
        dispatch(fetchnews());
    },[])
    const newLength= news?.length

    const handleSubmitTrip= async (e) => {
      e.preventDefault()
      const currentDate = new Date();
      const formattedDate = format(currentDate, 'dd/MM/yyyy');
    //   setDay( formattedDate )
      const data={
        day:formattedDate ,
        status:status
      }
      console.log(data,'data');
      try {
   
        const tripResponse = await axiosAdmin.post('/statisticalTripDetail/trip', data);
        console.log(tripResponse.data.data );
        setDetailTrip(tripResponse.data.data )
        return tripResponse ;
      } catch (error) {
        console.error('Error fetching trip data:', error);
        return null;
      }
    };

    const [perPage] = useState(7); // Số lượng xe hiển thị mỗi trang
    const [pageNumber, setPageNumber] = useState(0); // Số trang hiện tại
  
    const offset = pageNumber * perPage;
    const pageCount = Math.ceil(detailTrip?.length / perPage);
    const detailTripData = detailTrip?.slice(offset, offset + perPage);
  
    const handlePageClick = ({ selected }) => {
      setPageNumber(selected);
    };
  
    // const handleSearch = (e) => {
    //   const value = e.target.value;
    //   setSearchTerm(value);
    //   setPageNumber(0); // Reset trang khi thực hiện tìm kiếm
    // };

    const chartDataTripTop = Object.entries(topTrip).map(([city, value]) => ({ city , value}));


    const [comments, setComments] = useState([]);
    const [statistics, setStatistics] = useState({});
    // const [top5Provinces, setTop5Provinces] = useState([]);
    const [trip, setTrip] = useState({});


    useEffect(() => {
        const fetchData = async () => {
        try {
            const commentsResponse = await axiosAdmin.get('/comment');
            const statisticsResponse = await axiosAdmin.get('/statistics');
            // const top5ProvincesResponse = await axiosAdmin.get('/api/top5provinces');
            // const tripResponse = await axiosAdmin.get('ticketpro.deece.vn/api/statistical/trip');
            const tripData = await fetchTripData();


            setComments(commentsResponse.data.data);
            setStatistics(statisticsResponse.data.data);
            // setTop5Provinces(top5ProvincesResponse.data.data);
            setTrip(tripData.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []);
    //
    // biểu đo
    const chartData = statistics.tickets_sale_in_6_month
        ? Object.entries(statistics.tickets_sale_in_6_month).map(([month, tickets]) => ({
        x: month,
        y: tickets,
        }))
        : [];
    //biểu đồ hình tr
    const revenueData = [
        { angle: statistics.revenue?.daily || 0, label: `Hàng ngày `, color: '#FFA500' },
        { angle: statistics.revenue?.weekly || 0, label: `Hàng tuần `, color: '#2ecc71' },
        { angle: statistics.revenue?.monthly || 0, label: `Hàng tháng `, color: '#4339B4' },
    ];
    // bieu đồ lượng sóngg
console.log(admin);
    return (
        <div className='dashboard-admin'>
<div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <div  className='col'>
                <div
                className="square"
                style={{
                    width: '100%',
                 
               
                    borderRadius: '15px',
                    backgroundColor: '#4339B4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '10px',
                }}
                >
      
                    <i class="fas fa-comment" style={{fontSize:"30px", color:"white"}}></i>
                <div className="comment-count">
                    <p className='p-0 m-0'
                    style={{
                        fontWeight: 'bold',
                        padding: '0',
                        color: 'white'
                    }}
                    >
                    Tổng bình luận: <br />
                    {statistics.comment?.total}
                    </p>
                </div>
                </div>
            </div>

            <div  className='col'>
                <div
                className="square"
                style={{
                    width: '100%',
                 
               
                    borderRadius: '15px',
                    backgroundColor: '#4339B4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '10px',
                }}
                >
            
                    <i className="bx bx-user nav_icon" style={{fontSize:"30px", color:"white"}} />
                <div className="comment-count">
                    <p className='p-0 m-0'
                    style={{
                        fontWeight: 'bold',
                        padding: '5px',
                        color: 'white'
                    }}
                    >
                    Tổng tài xế: <br />
                    {statistics.driver?.total}
                    </p>
                </div>
                </div>
            </div>

            <div  className='col'>
                <div
                className="square"
                style={{
                    width: '100%',
                 
                 
                    borderRadius: '15px',
                    backgroundColor: '#4339B4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '10px',
                }}
                >
           
                <i class="fas fa-bus" style={{fontSize:"30px", color:"white"}}></i>
                <div className="comment-count">
                    <p className='p-0 m-0'
                    style={{
                        fontWeight: 'bold',
                        padding: '5px',
                        color: 'white'
                    }}
                    >
                    Tổng xe: <br />
                    {statistics.car?.total}
                    </p>
                </div>
                </div>
                
            </div>
            <div  className='col'>
                <div
                className="square"
                style={{
                    width: '100%',
                 
                 
                    borderRadius: '15px',
                    backgroundColor: '#4339B4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '10px',
                }}
                >
                {/* <i class="fas fa-newspaper"></i> */}
                <i class="fas fa-newspaper" style={{fontSize:"30px", color:"white"}}></i>
                <div className="comment-count">
                    <p className='p-0 m-0'
                    style={{
                        fontWeight: 'bold',
                        padding: '5px',
                        color: 'white'
                    }}
                    >
                    Tổng bài viết: <br />
                    {newLength}
                    </p>
                </div>
                </div>
                
            </div>
            <div className='col'>
                <div
                className="square"
                style={{
                    width: '100%',
                 
                    borderRadius: '15px',
                    backgroundColor: '#211B30',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    padding: '10px',
                }}
                >
           
                {/* <i class="fas fa-bus" style={{fontSize:"30px" , color:"white"}}></i> */}
                <div>
                    {admin.avatar===null &&<img src={img} alt=""  className='img-fuild'style={{width:"50px"}}/>}
                    {admin.avatar &&<img src={admin.avatar } alt="" className='img-fuild' style={{width:"50px"}}/>}

                    </div>
                <div className="comment-count">
                    <p className='p-0 m-0'
                    style={{
                        fontWeight: 'bold',
                        padding: '5px',
                        color: 'white'
                    }}
                    >
                    Admin <br />
                    {admin.name}
                    </p>
                </div>
                </div>
                
            </div>
            </div>
       
        <div style={{ display: 'flex' }}>

        {/* phần thống kê bên trái */}
        <div style={{ flex: '2 0 0', marginRight: '10px' }}>
            
        
    <h4 style={{ paddingTop: '30px' , fontWeight:"700"}}>Thống kê số lượng vé xuất trong 6 tháng đầu</h4>
    <BarChart
      width={600}
      height={400}
      data={chartData}
      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" tick={{ angle: 0 }} />
      <YAxis />
      <Tooltip />
      <Bar dataKey="y" fill="#4723D9">
        <LabelList dataKey="y" position="top" />
        {/* Thêm nhãn */}
        {chartData.map((entry, index) => (
          <Label
            key={`label-${index}`}
            content={entry.y}
            position="top"
            offset={5}
          />
        ))}
      </Bar>
    </BarChart>
<div className=' mt-3'>
    <h4 className='mb-3' style={{fontWeight:"700"}}>Thống kê doanh thu</h4>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                {revenueData.map(item => (
                <div key={item.label} style={{ marginRight: '10px' }}>
                    <div
                    style={{
                        backgroundColor: item.color,
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginRight: '5px',
                    }}
                    />
                    <span>{item.label}: {parseInt( item.angle).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                </div>
                ))}
            </div>
  <div className='m-auto row justify-content-center'><PieChart width={350} height={350}>
      <Pie
        data={revenueData}
        dataKey="angle"
        nameKey="label"
        cx="50%"
        cy="50%"
        outerRadius={150}
        fill="#8884d8"
        label={false} 
      >
        {revenueData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Legend />
    </PieChart>
    </div> 
     </div>
    
    <div>
    
                
    <div className='row mx-0 mt-5'>
            <h4 className='col ps-0' style={{fontWeight:"700"}}>Các chuyến xe trong ngày</h4>
            <div className='col'>
            <form className='row'>
            {/* <input type="date" name='day' className='form-control' style={{maxWidth:"40%", marginRight:"10px",float:"left"}} defaultValue={day}  onChange={e=>setDay(e.target.value)}/> */}
            <div className='form-group ' style={{width:"70%",marginRight:"10px",float:"left"}}>
            <select name="status" value={status}  id="" className='form-select'  onChange={e=>setStatus(e.target.value)}>
            <option value="">Tất cả</option>
                <option value="Chờ khởi hành">Chờ khởi hành</option>
                <option value="Đang khởi hành">Đang khởi hành</option>
                {/* <option value="Đã khởi hành">Đã hoàn thành</option> */}
            </select>
            </div>
            <div className='form-group w-25'>
            <button type='button' className='btn btn-add' onClick={handleSubmitTrip}>Tìm</button>
            </div>
            </form>
            </div>
    </div>
    <div className='mt-3'>
        <table className='table'>
            <thead>
                <th>Tuyến xe</th>
                <th>Trạng thái</th>
                <th>Số ghế đã dặt</th>
                <th>Tổng doanh thu</th>

            </thead>
            <tbody>
            {detailTripData && detailTripData.map((i,Index)=>(
                <tr>
                <td key={i.trip.id} id={`clickable-${i.trip.id}`}>{i.trip.start_station.name} ({i.trip.start_station.province}) =&gt; {i.trip.end_station.name} ({i.trip.end_station.province})</td>
                <td>{i.trip.status}</td>
                <td>{parseInt( i.total_seat_sold)} </td>
                <td>{parseInt( i.total_money).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </td>
                <TooltipTrip anchorSelect={`#clickable-${i.trip.id}`} clickable style={{background:"#4723D9", color:"white"}}>
                <div className='row'>
                <div className='col'>Xe</div>
                <div className='col'>{i.trip.car} </div>
                </div>
                <div className='row'>
                <div className='col'>Ngày khởi hành</div>
                <div className='col'>{convertDateFormat( i.trip.departure_time)} </div>
                </div>
                <div className='row'>
                <div className='col'>Tổng ghế</div>
                <div className='col'>{parseInt( i.total_seat)} </div>
                </div>
                </TooltipTrip>
                </tr>
             ))}
            </tbody>
        </table>
      
        <div>
       
        </div>
        <div className="pagination-contents">
            {pageCount > 1 && (<ReactPaginate
              previousLabel={<i className="fas fa-caret-left"></i>}
              nextLabel={<i className="fas fa-caret-right"></i>}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
            )}
          </div>
    </div>
</div>

           
        </div>
        <div style={{ flex: '1 0 0', marginRight: '10px' }}>
            {/* danh sách user */}
            {/* <h4 style={{ paddingLeft: '2rem' }}>Danh sách user</h4>
            <ul className="comments-list">
            {comments.map((comment) => (
                <li key={comment.id} className="comment-item">
                <div
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #ccc',
                    padding: '8px 0',
                    }}
                >
                    <div style={{ marginRight: '8px' }}>
                    {comment.avatar === null ? (
                        <img
                        src="/static/media/usernoavatar.04e24d38c157524ce939.png"
                        alt="Default Avatar"
                        className="avatar"
                        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                        />
                    ) : (
                        <img
                        src={comment.avatar}
                        alt="User Avatar"
                        className="avatar"
                        style={{ width: '32px', height: '32px', borderRadius: '50%' }}
                        />
                    )}
                    </div>
                    <div style={{ flex: 1, fontWeight: 'bold' }}>{comment.user}</div>
                </div>
                </li>
            ))}
            </ul> */}
            {/* Biểu đồ 5 tỉnh thành */}
            <div>
            <h4 style={{ paddingTop: '30px' , fontWeight:"700"}}>5 tỉnh thành nhiều chuyến xe nhất</h4>
            <ResponsiveContainer width="100%" height={400}>
        <LineChart
            data={chartDataTripTop}
            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
        </ResponsiveContainer>
        <div>
        <h4 style={{fontWeight:"700"}}>Phản hồi của khách hàng</h4>
            <ul className="comments-list">
            {comments?.slice().sort((a, b) => b.id - a.id).slice(0, 8).map((comment) => (
                <li key={comment.id} className="comment-item">
                <div
                    style={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '1px solid #ccc',
                    padding: '8px 0',
                    }}
                >
                    
                    <div style={{ flex: 1, fontWeight: 'bold', fontSize:"15px" }}>{comment.user}</div>
                    <div style={{ flex: 1,fontSize:"15px" }}>{comment.content}</div>
                </div>
                </li>
            ))}
            </ul>
        </div>
            </div>
        </div>
        </div>
        </div>
    );
    };

    export default DashBoard;