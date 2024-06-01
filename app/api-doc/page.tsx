"use client";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import v1 from "./api-v1.json";

export default function Page() {
  const spec = v1||{};
  console.log("spec", spec);
  
  return <section className="container">
    <SwaggerUI spec={spec} />
  </section>;
}
