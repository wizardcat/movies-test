"use client";
import { config } from "@/app/common/config";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import v1 from "./api-v1.json";

export default function Page() {
  const spec = v1;
  
  return (
    <section className="container">
      {!config.isProduction && <SwaggerUI spec={spec} />}
    </section>
  );
}
