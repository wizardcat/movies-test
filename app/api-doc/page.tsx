/* eslint-disable */
"use client";
import v1 from "@/app/api/v1/api-v1.json";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Page() {
  const spec = v1;
  return (
    <section className="container">
      <SwaggerUI spec={spec} />
    </section>
  );
}
