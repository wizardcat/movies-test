import { z } from "zod";

export const createMovieDto = z.object({
  userId: z.string().uuid(),
  title: z.string().min(1),
  publishingYear: z.number(),
  poster: z.string().min(4),
});

export type CreateMovieDto = z.infer<typeof createMovieDto>;

export const updateMovieDto = createMovieDto.partial();

export type UpdateMovieDto = z.infer<typeof updateMovieDto>;
