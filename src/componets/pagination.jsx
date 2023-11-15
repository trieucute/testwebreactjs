import React, { useState, useEffect, useRef } from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
    const [currentPaginationPage, setCurrentPaginationPage] = useState(1);
    const itemRef = useRef(null);
  
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const handlePageChange = (pageNumber) => {
      setCurrentPaginationPage(pageNumber);
      paginate(pageNumber);
    };
  
    const handleNextPage = () => {
        if (currentPaginationPage <  totalPages  ) {
            setCurrentPaginationPage(currentPaginationPage + 1);
            paginate(currentPaginationPage + 1);


        }

      };
    
      const handlePrevPage = () => {
        if (currentPaginationPage> 1) {
            setCurrentPaginationPage(currentPaginationPage - 1);
            paginate(currentPaginationPage - 1);
        }

      };
  return (
    <div>
          {/*------------------- phân trang -----------------------*/}
   
               <nav
            aria-label="Page navigation example"
            className="page-navigation"
          >
            <ul className="pagination">
            {currentPaginationPage > 1 && (
        <li className="page-prev" onClick={ handlePrevPage}>
          <span aria-hidden="true">«</span>
        </li>
      )}
      {pageNumbers.map((number) => (
        <>
              <li
                key={number}
                onClick={() => handlePageChange(number)}
                className={`pagination-button ${
                  number === currentPaginationPage ? "active-pagina" : ""
                }`}
              >
                {number}
              </li>


             </>

        
       
      ))}
       {currentPaginationPage <totalPages && (
        <li className="page-next" onClick={handleNextPage}>
          <span aria-hidden="true">»</span>
        </li>
      )}
        </ul>
          </nav>
  {/*-------------------END   phân trang -----------------------*/}
      <div ref={itemRef}>
        {/* Render danh sách items ở đây */}
      </div>
    </div>
  );
};

export default Pagination;
