import { prisma } from '@/app/common/prisma';
import { NextResponse } from "next/server";
import { signInDto } from "../sign-in/dto";
import { signUpDto } from "../sign-up/dto";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateSignIn = signInDto.safeParse(bodyRaw);
  const validateSignUp = signUpDto.safeParse(bodyRaw);

  if (!validateSignIn.success && !validateSignUp.success) {
    return NextResponse.json(
      { issues: [...validateSignIn.error?.issues || [], ...validateSignUp.error?.issues || []] },
      { status: 400 }
    );
  }

  const { email, password } = validateSignIn.success
    ? (validateSignIn.data as { email: string; password: string })
    : (validateSignUp.data as { email: string; password: string });

  let user = await prisma.users.findFirst({
    where: {
      OR: [
        {
          email: email,
        },
      ],
    },
  });

  if (user) {
    const passwordMatch = password === user.password;

    if (!passwordMatch) {
      return NextResponse.json(
        {
          code: "invalid_credentials",
          message: "Invalid credentials",
        },
        {
          status: 400,
        }
      );
    }
  } else {
    user = await prisma.users.create({
      data: {
        email,
        password,
      },
    });
  }

  const response = {
    id: user.id,
    email: user.email,
  };

  return NextResponse.json(response);
}
