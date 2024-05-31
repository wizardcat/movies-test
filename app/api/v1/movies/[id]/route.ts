import { prisma } from "@/app/common/prisma";
import { NextResponse } from "next/server";
import { updateMovieDto } from "../dto";

interface movieRouteContext {
  params: {
    id: string;
  };
}

const checkParams = (params: movieRouteContext["params"]) => {
  for (const param in params) {
    if (!params[param as keyof movieRouteContext["params"]]) {
      return {
        code: "missing_query_param",
        messages: `Query param ${param} is required`,
      };
    }
  }

  return { code: "success" };
};

async function findMovieById(id: string) {
  const movie = await prisma.movies.findUnique({
    where: {
      id,
    },
  });

  if (!movie) {
    return {
      code: "not_found",
      messages: "Movie not found",
    };
  }

  return movie;
}

export async function GET(req: Request, { params }: movieRouteContext) {
  const isCheckParams = checkParams(params);

  if (isCheckParams.code !== "success") return NextResponse.json(isCheckParams, { status: 400 });

  const { id } = params;

  const findMovie = await findMovieById(id);

  const status = ("code" in findMovie && findMovie.code) === "not_found" ? 404 : 200;

  return NextResponse.json(findMovie, {
    status,
  });
}

export async function PATCH(req: Request, { params }: movieRouteContext) {
  const isCheckParams = checkParams(params);

  if (isCheckParams.code !== "success") return NextResponse.json(isCheckParams, { status: 400 });

  const { id } = params;

  const bodyRaw = await req.json();
  const validateBody = updateMovieDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const findMovie = await findMovieById(id);

  if (Object.hasOwn(findMovie, "code")) {
    return NextResponse.json(findMovie);
  }

  const movie = await prisma.movies.update({
    where: {
      id,
    },
    data: validateBody.data,
  });

  return NextResponse.json(movie);
}

export async function DELETE(req: Request, { params }: movieRouteContext) {
  const isCheckParams = checkParams(params);

  if (isCheckParams.code !== "success") return NextResponse.json(isCheckParams, { status: 400 });

  const { id } = params;

  const findMovie = await findMovieById(id);

  if (Object.hasOwn(findMovie, "code")) {
    return NextResponse.json(findMovie);
  }

  await prisma.movies.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({}, { status: 200 });
}
