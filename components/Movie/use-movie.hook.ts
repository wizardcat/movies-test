import { useCreateMovie } from '@/hooks/api/mutations/useCreateMovie';
import { useEditMovie } from '@/hooks/api/mutations/useEditMovie';
import { useGetMovie } from '@/hooks/api/queries/useGetMovie';
import { useGetPoster } from '@/hooks/api/queries/useGetPoster';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function dataURLtoFile(dataurl: string | undefined) {
  if (dataurl) {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)?.[1];
    let bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], '', { type: mime });
  }
}

export const useMovie = (id?: string) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [poster, setPoster] = useState<File | undefined>();
  const [posterFileName, setPosterFileName] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [publishingYear, setPublishingYear] = useState<number>();
  const { mutate: mutationForCreating, isPending: creatingPending } = useCreateMovie();
  const { mutate: mutationForEditing, isPending: editingPending } = useEditMovie();
  const { data: movieData } = useGetMovie(id);
  const { data: imageFromId } = useGetPoster(movieData?.poster || '');
  const base64toFileConverted = useMemo(() => dataURLtoFile(imageFromId), [imageFromId]);
  const isPending = creatingPending || editingPending;

  useEffect(() => {
    
    if (movieData?.title && movieData?.publishingYear) {
      setPublishingYear(movieData.publishingYear);
      setTitle(movieData.title);
      setPosterFileName(movieData.poster);
    }
  }, [movieData?.id, movieData?.publishingYear, movieData?.title, movieData?.poster]);

  useEffect(() => {
    if (imageFromId && !imagePreview) {
      setImagePreview(imageFromId);
    }
  }, [imageFromId, setImagePreview]);

  const handleMovieClick = () => {
    const movieDataCreation = { title, publishingYear: Number(publishingYear), posterFile: poster };
    const movieDataEditing = {
      ...movieDataCreation,
      id: id as string,
      posterFile: poster || base64toFileConverted,
      posterFileName,
    };
    if (id) {
      mutationForEditing(movieDataEditing);
    } else {
      mutationForCreating(movieDataCreation);
    }
  };

  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: (files) => {
      const file = files[0];
      setPoster(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    multiple: false,
    maxSize: 10000000,
    accept: { 'image/jpeg': ['.jpeg', '.png'] },
    onDropRejected: (file) => window.alert(file[0].errors[0].message),
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handlePublishingYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPublishingYear(Number(e.target.value));
  };

  const handleCancelClick = () => {
    router.push('/movies');
  };

  return {
    title,
    publishingYear,
    handleTitleChange,
    handlePublishingYearChange,
    handleMovieClick,
    handleCancelClick,
    isPending,
    imagePreview,
    getRootProps,
    getInputProps,
  };
};
