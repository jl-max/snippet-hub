import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useNotesSWR() {
  const { data, error, mutate } = useSWR("/api/notes", fetcher);
  return { notes: data || [], error, mutate };
}
