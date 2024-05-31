'use client';
import Image from "next/image";
import styles from './movies.module.scss';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { moviesList } from './mockedMoviesList';
import { PlusCircleOutlined } from "@ant-design/icons"
import LogoutIcon from "../../app/logoutIcon.svg";
import { Pagination } from "../Pagination/Pagination";
import { useRouter } from 'next/navigation';
import { useLogin } from "@/hooks/common/useLogin";
import useGetMovies from "@/hooks/api/queries/useGetMovies";

export default function Movies() {
  const router = useRouter();
  const data = useGetMovies();
  console.log(data)
  const { logout } = useLogin();
  if (!moviesList.length) {
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
          <PlusCircleOutlined onClick={() => router.push('/movie')} />
        </div>
        <div className={styles.logoutWrapper} onClick={() => logout()}>
          <span>Logout</span>
          <Image
            src={LogoutIcon}
            alt="logout"
            priority
          />
        </div>
      </section>
      <section className={styles.movies}>
        {moviesList.map((m) => (
          <div key={m.id} className={styles.moviesCard} onClick={() => router.push('/movie/' + m.id)}>
            <div className={styles.poster}>
              <img src={m.poster} alt={m.name} />
            </div>
            <div className={styles.info}>
              <p>{m.name}</p>
              <p>{m.year}</p>
            </div>
          </div>
        ))}
      </section>
      <Pagination className={styles.pagination} />
    </main>
  );
}