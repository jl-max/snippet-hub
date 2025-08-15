"use client";
import ReactMarkdown from "react-markdown";
import { Trash2 } from "lucide-react";
import { useNotesSWR } from "@/hooks/useNotesSWR";

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

export const NoteList = ({
  data,
  onDelete,
}: {
  data: Note[];
  onDelete: () => Promise<void>;
}) => {
  return (
    <div className="space-y-4">
      {data.length !== 0 ? (
        data.map((note: Note) => (
          <NoteBlock key={note._id} note={note} onDelete={onDelete} />
        ))
      ) : (
        <p>No notes yet</p>
      )}
    </div>
  );
};

export const NoteBlock = ({
  note,
  onDelete,
}: {
  note: Note;
  onDelete: () => Promise<void>;
}) => {
  const handleDelete = async () => {
    if (!confirm("Sure to delete?")) return;

    const res = await fetch(`/api/notes/${note._id}`, { method: "DELETE" });
    if (res.ok) await onDelete();
  };

  return (
    <div key={note._id} className="flex items-top p-4 bg-white shadow-sm">
      <div>
        <div className="max-w-none mt-3">
          <ReactMarkdown>{note.content}</ReactMarkdown>
        </div>

        {note.createdAt && (
          <p className="text-xs text-gray-500 mt-2">
            {new Date(note.createdAt).toLocaleString()}
          </p>
        )}
      </div>
      <button
        onClick={handleDelete}
        className="ml-auto h-10 right-3 p-1.5 text-red-500 hover:bg-red-50 rounded-full"
        aria-label="delete note"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};
