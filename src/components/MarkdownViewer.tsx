"use client";
import ReactMarkdown from "react-markdown";
import { Trash2 } from "lucide-react";
import Fetch from "@/components/Fetch";

interface Note {
  _id: string;
  topic: string;
  content: string;
  createdAt?: string;
}

interface MarkdownViewerProps {
  topic: string;
}

export const NotesOnTopic = ({ topic }: MarkdownViewerProps) => {
  return (
    <Fetch
      uri="/api/notes"
      renderSuccess={MarkdownViewer}
      renderError={(error) => {
        return <p>Something went wrong...{error.message}</p>;
      }}
      filter={(notes: Note[]) => notes.filter((n) => n.topic === topic)}
    />
  );
};

export const MarkdownViewer = ({ data }: { data: Note[] }) => {
  return (
    <div className="space-y-4">
      {data.length !== 0 ? (
        data.map((note: Note) => (
          <div
            key={note._id}
            className="relative group p-4 bg-white shadow-sm"
          >
            <button
              className="absolute top-3 right-3 p-1.5 text-red-500 hover:bg-red-50 rounded-full"
              aria-label="delete note"
            >
              <Trash2 size={18} />
            </button>

            <div className="prose max-w-none mt-3">
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </div>

            {note.createdAt && (
              <p className="text-xs text-gray-500 mt-2">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        ))
      ) : (
        <p>No notes yet</p>
      )}
    </div>
  );
};
