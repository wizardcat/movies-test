'use client';
import { UploadOutlined } from '@ant-design/icons';
import { Input } from 'antd/lib';
import Image from 'next/image';
import { PrimaryButton } from '../Buttons/PrimaryButton/primary-button.component';
import { SecondaryButton } from '../Buttons/SecondaryButton/secondary-button.component';
import styles from './movie.module.scss';
import { useMovie } from './use-movie.hook';

export const Movie = ({ id }: { id?: string }) => {
  const {
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
  } = useMovie(id);

  return (
    <main className={styles.movieWrapper}>
      <h2>{id ? 'Edit' : 'Create a new movie'}</h2>
      <div className={styles.inputsMobile}>
        <Input
          value={title}
          onChange={handleTitleChange}
          className="antd-input"
          placeholder="Title"
        />
        <Input
          value={publishingYear}
          onChange={handlePublishingYearChange}
          className="antd-input"
          placeholder="Publishing year"
        />
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
              <p className={styles.dropzoneHintDesktop}>Drop {id ? 'another' : 'an'} image here</p>
              <p className={styles.dropzoneHintMobile}>Upload {id ? 'another' : 'an'} image here</p>
            </div>
          )}
          <input {...getInputProps()} />
        </div>
        <div className={styles.inputsWrapper}>
          <div className={styles.inputs}>
            <Input
              value={title}
              onChange={handleTitleChange}
              className="antd-input"
              placeholder="Title"
            />
            <Input
              value={publishingYear}
              onChange={handlePublishingYearChange}
              className="antd-input"
              placeholder="Publishing year"
            />
          </div>
          <div className={styles.buttons}>
            <SecondaryButton onClick={handleCancelClick} text="Cancel" />
            <PrimaryButton
              loading={isPending}
              onClick={handleMovieClick}
              text={id ? 'Update' : 'Submit'}
            />
          </div>
        </div>
      </section>
    </main>
  );
};
