import { useState, useEffect, useCallback } from "react";
import { IndexedDB } from "@/utils/IndexDB";

const DB_NAME = "StickyNotesDB";
const DB_VER = 1;

export default function useNotes(label) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------- 初始化 ---------- */
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        const db = new IndexedDB(DB_NAME, DB_VER);
        const all = await db.getNotes();
        setNotes(all.filter((n) => n.label === label));
      } catch (err) {
        console.error("useNotes init error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [label]);

  /* ---------- 增 ---------- */
  const addNote = useCallback(
    async (text) => {
      if (typeof text !== "string" || !text.trim()) return;
      const note = { id: Date.now().toString(), label, text };
      try {
        const db = new IndexedDB(DB_NAME, DB_VER);
        await db.addNote(note);
        setNotes((prev) => [...prev, note]);
      } catch (err) {
        console.error("useNotes add error:", err);
      }
    },
    [label]
  );

  /* ---------- 删 ---------- */
  const deleteNote = useCallback(async (id) => {
    try {
      const db = new IndexedDB(DB_NAME, DB_VER);
      await db.deleteNote(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error("useNotes delete error:", err);
    }
  }, []);

  /* ---------- 改（可选） ---------- */
  const updateNote = useCallback(async (id, newText) => {
    try {
      const db = new IndexedDB(DB_NAME, DB_VER);
      await db.updateNote(id, newText);
      setNotes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, text: newText } : n))
      );
    } catch (err) {
      console.error("useNotes update error:", err);
    }
  }, []);

  return { notes, loading, addNote, deleteNote, updateNote };
}
