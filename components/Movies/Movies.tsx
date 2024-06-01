'use client';
import useGetMovies from "@/hooks/api/queries/useGetMovies";
import { useLogin } from "@/hooks/common/useLogin";
import LogoutIcon from "@/public/images/logoutIcon.svg";
import { PlusCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { PrimaryButton } from '../Buttons/PrimaryButton';
import Loading from "../Loading/Loading";
import { Pagination } from "../Pagination/Pagination";
import { PosterImage } from "./PosterImage";
import styles from './movies.module.scss';

export default function Movies() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const router = useRouter();
  const { data, isPending } = useGetMovies(10, currentPage);
  const { logout } = useLogin();
  const movies = data?.movies;
  const setNextPage = () => setCurrentPage(p => p + 1);
  const setPrevPage = () => setCurrentPage(p => p - 1);
  if (isPending) {
    return (
      <main className={styles.noMoviesWrapper}>
        <Loading />
      </main>
    )
  }
  if (!movies?.length && !isPending) {
    return (
      <main className={styles.noMoviesWrapper}>
        <h2>Your movies list is empty</h2>
        <PrimaryButton onClick={() => router.push('/movie')} text="Add a new movie" />
      </main>
    )
  }
  return (
    <main className={styles.moviesWrapper}>
      <section className={styles.topSectionWrapper}>
        <div className={styles.titleWrapper}>
          <h2>My Movies</h2>
          <PlusCircleOutlined onClick={() => router.push("/movie")} />
        </div>
        <div className={styles.logoutWrapper} onClick={() => logout()}>
          <span>Logout</span>
          <Image src={LogoutIcon} alt="logout" priority width={24} height={24} />
        </div>
      </section>
      <section className={styles.movies}>
        {movies.map((m: any) => (
          <div
            key={m.id}
            className={styles.moviesCard}
            onClick={() => router.push("/movie/" + m.id)}
          >
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
}