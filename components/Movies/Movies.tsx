'use client';
import useGetMovies from "@/hooks/api/queries/useGetMovies";
import { useLogin } from "@/hooks/common/useLogin";
import { PlusCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import LogoutIcon from "../../app/logoutIcon.svg";
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Pagination } from "../Pagination/Pagination";
import { moviesList } from './mockedMoviesList';
import styles from './movies.module.scss';

export default function Movies() {
  const router = useRouter();
  const { data } = useGetMovies();
  const { logout } = useLogin();
  if (!data?.movies?.length) {
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
        {moviesList.map((m) => (
          <div
            key={m.id}
            className={styles.moviesCard}
            onClick={() => router.push("/movie/" + m.id)}
          >
            <div className={styles.poster}>
              <Image src={m.poster} alt={m.name} width={266} height={400} />
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