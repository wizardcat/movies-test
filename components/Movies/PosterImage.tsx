'use client'
import { useGetPoster } from '@/hooks/api/queries/useGetPoster';
import Image from "next/image";


export const PosterImage = ({ poster = "", alt = "" }) => {
  const { data } = useGetPoster(poster);
  return (
    <>
      {data && (
        <Image 
          src={data}
          alt={alt}
          width={266}
          height={400}
        />
      )}
    </>
  )
};