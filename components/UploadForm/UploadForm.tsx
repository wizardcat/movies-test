"use client";

import { useUploadForm } from './useUploadForm';

const UploadForm = () => {
  const { file, handleFileChange, handleSubmit, uploading } = useUploadForm();

  return (
    <>
      <h1>Upload Files to S3 Bucket</h1>

      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit" disabled={!file || uploading}>
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </>
  );
};

export default UploadForm;
