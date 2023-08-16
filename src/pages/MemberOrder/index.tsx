import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { MemberContainer } from "../../components/MemberContainer";

interface order {
  _id: string;
  ItemDesc: string;
  date: string;
  time: string;
  position: string[];
  price:string;
}

export const MemberOrder: React.FC = ({}) => {
  const { memberOrder } = useOutletContext<any>();
  
  useEffect(() => {
    console.log(memberOrder);    
  },[])

  const [currentPage, setCurrentPage] = useState<number>(1);

  const ticketsPerPage = 10;

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;

  const currentTickets = memberOrder.slice(indexOfFirstTicket, indexOfLastTicket);

  const totalPages = Math.ceil(memberOrder.length / ticketsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageButtons = () => {
    const pageButtons: any = [];

    const addPageButton = (pageNumber:any) => {
      pageButtons.push(
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={currentPage === pageNumber ? 'active' : ''}
        >
          {pageNumber}
        </button>
      );
    };

    // Add first page button if only one page
    if(totalPages === 1){
      addPageButton(1);
      return pageButtons
    }

    // Add previous page button
    if (currentPage >= 1) {
      pageButtons.push(
        <button key="previous" disabled={currentPage === 1} className={currentPage === 1 ? 'disabled' : ''} onClick={() => handlePageChange(currentPage - 1)}>
          &laquo;
        </button>
      );
    }

    // Add first page button
    addPageButton(1);

    if (currentPage > 3) {
      pageButtons.push(<span key="ellipsis1" className="px-2 py-1">‧‧‧</span>);
    }

    // Add middle three page buttons
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      if(i === 1){
        // return
      }
      if (i > 1 && i < totalPages) {
        addPageButton(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pageButtons.push(<span key="ellipsis2" className="px-2 py-1">‧‧‧</span>);
    }

    // Add last page button
    addPageButton(totalPages);

    // Add next page button
    if (currentPage <= totalPages) {
      pageButtons.push(
        <button key="next" disabled={currentPage === totalPages} className={currentPage === totalPages ? 'disabled' : ''} onClick={() => handlePageChange(currentPage + 1)}>
          &raquo;
        </button>
      );
    }

    return pageButtons;
  };

  return (
    <>
      <MemberContainer title="訂票紀錄">
       {
        memberOrder.length === 0 
        ? <div className="memberOrder">查無資料</div>
        : <div className="memberOrder">
            <ul className="p-0">
              {currentTickets.map((order:order, index:number) => (
            <li
              key={index}
              className={'memberOrder-bg memberOrder-bd ps-4 py-2 mb-4'}
            >
              <>訂單編號：</> {order._id}<br />
              <>電影：</> {order.ItemDesc}<br />
              <>日期：</> {order.date}<br />
              <>時間：</> {order.time}<br />
              <>位置：</> {order.position.join(',')}
              <>金額：</> {order.price}
            </li>
          ))}
          </ul>

          <div className="pagination d-flex justify-content-center">
            {renderPageButtons()}
          </div>     

        </div>
       }
      </MemberContainer>
    </>
  );
};
