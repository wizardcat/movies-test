import spec from "@/app/api/v1/api-v1.json";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function Page() {
  return (
    <section className="container">
      <SwaggerUI spec={spec} />
    </section>
  );
}
