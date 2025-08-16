import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useNotesSWR() {
  const { data, error, mutate } = useSWR("/api/notes", fetcher);
  return { notes: data || [], error, mutate };
}

export function useSnippetSWR(slug:string) {
  const { data, error, isLoading } = useSWR(`/api/snippets/${slug}`, fetcher);
  return { snippet: data, error, isLoading };
}