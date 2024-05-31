import { prisma } from "@/app/common/prisma";
import { NextResponse } from "next/server";
import { createMovieDto } from "./dto";

export async function POST(req: Request) {
  const bodyRaw = await req.json();
  const validateBody = createMovieDto.safeParse(bodyRaw);

  if (!validateBody.success) {
    return NextResponse.json(validateBody.error.issues, { status: 400 });
  }

  const movieData = validateBody.data;

  const existingMovie = await prisma.movies.findFirst({
    where: {
      title: movieData.title,
      publishingYear: movieData.publishingYear,
    },
  });

  if (existingMovie) {
    return NextResponse.json(
      {
        code: "movie_already_exists",
        message: "Movie already exists",
      },
      { status: 400 },
    );
  }

  const newMovie = await prisma.movies.create({
    data: movieData,
  });

  return NextResponse.json(newMovie);
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      [
        {
          code: "missing_query_param",
          field: "userId",
          message: "Query param userId is required",
        },
      ],
      { status: 400 },
    );
  }

  const limit = Number(searchParams.get("limit")) || 10;
  const page = Number(searchParams.get("page")) || 1;
  const offset = (page - 1) * limit;

  const movies = await prisma.movies.findMany({
    where: {
      userId,
    },
    orderBy: {
      title: "asc",
    },
    skip: offset,
    take: limit,
  });

  if (!movies.length) {
    return NextResponse.json({ 
      movies: [],
      totalPages: 0,
      prevPage: null,
      nextPage: null,
      hasPreviousPage: false,
      hasNextPage: false,
    });
  }
  
  const totalMovies = await prisma.movies.count({
    where: {
      userId,
    },
  });

  const totalPages = Math.ceil(totalMovies / limit);
  const prevPage = page > 1 ? page - 1 : null;
  const nextPage = page < totalPages ? page + 1 : null;
  const hasPreviousPage = page > 1;
  const hasNextPage = page < totalPages;

  const response = { movies, totalPages, prevPage, nextPage, hasPreviousPage, hasNextPage };

  return NextResponse.json(response);
}
