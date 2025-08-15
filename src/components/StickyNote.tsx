"use client";
import React, { useState } from "react";
import useNotesIndexDB from "@/hooks/useNotesIndexDB";

interface Note {
  id: string;
  label: string;
  text: string;
}

interface StickyNoteGridProps {
  label: string;
  noteBgColor?: string;
}

const StickyNoteGrid: React.FC<StickyNoteGridProps> = ({
  label,
  noteBgColor = "bg-yellow-100",
}) => {
  const { notes, loading, addNote, deleteNote } = useNotesIndexDB(label);
  const [text, setText] = useState("");

  const handleAdd = () => {
    addNote(text);
    setText("");
  };

  if (loading) return <p className="p-8">Loading…</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-8 text-gray-800">
          Notes
        </h1>

        <div className="mb-8 flex gap-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Note down what you easily forget here..."
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            add
          </button>
        </div>

        {notes.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
            {notes.map((note: Note) => (
              <div
                key={note.id}
                className={`relative p-4 ${
                  noteBgColor ?? ""
                } rounded-lg shadow-md hover:shadow-lg transition-shadow`}
              >
                <p className="text-gray-800 break-words">{note.text}</p>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
                  aria-label="delete the tip"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No tips yet, add one!</p>
        )}
      </div>
    </div>
  );
};

export default StickyNoteGrid;
