/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    AWS_S3_REGION: process.env.AWS_S3_REGION ?? "",
    AWS_S3_ACCESS_KEY_ID: process.env.AWS_S3_ACCESS_KEY_ID ?? "",
    AWS_S3_SECRET_ACCESS_KEY: process.env.AWS_S3_SECRET_ACCESS_KEY ?? "",
    AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME ?? "",
    AWS_S3_BUCKET_URI: process.env.AWS_S3_BUCKET_URI ?? "",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "movies-test-storage.s3.amazonaws.com",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "m.media-amazon.com",
        port: "",
        pathname: "/images/I/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  webpack: (config) => {
    config.ignoreWarnings = [
      { module: /node_modules\/swagger-client\// },
      { file: /node_modules\/swagger-client\// },
      { module: /node_modules\/swagger-ui-react\// },
      { file: /node_modules\/swagger-ui-react\// },
    ];

    return config;
  },
};

export default nextConfig;
