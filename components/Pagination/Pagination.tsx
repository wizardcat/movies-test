import { useState } from "react";
import styles from "./pagination.module.scss";
import cn from 'classnames';

export const Pagination = ({ className = "" }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const pages = 5;
  const setNextPage = () => setCurrentPage(p => p + 1);
  const setPrevPage = () => setCurrentPage(p => p - 1);
  return (
    <div className={cn(styles.paginationWrapper, className)}>
      <div 
        onClick={setPrevPage}
        className={cn(styles.paginationHandler, currentPage === 1 ? styles.hiddenPaginationHandler : "")}
      >
        Prev
      </div>
      <div className={styles.pages}>
        {new Array(5).fill("").map((_, index) => (
          <div
            key={index}
            className={cn(styles.currentPage, index + 1 === currentPage ? styles.currentPageActive : "")}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
      <div
        onClick={setNextPage}
        className={cn(styles.paginationHandler, currentPage === pages ? styles.hiddenPaginationHandler : "")}
      >
        Next
      </div>
    </div>
  );
}