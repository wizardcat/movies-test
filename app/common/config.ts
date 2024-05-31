export const config = {
  // baseApiUri: process.env.NEXT_PUBLIC_API_URI,
  isProduction: process.env.NODE_ENV === "production",
  AWS_S3: {
    region: "us-east-1",
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
    bucket: "movies-test-storage",
    bucketUri: "https://movies-test-storage.s3.amazonaws.com",
  },
};
