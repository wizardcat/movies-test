'use client';
import { UploadOutlined } from "@ant-design/icons";
import { Input } from 'antd/lib';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { useCreateMovie } from "@/hooks/api/mutations/useCreateMovie";
import { useGetPoster } from "@/hooks/api/queries/useGetPoster";
import { useGetMovie } from "@/hooks/api/queries/useGetMovie";
import { useEditMovie } from "@/hooks/api/mutations/useEditMovie";
import styles from "./movie.module.scss";

function dataURLtoFile(dataurl: string | undefined) {
  if (dataurl) {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)?.[1]
    let bstr = atob(arr[arr.length - 1])
    let n = bstr.length
    let u8arr = new Uint8Array(n);
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], "", {type:mime});
  }
}

export default function Movie({ id }: {id?: string}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [poster, setPoster] = useState<File | undefined>();
  const [title, setTitle] = useState<string>('');
  const [publishingYear, setPublishingYear] = useState<number>();
  const { mutate: mutationForCreating, isPending: creatingPending} = useCreateMovie();
  const { mutate: mutationForEditing, isPending: editingPending} = useEditMovie();
  const { data: movieData } = useGetMovie(id);
  const { data: imageFromId } = useGetPoster(movieData?.poster || "");
  const base64toFileConverted = useMemo(() => dataURLtoFile(imageFromId), [imageFromId])
  const isPending = creatingPending || editingPending;
  useEffect(() => {
    if (movieData?.title && movieData?.publishingYear) {
      setPublishingYear(movieData.publishingYear)
      setTitle(movieData.title);
    }
  }, [movieData?.id])

  useEffect(() => {
    if (imageFromId && !imagePreview) {
      setImagePreview(imageFromId);
    }
  }, [imageFromId, setImagePreview])

  

  const handleMovie = () => {
    const movieDataCreation = {title, publishingYear: Number(publishingYear), posterFile: poster};
    const movieDataEditing = {...movieDataCreation, id: id as string, posterFile: poster || base64toFileConverted};
    if (id) {
      mutationForEditing(movieDataEditing);
    } else {
      mutationForCreating(movieDataCreation)
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
    accept: {'image/jpeg': ['.jpeg', '.png']},
    onDropRejected: (file) => window.alert(file[0].errors[0].message),
  })
  return (
    <main className={styles.movieWrapper}>
      <h2>{id ? "Edit" : "Create a new movie"}</h2>
      <div className={styles.inputsMobile}>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} className="antd-input" placeholder="Title" />
        <Input value={publishingYear} onChange={(e) => setPublishingYear(Number(e.target.value))} className="antd-input" placeholder="Publishing year" />
      </div>
      <section className={styles.dropzoneInputs}>
        <div className={styles.dropzoneWrapper} {...getRootProps()}>
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Preview"
              className={styles.imagePreview}
              width={266}
              height={400}
            />
          ) : (
            <div className={styles.dropzoneText}>
              <UploadOutlined />
              <p className={styles.dropzoneHintDesktop}>Drop {id ? "another" : "an"} image here</p>
              <p className={styles.dropzoneHintMobile}>Upload {id ? "another" : "an"} image here</p>
            </div>
          )}
          <input {...getInputProps()} />
        </div>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputs}>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} className="antd-input" placeholder="Title" />
            <Input value={publishingYear} onChange={(e) => setPublishingYear(Number(e.target.value))} className="antd-input" placeholder="Publishing year" />
          </div>
          <div className={styles.buttons}>
            <SecondaryButton onClick={() => router.push("/movies")} text="Cancel" />
            <PrimaryButton loading={isPending} onClick={() => handleMovie()} text={id ? "Update" : "Submit"} />
          </div>
        </div>
      </section>
    </main>
  );
}