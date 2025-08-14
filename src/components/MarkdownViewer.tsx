"use client";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Trash2 } from "lucide-react";

interface Note {
  _id: string;
  topic: string;
  content: string;
  createdAt?: string;
}

interface MarkdownViewerProps {
  topic: string;
}

const MarkdownViewer = ({ topic }: MarkdownViewerProps) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) throw new Error("Failed to fetch");
      const allNotes = await res.json();
      setNotes(allNotes.filter((note: Note) => note.topic === topic));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  const handleDelete = (id: string) => {
    if (!confirm("Sure to delete?")) return;
    setNotes(notes.filter((note) => note._id !== id));
  };

  return (
    <div className="space-y-4">
      {notes.length !== 0 ? (
        notes.map((note) => (
          <div
            key={note._id}
            className="relative group rounded-lg border p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-lg mb-2">{note.topic}</h3>

            <button
              onClick={handleDelete}
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

export default MarkdownViewer;
