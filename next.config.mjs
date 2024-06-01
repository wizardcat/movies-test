/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL ?? "",
    // AWS_S3_REGION: process.env.AWS_S3_REGION ?? "",
    AWS_S3_ACCESS_KEY_ID: process.env.ACCESS_KEY_ID ?? "",
    AWS_S3_SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY ?? "",
    // AWS_S3_BUCKET_NAME: process.env.AWS_S3_BUCKET_NAME ?? "",
    // AWS_S3_BUCKET_URI: process.env.AWS_S3_BUCKET_URI ?? "",
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
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.(js|mjs|jsx|ts|tsx)$/,
  //     enforce: "pre",
  //     include: [/node_modules\/swagger-client/, /node_modules\/swagger-ui-react/],
  //     use: [
  //       {
  //         loader: "ignore-loader",
  //       },
  //     ],
  //   });
  //   return config;
  // },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
