
import { Route, Routes, Router } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import Index from './pages/index';
import Home from './pages/layouts/home';
import Contact from './pages/layouts/contact';
import Introduce from './pages/layouts/introduce';
import Huongdandatve from './pages/layouts/huongdandatve';
import Thuexe from './pages/layouts/thuexe';

import CompletlyPayment from './pages/layouts/completlyPayment';
import Recruitment from './pages/layouts/recruitment';
import Posts from './pages/layouts/posts';
import RoutersBus from './pages/layouts/routersBus';
import RoutersBusSingle from './pages/layouts/routersBusSingle';
import PaymentSingle from './pages/layouts/paymentSingle';
import Payment from './pages/layouts/payment';
import BookTicketPage from './pages/layouts/bookTicketPage';
import BookTicketPageSingle from './pages/layouts/bookTicketPageSingle';
import ChairChoose from './pages/layouts/chair';
import Signin from './pages/auth/signin';
import Signup from './pages/auth/signup';
import LoginGG from './componets/auth/loginGG';

import ChangePassword from './pages/auth/changePassword';
import ForgotPassword from './pages/auth/forgotPassword';
import ResetPassword from './pages/auth/resetPassword';
import PostDetail from './pages/layouts/postDetail';
// import Test from './pages/layouts/test';

import LoadingNews from './pages/newslist';
import TestRoute from './pages/testRoute';
import Showroute from './pages/showroute';
import AdminLogin from './componets/admin/adminLogin';
import IndexAdmin from './pages/admin';

import DashBoard from './pages/admin/dashboard';
import RouteAdmin from './pages/admin/route/route';
import NotFoundPage from './pages/notFound';
import AddNewsForm from './pages/admin/news/addNews';
import NewsList from './pages/admin/news/news';
import UserList from './pages/admin/user/user';
import UpdateInfor from './pages/auth/updateInfor';
import TripList from './pages/admin/trips/tripList';
import AddNewTrip from './pages/admin/trips/newTrip';
import CarList from './pages/admin/car/carList';
import AddNewCar from './pages/admin/car/newCar';
import StationsList from './pages/admin/stations/stationsList';
import AddNewStation from './pages/admin/stations/newStation';
import TicketList from './pages/admin/ticket/ticketList';
import AddNewTicket from './pages/admin/ticket/newTicket';
import CommentList from './pages/admin/comments/cmtList';
import AddNewComment from './pages/admin/comments/newComt';
import JobList from './pages/admin/jobs/jobList';
import AddNewJob from './pages/admin/jobs/newJob';
import UpdateNews from './pages/admin/news/updateNews';
import UpdateCar from './pages/admin/car/updateCar';
import UpdateTrip from './pages/admin/trips/updateTrip';
import UpdateJob from './pages/admin/jobs/updateJob';
import AddNewUser from './pages/admin/user/newuser';
import UpdateUser from './pages/admin/user/updateUser';
import UpdateStation from './pages/admin/stations/updateStation';
import SearchTicket from './pages/layouts/searchTicket';

// import Editor from './pages/admin/news/edit';


// import Slideshows from './componets/home/slide';
// import Indexs from './pages/layouts/auth';

function App() {

  return (
    <>
    
    <Routes>

      <Route    element={<Index/>}>
   


          <Route path='/' element={<Home/>}/>
          <Route path='/introduce' element={<Introduce/>}/>
          <Route path='/recruitment' element={<Recruitment/>}/>
          <Route path='/news' element={<Posts/>}/>
          <Route path='/thuexe' element={<Thuexe/>}/>
          <Route path='/contact' element={<Contact/>}/>
          {/* <Route path='/test' element={<Test/>}/> */}
          <Route path='/searchTicket' element={<SearchTicket/>}/>

          <Route path='/lichtrinh' element={<RoutersBus/>}/>

          <Route path='/lichtrinh1chieu' element={<RoutersBusSingle/>}/>
          <Route path='/lichtrinh1chieu/:location' element={<RoutersBusSingle/>}/>

          <Route path='/test' element={<ChairChoose/>}/>
 
          <Route path='/tinchitiet/:idNews' element={<PostDetail/>}/>
          <Route path='/datve1chieu' element={<BookTicketPageSingle/>}/>
          <Route path='/datve1chieu/:id' element={<BookTicketPageSingle/>}/>

          <Route path='/datve' element={<BookTicketPage/>}/>
          <Route path='/thanhtoan1chieu' element={<PaymentSingle/>}/>
          <Route path='/thanhtoan' element={<Payment/>}/>
          <Route path='/dathanhtoan' element={<CompletlyPayment/>}/>

          {/* <Route path='/slide' element={<Slideshows/>}/> */}
        



          <Route path='/huongdandatve' element={<Huongdandatve/>}/>


          <Route path='/user/change_password' element={<ChangePassword/>}/>
          <Route path='/user/update' element={<UpdateInfor/>}/>

          {/* <Route path='/callback' element={<Navigate to="/" />} /> */}

      </Route>
      
      <Route path='/login' element={<Signin/>}/>

      <Route path='/news' element={<LoadingNews/>}/>
      <Route path='/route' element={<TestRoute/>}/>
      <Route path='/showroute' element={<Showroute/>}/>
      <Route path='/showroute?' element={<Showroute/>}/>

      <Route path='/signup' element={<Signup/>}/>
      <Route exact path="/auth/google" element={<LoginGG/>} />
      <Route exact path="/forgot_password" element={<ForgotPassword/>} />
      <Route exact path="/reset_password" element={<ResetPassword/>} />

      <Route path='/admin'  element={<AdminLogin/>} />
      <Route  element={<IndexAdmin />}>
  {/* Nested routes bên trong /admin */}
            <Route path='/admin/dashboard'  element={<DashBoard />} />
            <Route path='/admin/route' element={<RouteAdmin />} />

            <Route path='/admin/user' element={<UserList/>} />
            <Route path='/admin/user/addnew' element={<AddNewUser/>} />
            <Route path='/admin/user/update/:id' element={<UpdateUser/>} />

            <Route path='/admin/news' element={<NewsList />} />
            <Route path='/admin/news/addnew' element={<AddNewsForm/>} />
            <Route path='/admin/news/update/:id' element={<UpdateNews/>} />
            
            <Route path='/admin/trips' element={<TripList />} />
            <Route path='/admin/trips/addnew' element={<AddNewTrip />} />
            <Route path='/admin/trips/update/:id' element={<UpdateTrip />} />

            <Route path='/admin/cars' element={<CarList />} />
            <Route path='/admin/cars/addnew' element={<AddNewCar/>} />
            <Route path='/admin/cars/update/:id' element={<UpdateCar/>} />

            <Route path='/admin/stations' element={<StationsList />} />
            <Route path='/admin/stations/addnew' element={<AddNewStation/>} />
            <Route path='/admin/stations/update/:id' element={<UpdateStation/>} />

            <Route path='/admin/tickets' element={<TicketList />} />
            <Route path='/admin/tickets/addnew' element={<AddNewTicket/>} />

            <Route path='/admin/comments' element={<CommentList />} />
            <Route path='/admin/comments/addnew' element={<AddNewComment/>} />
            
            <Route path='/admin/jobs' element={<JobList/>} />
            <Route path='/admin/jobs/addnew' element={<AddNewJob/>} />
            <Route path='/admin/jobs/update/:id' element={<UpdateJob/>} />
  </Route> 
            
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
    </>
  );
}

export default App;
 