import { ChangeEvent, FormEventHandler, useState } from "react";
export const useUploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    e: ChangeEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const response = await fetch("/api/v1/images", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };

  return { file, uploading, handleFileChange, handleSubmit };
};
