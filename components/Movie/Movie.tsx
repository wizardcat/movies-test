'use client';
import { UploadOutlined } from "@ant-design/icons";
import { Input } from 'antd/lib';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { PrimaryButton } from "../Buttons/PrimaryButton";
import { SecondaryButton } from "../Buttons/SecondaryButton";
import { useCreateMovie } from "@/hooks/api/mutations/useCreateMovie";
import styles from "./movie.module.scss";
import { useGetPoster } from "@/hooks/api/queries/useGetPoster";
import { useGetMovie } from "@/hooks/api/queries/useGetMovie";

export default function Movie({ id }: {id?: string}) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [poster, setPoster] = useState<File | undefined>();
  const [title, setTitle] = useState<string>('');
  const [publishingYear, setPublishingYear] = useState<number>();
  const { mutate: mutationForCreating } = useCreateMovie();
  const { data: movieData } = useGetMovie(id);
  const { data: imageFromId } = useGetPoster(movieData?.poster || "");

  useEffect(() => {
    if (movieData?.title && movieData?.publishingYear) {
      setPublishingYear(movieData.publishingYear)
      setTitle(movieData.title);
    }
  }, [movieData?.id])

  useEffect(() => {
    if (imageFromId?.image && !imagePreview) {
      setImagePreview(imageFromId.image);
    }
  }, [imageFromId, setImagePreview])

  const handleCreateMovie = () => {
    const movieData = {title, publishingYear: Number(publishingYear), posterFile: poster};

    mutationForCreating(movieData, {
      onSuccess: (data) => {
        console.log('Movie created successfully:', data);
        // Do something on success, e.g., reset form or show success message
      },
      onError: (error) => {
        console.error('Error creating movie:', error);
        // Do something on error, e.g., show error message
      },
    });
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
            <div>
              <Image
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
                width={266}
                height={400}
              />
            </div>
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
            <PrimaryButton onClick={id ? () => {} : () => handleCreateMovie()} text={id ? "Update" : "Submit"} />
          </div>
        </div>
      </section>
    </main>
  );
}