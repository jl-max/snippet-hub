'use client'
import { useNotesSWR } from "@/hooks/useNotesSWR";
import { NoteList } from "@/components/NoteList";

interface Note {
  _id: string;
  topic: string;
  content: string;
  createdAt?: string;
}

interface NoteBlockProps {
  topic: string;
}

export const NotesOnTopic = ({ topic }: NoteBlockProps) => {
  const { notes, error, mutate } = useNotesSWR();

  if (error) return <p>Something went wrong...</p>;

  const filtered = notes.filter((n: Note) => n.topic === topic);

  return (
    <NoteList
      data={filtered}
      onDelete={async () => {
        await mutate();
      }}
    />
  );
};
