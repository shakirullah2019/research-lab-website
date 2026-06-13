"use client";

import { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  label,
}: RichTextEditorProps) {
  const [showHtml, setShowHtml] = useState(false);

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
        </label>
      )}
      <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
        <div className="flex items-center gap-1 px-2 py-1.5 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
          <button
            type="button"
            onClick={() => {
              document.execCommand("bold");
            }}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-bold"
            title="Bold"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => document.execCommand("italic")}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm italic"
            title="Italic"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => document.execCommand("underline")}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-sm underline"
            title="Underline"
          >
            U
          </button>
          <span className="mx-1 text-gray-300 dark:text-gray-600">|</span>
          <button
            type="button"
            onClick={() => {
              const sel = window.getSelection();
              if (sel) {
                const li = document.createElement("li");
                li.textContent = sel.toString();
                sel.getRangeAt(0).deleteContents();
                sel.getRangeAt(0).insertNode(li);
              }
            }}
            className="p-1.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-xs"
            title="Bullet list"
          >
            • list
          </button>
          <div className="ml-auto">
            <button
              type="button"
              onClick={() => setShowHtml(!showHtml)}
              className={`px-2 py-1 rounded text-xs font-mono ${
                showHtml
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              &lt;/&gt;
            </button>
          </div>
        </div>
        {showHtml ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[200px] p-3 text-sm font-mono bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none resize-y"
            placeholder="Type HTML here..."
          />
        ) : (
          <div
            contentEditable
            suppressContentEditableWarning
            onInput={(e) =>
              onChange((e.target as HTMLElement).innerHTML)
            }
            dangerouslySetInnerHTML={{ __html: value }}
            className="w-full min-h-[200px] p-3 text-sm bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none resize-y overflow-auto prose prose-sm max-w-none"
          />
        )}
      </div>
    </div>
  );
}
