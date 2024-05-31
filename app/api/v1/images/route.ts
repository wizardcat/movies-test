import { config } from "@/app/common/config";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

const {
  AWS_S3: { region, credentials, bucket },
} = config;

const s3ClientConfig = {
  region: region,
  credentials: {
    accessKeyId: credentials.accessKeyId!,
    secretAccessKey: credentials.secretAccessKey!,
  },
};

const s3Client = new S3Client(s3ClientConfig);

async function uploadFileToS3(file: any, fileName: string) {
  const fileBuffer = file;
  const params = {
    Bucket: bucket,
    Key: `images/${fileName}`,
    Body: fileBuffer,
    ContentType: "image/jpg",
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);
  return fileName;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");

    if (!(file instanceof Blob)) {
      return NextResponse.json(
        { code: "not_found", message: "File is required." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileName = searchParams.get("fileName");

  if (!fileName) {
    return NextResponse.json(
      {
        code: "missing_query_param",
        field: "fileName",
        message: "Query param fileName is required.",
      },
      { status: 400 },
    );
  }

  const params = {
    Bucket: bucket,
    Key: `images/${fileName}`,
  };

  const command = new GetObjectCommand(params);
  const data = await s3Client.send(command);

  const imageArray = await new Promise<Buffer>((resolve) => {
    const chunks: Buffer[] = [];
    const stream = data.Body as NodeJS.ReadableStream;

    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });

  const image = Buffer.from(imageArray).toString("base64");

  return NextResponse.json({ success: true, image }, { headers: { "Content-Type": "image/jpg" } });
}
