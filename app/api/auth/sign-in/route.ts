import { prisma } from '@/app/common/prisma';
import { NextResponse } from "next/server";
import { signInDto } from "./dto";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = await signInDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, {
      status: 400,
    });
  }


  const { email, password } = validateBody.data;

  const user = await prisma.users.findFirst({
    where: {
      OR: [
        {
          email: email,
        },
      ],
    },
  });

  if (!user) {
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

  const passwordMatch = password===user.password;

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

  const response = {
    id: user.id,
    email: user.email,
  }

  return NextResponse.json(response);
}
