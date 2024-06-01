import { config } from "@/app/common/config";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

const fetchImage = async (fileName: string): Promise<string> => {
  const bucketUri = config.AWS_S3.bucketUri;
  const response = await axios.get(`${bucketUri}/images/${fileName}`, {
    responseType: 'arraybuffer'
  });

  const base64Image = Buffer.from(response.data, 'binary').toString('base64');
  return `data:image/jpeg;base64,${base64Image}`;
};

export const useGetPoster = (fileName: string, options?: UseQueryOptions<string, Error>) => {
  return useQuery<string, Error>({
    queryKey: ["image", fileName],
    queryFn: () => fetchImage(fileName),
    enabled: !!fileName,
    ...options,
  });
};