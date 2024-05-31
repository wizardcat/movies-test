/** @type {import('next').NextConfig} */
const nextConfig = {
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
    webpack: (config) => {
      config.ignoreWarnings = [
        { module: /node_modules\/swagger-jsdoc\/src\/utils\.js/ },
        { file: /node_modules\/swagger-jsdoc\/src\/index\.js/ },
      ];

      return config;
    },
  },
};

export default nextConfig;
