'use client'
import { useGetPoster } from '@/hooks/api/queries/useGetPoster';
import Image from "next/image";


export const PosterImage = ({ poster = "", alt = "" }) => {
  const { data } = useGetPoster(poster);
  console.log(data)
  return (
    <>
      {data?.image && (
        <Image 
          src={data.image}
          alt={alt}
          width={266}
          height={400}
        />
      )}
    </>
  )
};