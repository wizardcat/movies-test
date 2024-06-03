import { Movie } from '@/components/Movie/movie.component';

export default function Page({ params }: { params: { id: string } }) {
  return <Movie id={params.id} />;
}
