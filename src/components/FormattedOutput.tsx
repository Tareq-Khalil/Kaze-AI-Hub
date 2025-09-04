// src/components/FormattedOutput.tsx
// This component renders AI-generated content with markdown formatting and interactive features
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  content: string;
  onClear?: () => void;
}

const FormattedOutput: React.FC<Props> = ({ content, onClear }) => {
  const [boxSize, setBoxSize] = useState({ width: 600, height: 500 }); // ⬆️ Increased default height

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success("Output copied to clipboard");
  };

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = boxSize.width;
    const startHeight = boxSize.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      const newHeight = startHeight + (moveEvent.clientY - startY);
      setBoxSize({
        width: Math.max(400, newWidth),
        height: Math.max(200, newHeight),
      });
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="relative bg-white dark:bg-gray-900/60 p-4 rounded-2xl border border-gray-300 dark:border-gray-700 overflow-x-auto max-w-full"
      style={{ width: boxSize.width, height: boxSize.height }}
    >
      {/* Action buttons */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-md"
        >
          <Copy size={14} />
          Copy
        </button>
        {onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-red-500 hover:bg-red-400 text-white rounded-md"
          >
            <Trash2 size={14} />
            Clear
          </button>
        )}
      </div>

      <div className="prose dark:prose-invert max-w-none space-y-4 overflow-auto pt-12">
        {/* Added padding-top to avoid overlap with action buttons */}
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>

      {/* Resize handle */}
      <div
        onMouseDown={handleResize}
        className="absolute bottom-2 right-2 w-4 h-4 cursor-se-resize bg-gray-300 dark:bg-gray-600 rounded"
        title="Resize"
      ></div>
    </div>
  );
};

export default FormattedOutput;
