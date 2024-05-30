export const config = {
  // baseApiUri: process.env.NEXT_PUBLIC_API_URI,
  isProduction: process.env.NODE_ENV === "production",
  AWS_S3: {
    region: process.env.AWS_S3_REGION,
    credentials: {
      accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    },
    bucket: process.env.AWS_S3_BUCKET_NAME,
    bucketUri: process.env.AWS_S3_BUCKET_URI,
  },
};
