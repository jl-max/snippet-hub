"use client";
import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useFetch } from "@/hooks/hooks";

interface Note {
  topic: string;
  content: string;
}

const options: string[] = [
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
  const { execute: doPost } = useFetch(
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
    if (!currentItem.topic || !currentItem.content) return;

    try {
      await doPost();
      setCurrentItem({ topic: "", content: "" });
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
            id="content"
            name="content"
            value={currentItem.content}
            onChange={handleInputChange}
            className="w-full h-32 sm:h-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="input content..."
          />
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleAddNote}
            className="w-full sm:w-auto px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center"
          >
            <Plus className="mr-1" size={16} />
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
