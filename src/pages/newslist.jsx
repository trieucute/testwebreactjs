import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNews } from '../reduxTool/newsSlice';
import Loading from './loadingTrip';
const LoadingNews = () => {
    const dispatch = useDispatch();
    const newsData = useSelector((state) => state.newsReducer.data);
    const loading = useSelector((state) => state.newsReducer.loading);
    const error = useSelector((state) => state.newsReducer.error);
    useEffect(() => {
      dispatch(fetchNews());
    }, []); 
  
    if (loading) {
      return <Loading/>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    return (
        <div>
        {newsData && newsData.map((news) => (
          <div key={news.id}>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
          </div>
        ))}
      </div>
      
    );
  };

export default LoadingNews;