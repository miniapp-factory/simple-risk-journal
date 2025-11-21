"use client";

import { useState } from "react";
import type { JSX } from "react";

export default function Journal(): JSX.Element {
  const [notes, setNotes] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const addNote = (): void => {
    if (input.trim() === "") {
      setError("Please enter a note before adding.");
      return;
    }
    setNotes((prev) => [...prev, input.trim()]);
    setInput("");
    setError("");
  };

  const deleteNote = (index: number): void => {
    setNotes((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = (): void => {
    setNotes([]);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="risk-note" className="font-medium">
          Risk Note
        </label>
        <input
          id="risk-note"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border rounded px-2 py-1 w-full"
          placeholder="Enter your risk note"
        />
        <button
          onClick={addNote}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Entry
        </button>
        {error && <p className="text-red-600">{error}</p>}
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Risk Journal</h2>
        {notes.length === 0 ? (
          <p className="text-muted-foreground">No notes yet.</p>
        ) : (
          <ul className="space-y-1">
            {notes.map((note, idx) => (
              <li key={idx} className="flex items-center justify-between bg-gray-100 rounded px-2 py-1">
                <span>{note}</span>
                <button
                  onClick={() => deleteNote(idx)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {notes.length > 0 && (
        <button
          onClick={clearAll}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
