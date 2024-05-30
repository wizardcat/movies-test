import { config } from "@/app/common/config";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
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
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = await uploadFileToS3(buffer, file.name);

    return NextResponse.json({ success: true, fileName });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

