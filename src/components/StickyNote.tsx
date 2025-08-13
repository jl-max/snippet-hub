"use client";
import React, { useState, useEffect } from "react";
import { IndexedDB } from "@/utils/IndexDB";

interface Note {
  id: string;
  label: string;
  text: string;
}
const db = new IndexedDB("StickyNotesDB", 1);

interface StickyNoteGridProps {
  label: string;
}

const StickyNoteGrid: React.FC<StickyNoteGridProps> = ({ label }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteText, setNewNoteText] = useState("");

  useEffect(() => {
    const loadNotes = async () => {
      try {
        const savedNotes = await db.getNotes();
        setNotes(savedNotes.filter((note) => note.label === label));
      } catch (error) {
        console.error("Failed to load notes:", error);
      }
    };
    loadNotes();
  }, [label]);

  const addNote = async () => {
    if (newNoteText.trim()) {
      const newNote = {
        id: Date.now().toString(),
        label: label,
        text: newNoteText,
      };
      setNotes([...notes, newNote]);
      try {
        await db.addNote(newNote);
        setNotes([...notes, newNote]);
        setNewNoteText("");
      } catch (error) {
        console.error("Failed to add note:", error);
      }
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await db.deleteNote(id);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-8 text-gray-800">Notes</h1>

        <div className="mb-8 flex gap-2">
          <textarea
            value={newNoteText}
            onChange={(e) => setNewNoteText(e.target.value)}
            placeholder="Note down what you easily forget here..."
            className="font-mono min-h-[40px] flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === "Enter" && addNote()}
          />
          <button
            onClick={addNote}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            add
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {notes.map((note) => (
            <div
              key={note.id}
              className="relative p-4 bg-yellow-100 rounded-lg shadow-md hover:shadow-lg transition-shadow"
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

        {notes.length === 0 && (
          <div className="text-center py-12 text-gray-500 font-mono">
            <p>No tips yet, add one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StickyNoteGrid;
