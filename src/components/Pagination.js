import React, { useState } from "react";

const Pagination = ( {moviesPerPage, totalMovies, currentPage, paginate} ) => {
    var pageNum = currentPage;
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++ ) {
        pageNumbers.push(i)
    }

    return(
        <div className="w3-center">            
            <div className="w3-bar w3-border w3-round">
                <a href="!#" className="w3-bar-item w3-button" onClick={() => paginate(pageNum - 1)}>&laquo;</a>
                <a href="!#" className="w3-bar-item w3-button">{pageNum}</a>
                <a href="!#" className="w3-bar-item w3-button" onClick={() => paginate(pageNum + 1)}>&raquo;</a>
            </div>
        </div>
        
    );
}


export default Pagination;