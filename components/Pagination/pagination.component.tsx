import styles from "./pagination.module.scss";
import cn from 'classnames';

export const Pagination = ({ 
  currentPage = 1,
  setPrevPage = () => {},
  setNextPage = () => {},
  setCurrentPage = (i: number) => {}, 
  data = {} as any,
}) => {
  const totalPages = data?.totalPages;
  const hasPreviousPage = data?.hasPreviousPage;
  const hasNextPage = data?.hasNextPage;

  if (totalPages === 1) {
    return null;
  }

  return (
    <div className={styles.paginationWrapper}>
      <div 
        onClick={setPrevPage}
        className={cn(styles.paginationHandler, !hasPreviousPage ? styles.hiddenPaginationHandler : "")}
      >
        Prev
      </div>
      <div className={styles.pages}>
        {new Array(totalPages).fill("").map((_, index) => (
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
        className={cn(styles.paginationHandler, !hasNextPage ? styles.hiddenPaginationHandler : "")}
      >
        Next
      </div>
    </div>
  );
}