"use client";
import React, { useState, useRef } from "react";
import { Plus } from "lucide-react";
import { useFetch } from "@/hooks/useFetch";

interface Note {
  topic: string;
  content: string;
}

const options: string[] = [
  "Component",
  "Data flow",
  "State management",
  "React Router",
  "CSS",
  "Optimization",
];

const MarkdownEditor: React.FC = () => {
  const [currentItem, setCurrentItem] = useState<Note>({
    topic: options[0],
    content: "",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const {
    loading,
    error,
    execute: doPost,
  } = useFetch(
    "/api/notes",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: currentItem.topic,
        content: currentItem.content,
      }),
    },
    true
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddNote = async () => {
    if (!currentItem.content?.trim()) {
      alert("Content required.");
      return;
    }

    try {
      await doPost();
      setCurrentItem({ topic: options[0], content: "" });
      textareaRef.current?.focus();
    } catch (err) {
      console.error("Error saving note:", err);
    }
  };

  return (
    <div className="markdown-editor w-full p-2 sm:p-4">
      <div className="bg-white md:rounded-lg md:shadow-md md:p-6 p-3 mb-4 md:mb-6">
        <div className="mb-4">
          <label
            htmlFor="topic-select"
            className="font-mono block text-sm font-medium text-gray-700 mb-1"
          >
            topic
          </label>
          <select
            id="topic-select"
            name="topic"
            value={currentItem.topic}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {options.map((op, i) => (
              <option key={i} value={op}>
                {op}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="content"
            className="font-mono block text-sm font-medium text-gray-700 mb-1"
          >
            content
          </label>
          <textarea
            ref={textareaRef}
            id="content"
            name="content"
            required
            value={currentItem.content}
            onChange={handleInputChange}
            className="w-full h-32 sm:h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="input content..."
            autoFocus
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            type="button"
            aria-label="Add note"
            onClick={handleAddNote}
            disabled={loading}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center"
          >
            <Plus className="mr-1" size={16} />
            {loading ? "adding..." : "add"}
          </button>
        </div>

        {error && <span className="text-red-600 ml-2 text-sm">{error}</span>}
      </div>
    </div>
  );
};

export default MarkdownEditor;
