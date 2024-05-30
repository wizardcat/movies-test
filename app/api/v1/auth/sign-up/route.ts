// import bcrypt from "bcrypt";
import { prisma } from "@/app/common/prisma";
import { NextResponse } from "next/server";
import { signUpDto } from "./dto";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = signUpDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }

  const { email, password } = validateBody.data;

  const existingUser = await prisma.users.findFirst({
    where: {
      OR: [
        {
          email,
        },
      ],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        code: "user_already_exists",
        message: "User already exists",
      },
      {
        status: 400,
      }
    );
  }

  const user = await prisma.users.create({
    data: {
      email,
      password,
    },
  });

    const response = {
      id: user.id,
      email: user.email,
  };
  
  return NextResponse.json(response);
}
