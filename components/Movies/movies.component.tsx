'use client';
import LogoutIcon from '@/public/images/logoutIcon.svg';
import { PlusCircleOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { PrimaryButton } from '../Buttons/PrimaryButton/primary-button.component';

import { Loading } from '../Loading/loading.component';
import { Pagination } from '../Pagination/Pagination';
import styles from './movies.module.scss';
import { PosterImage } from './poster-image.component';
import { useMovies } from './use-movies.hook';

export const Movies = () => {
  const {
    movies,
    isPending,
    setNextPage,
    setPrevPage,
    logout,
    currentPage,
    setCurrentPage,
    data,
    handleMovieClick,
  } = useMovies();

  if (isPending) {
    return (
      <main className={styles.noMoviesWrapper}>
        <Loading />
      </main>
    );
  }

  if (!movies?.length && !isPending) {
    return (
      <main className={styles.noMoviesWrapper}>
        <h2>Your movies list is empty</h2>
        <PrimaryButton onClick={handleMovieClick} text="Add a new movie" />
      </main>
    );
  }

  return (
    <main className={styles.moviesWrapper}>
      <section className={styles.topSectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2>My Movies</h2>
          <PlusCircleOutlined onClick={() => handleMovieClick()} />
        </div>
        <div className={styles.logoutWrapper} onClick={() => logout()}>
          <span>Logout</span>
          <Image src={LogoutIcon} alt="logout" priority width={24} height={24} />
        </div>
      </section>
      <section className={styles.movies}>
        {movies.map((m: any) => (
          <div key={m.id} className={styles.moviesCard} onClick={() => handleMovieClick(m.id)}>
            <div className={styles.poster}>
              <PosterImage poster={m.poster} alt={m.title} />
            </div>
            <div className={styles.info}>
              <p>{m.title}</p>
              <p>{m.publishingYear}</p>
            </div>
          </div>
        ))}
      </section>
      <Pagination
        data={data}
        setNextPage={setNextPage}
        setPrevPage={setPrevPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </main>
  );
};
