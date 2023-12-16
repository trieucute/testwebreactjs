import React from 'react';
import banner from '../../assets/images/banner2.jpg';
import '../../assets/css/searchTicket.css'
import axiosAdmin from '../admin/axois-admin';
import axiosClient from '../../axios-client';
import { useState } from 'react';
import qr from '../../assets/images/QR.png';
import xe from '../../assets/images/xe2.gif';
import city from '../../assets/images/city2.jpg';
import dot from '../../assets/images/fluent-emoji_bus-stop.png';
import go from '../../assets/images/simple-icons_go.png';
import Loading from '../loadingTrip'

import { TimeHM, calculateTimeDifference, formatDate } from '../../config';
import QRCode from 'qrcode.react';
const SearchTicket = () => {
    const [phone, setPhone]= useState('')
    const [code, setCode]=useState('')
    const [error, setError] = useState('');
    const [data, setData]= useState('')
    const [loadingData, setLoadingData] = useState(false);
    const handleSearch=(e)=>{
        e.preventDefault()
        setLoadingData(true)
        axiosClient.get(`/ticket/search?phone_number=${phone}&code=${code}`)
        .then(res=>{
            console.log(res);
            setData(res.data.data)
            setError('')
            setLoadingData(false)
        })
        .catch(err=>{
            console.error(err)
            setLoadingData(false)
            // const error= err.response;
            setError(`Không tìm thấy mã vé ${code}`);
            // if(error){
            //     if(error.data.success===false){

            //     }
            // }
        })
    }
    // console.log('schedule',data.trip?.schedule.find(i=> i.name===data?.pickup_location).time);
    return (
        <div className='mt-10 searchTicket-container '>
            <div className="container py-3 ">
                <div className='backWhite-padding padding-5'>
                    <div className="row m-0 justify-content-between align-items-center">
                        <div className="col-sm-3">
                            <img
                                src={banner}
                                alt="Left Image"
               
                            />
                        </div>
                        <div className="col-sm-5">
                            <form onSubmit={handleSearch} className=' row m-0 '>
                                <div className='title_home_bus'>
                                    <h1 className='text-center'>TRA CỨU THÔNG TIN VÉ</h1>
                                </div>
                                {/* <h4 className='title_home_bus'>TRA CỨU THÔNG TIN VÉ</h4> */}
                                <div className='col'>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        name='phone'
                                        value={phone}
                                        onChange={e=>setPhone(e.target.value)}
                                        placeholder="Vui lòng nhập số điện thoại"
                                    />
                                    <div className="error-message" id="phone-error" />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ticket"
                                        name='code'
                                        value={code}
                                        onChange={e=>setCode(e.target.value)}
                                        placeholder="Vui lòng nhập mã vé"
                                    />
                                    <div className="error-message" id="ticket-error" />
                                </div>
                                
                                <div className="text-center btn-watch-a">
                                    <button type="submit" className="btn btn-watch">
                                        Tra cứu
                                    </button>
                                </div>
                                </div>
                                    <div id="error-message" className="error-message">

                                        {error && <div className='text-center mt-2'  style={{
                                                color: "rgb(230, 57, 70)",
                                                fontWeight: "700",
                                                marginTop: 5,
                                                fontSize: "0.8em",
                                                textAlign: "left",
                                            }}>{error}</div>}
                                    </div>
                            </form>
                        </div>
                        <div className="col-sm-3">
                            <img
                                src={banner}
                                alt="Right Image"
                 
                            />
                        </div>
                    </div>
                </div>
            </div>
            {loadingData && <Loading/>}
             {!loadingData && data && 
            <div className='resultTicket-container container mb-4'>
                <div className=' backWhite-padding '>
                    <div className='title_home_bus'>
                                    <h1 className='text-center'>THÔNG TIN MÃ VÉ {code}</h1>
                                </div>

                     <div className='infor-ticket'>
                     <div className='title_home_bus'>
                                    <h1 className='text-start' style={{fontSize:"15px"}}>THÔNG TIN ĐẶT VÉ</h1>
                                </div>
                    <div className='row m-0 align-items-center box-infor-ticket'>
                        <div className='col-xxl-4 col-xl-4 col-lg-4 col-sm-12 col-ms-12 text-center'>
                        <QRCode value={`Mã vé: ${data.code} \nTuyến xe: ${data.trip.start_station.name} - ${data.trip.end_station.name}  \nThời gian: ${ TimeHM(data.trip.schedule.find(item => item.type === 'pickup').time)} ${data.trip.departure_time.split(' ')[0]} \nGhế: ${data.seat.position} \nĐiểm lên xe: ${  data.pickup_location} (${data.trip.start_station.address}) \n
                             `} id="qr-code-img" />
                            {/* <img src={qr} alt=""  className='img-fulid'/> */}
                        </div>
                        <div className='col-xxl-8 col-xl-8 col-lg-8 col-sm-12 col-ms-12'>
                            <div className='row m-0'>
                                <div className='col text-start'>Họ và tên: </div>
                                <div className='col text-end'>{data.user.name}</div>
                            </div>
                            <div className='row m-0'>
                                <div className='col text-start'>Số điện thoại:  </div>
                                <div className='col text-end'>{data.user.phone_number}</div>
                            </div>
                            <div className='row m-0'>
                                <div className='col text-start'>Số ghế:</div>
                                <div className='col text-end'>{data.seat.position}</div>
                            </div>
                            <div className='row m-0'>
                                <div className='col text-start'>Thời gian:</div>
                                <div className='col text-end'>{formatDate( data.trip.departure_time.split(' ')[0])}</div>
                            </div>
                            <div className='row mx-0 price-ticket  mt-2'>
                                <div className='col text-start'>GIÁ VÉ</div>
                                <div className='col text-end'>{data.seat.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</div>
                            </div>
                        </div>
                    </div>
                        </div>          

                        <div className='infor-trip mt-5 pb-2'>
                     <div className='title_home_bus'>
                                    <h1 className='text-start' style={{fontSize:"15px"}}>THÔNG TIN CHUYẾN XE</h1>
                                </div>
                    <div className='row m-0 align-items-center box-infor-ticket'>
                        <div className='col ps-3 title-trip' style={{fontWeight:"700"}}> <span> {formatDate( data.trip.departure_time.split(' ')[0])} </span> <span style={{paddingLeft:"2em"}}>{data.trip.start_station.province} - {data.trip.end_station.province}</span>   </div>
                        <div className='row m-0 align-items-center '>
                        <div  className='col-xxl-9 col-xl-9 col-lg-9  col-md-12 col-sm-12 col-ms-12 border-right'>
                            <div className='row m-0 flex-row align-items-baseline col-content-trips'>
                            <div className= 'col row m-0 flex-column  col-content col-content-width'>
                                <div className='col text-centers'><img src={xe} alt=""  className='img-fluid' style={{maxWidth:"222px"}}/></div>
                                <div className='col text-center mt-3' style={{fontWeight:"700"}}>{data.trip.start_station.name}<br /> ({data.pickup_location})</div>
                                <div className='col text-center'> {data.trip?.schedule.find(i=> i.name===data?.pickup_location).time.substring(0, 5)} </div>
                         
                            </div>
                            <div className=' col row m-0 flex-column align-items-center text-center  col-content p-0'>
                              
                               <div className='col text-centers'><p>{calculateTimeDifference( data.trip?.schedule.find(i=> i.name===data?.pickup_location).time.substring(0, 5), data.trip?.schedule.find(i=> i.name===data?.dropoff_location).time.substring(0, 5))}</p>
                                <img src={go} alt="" className='' style={{maxWidth:'100%'}} /></div>
                            </div>
                            <div className='col row m-0 flex-column  col-content col-content-width' >
                            <div className='col text-centers'><img src={city} alt="" className='img-fluid' style={{maxWidth:"222px"}} /></div>
                            <div className='col text-center mt-3' style={{fontWeight:"700"}}>{data.trip.end_station.name} <br /> ({data.dropoff_location})</div>
                                <div className='col text-center'> {data.trip?.schedule.find(i=> i.name===data?.dropoff_location).time.substring(0, 5)}  </div>
                          
                            </div>
                            </div>
                        </div>
                        <div className='col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-ms-12 col-price-trip '>
                            <div className='row m-0 flex-column'>
                            <div className='text-centers'><img src={dot} alt=""  className='img-fluid' style={{maxWidth:"160px"}} /></div>
                            <div className='col text-end price-ticket mt-2'>{data.seat.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}/vé</div>
                            </div>
                        </div>
                        </div>
                    </div>
                        </div>        
                        </div>
                </div>
                // {/* </div> */}
            }                 
        </div>
    );
};

export default SearchTicket;