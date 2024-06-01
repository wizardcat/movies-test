import { config } from "@/app/common/config";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

interface ImageResponse {
  success: boolean;
  image: string;
}

const fetchImage = async (fileName: string): Promise<ImageResponse> => {
  const bucketUri = config.AWS_S3.bucketUri;
  try {
    const response = await axios.get(`${bucketUri}/images/${fileName}`, {
      headers: {
        'Accept': 'image/jpeg'
      }
    });
    const corsHeader = response.headers['access-control-allow-origin'];
    if (!corsHeader) {
      throw new Error("CORS header not present");
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching image:", error);
    throw error;
  }
};
export const useGetPoster = (fileName: string, options?: UseQueryOptions<ImageResponse, Error>) => {
  return useQuery<ImageResponse, Error>({
    queryKey: ["image", fileName],
    queryFn: () => fetchImage(fileName),
    enabled: !!fileName,
    ...options,
  });
};
