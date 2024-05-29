import { prisma } from "@/app/common/prisma";
import { NextResponse } from "next/server";
import { updateMovieDto } from "../dto";

interface movieRouteContext {
  params: {
    id: string;
  };
}

async function findMovieById(id: string) {

  if (!id) {
    return {
        code: "missing_query_param",
        messages: "Query param id is required",
      }
  }

  const movie = await prisma.movies.findUnique({
    where: {
      id,
    },
  });

  if (!movie) {
    return {
        code: "not_found",
        messages: "Movie not found",
      }
  
  }

  return movie;
}

export async function GET(req: Request, { params }: movieRouteContext) {
  const { id } = params;

  const findMovie = await findMovieById(id);

  return NextResponse.json(findMovie);
}


export async function PATCH(req: Request, { params }: movieRouteContext) {
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
