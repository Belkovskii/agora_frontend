import React, {useState} from "react";
import { ReactComponent as Arrow}  from '../../../pics/arrow.svg';
import './Pagination.css'

const Pagination = () => {
    const [fromPageNumber, setFromPageNumber] = useState(1);
    const [toPageNumber, setToPageNumber] = useState(1);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const getPages = (from : number, to : number) => {
        if (to < from) {
            throw new Error("Параметр 'to' должен быть больше или равен параметру 'from'");
        }
        const range = Array.from({ length: to - from + 1 }, (_, index) => from + index);
        return range.map(pageNumber => {
            return (
                <div className="page-num" key={pageNumber} onClick={()=>console.log(pageNumber)}>
                    {pageNumber}
                </div>
            )
        })
    }
    return (
        <div className="pagination-container">
            <div className="arrow-left">
                <Arrow/>
            </div>
            <div className="page-number-containers">
                {getPages(1, 4)}
            </div>
            <div className="arrow-right">
                <Arrow/>
            </div>
        </div>
    )
}

export default Pagination;