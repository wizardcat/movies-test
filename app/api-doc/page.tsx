"use client";
import v1 from "@/app/api/v1/api-v1.json";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic(() => import("swagger-ui-react"), { ssr: false });
export default function Page() {
  const spec = v1||{};
  
  return <section className="container">
    <SwaggerUI spec={spec} />
  </section>;
}
