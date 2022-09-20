import React, { useState } from "react";

const Pagination = ( {moviesPerPage, totalMovies, currentPage, paginate} ) => {
    var pageNum = currentPage;
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++ ) {
        pageNumbers.push(i)
    }
    var totalPages = Math.ceil(totalMovies / moviesPerPage);

    return(
        <div className="w3-center">            
            <div className="w3-bar w3-border w3-round">
                {pageNum !== 1 && <a href="/#" className="w3-bar-item w3-button" onClick={() => paginate(pageNum - 1)}>&laquo;</a>}
                <a href="/#" className="w3-bar-item w3-button">{pageNum}</a>
                {pageNum !== totalPages && <a href="/#" className="w3-bar-item w3-button" onClick={() => paginate(pageNum + 1)}>&raquo;</a> }
            </div>
        </div>
        
    );
}


export default Pagination;