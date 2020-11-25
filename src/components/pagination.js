import React from 'react';
import { MDBPagination, MDBPageItem, MDBPageNav, MDBCol, MDBRow } from "mdbreact";


const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = [];
    for( let x = 0; x < Math.ceil(totalPosts / postsPerPage); x++ ){
        pageNumbers.push(x);
    }

    let disabledFirst = true;
    let disabledLast = false;
    
    currentPage <= 1 ? disabledFirst = true : disabledFirst = false;
    currentPage >= pageNumbers.length ? disabledLast = true : disabledLast = false;

   
    return(
        <MDBRow>
            <MDBCol>
                <MDBPagination className="mb-5">
                    <MDBPageItem disabled={disabledFirst}>
                        <MDBPageNav aria-label="Previous" onClick={() => paginate(currentPage - 1)}>
                            <span aria-hidden="true">Předchozí</span>
                        </MDBPageNav>
                    </MDBPageItem>
                    {pageNumbers.map((page, i) => {
                        let isActive = false
                        if(page === currentPage - 1 ){
                            isActive = true;
                        }
                        return <MDBPageItem onClick={() => paginate(page + 1)}  key={i} active={isActive}>
                            <MDBPageNav>{page + 1}</MDBPageNav>
                        </MDBPageItem>
                    })}
                    <MDBPageItem disabled={disabledLast}>
                        <MDBPageNav aria-label="Previous" onClick={() => paginate(currentPage + 1)}>
                            <span aria-hidden="true">Další</span>
                        </MDBPageNav>
                    </MDBPageItem>
                </MDBPagination>
            </MDBCol>
        </MDBRow>
    )
}

export default Pagination;