import Movie from "@/components/Movie/Movie"

export default function Page({
  params,
}: {
  params: { id: string }
}) {
  return <Movie id={params.id} />
}