import { config } from "@/app/common/config";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

interface ImageResponse {
  success: boolean;
  image: string;
}

const fetchImage = async (fileName: string): Promise<ImageResponse> => {
  const bucketUri = config.AWS_S3.bucketUri;
  const response = await axios.get(`${bucketUri}/images?fileName=${fileName}`);
  return response.data;
};

export const useGetPoster = (fileName: string, options?: UseQueryOptions<ImageResponse, Error>) => {
  return useQuery<ImageResponse, Error>({
    queryKey: ["image", fileName],
    queryFn: () => fetchImage(fileName),
    enabled: !!fileName,
    ...options,
  });
};
