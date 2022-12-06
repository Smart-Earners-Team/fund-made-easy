import React, { useCallback, useRef, useState } from "react";

interface CopyToClipboardProps {
  content: string;
  canCopy?: boolean;
}
export default function CopyToClipboard({ content, canCopy = true }: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);
  const codeElement = useRef<HTMLPreElement>(null);

  const copyAddress = useCallback(async () => {
    const text = codeElement.current?.textContent;
    if (text && canCopy && typeof window !== "undefined") {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1000);
        })
        .catch(() => {
          setCopied(false);
        });
    }
  }, [codeElement, canCopy]);

  return (
    <div className="relative w-full my-3 flex flex-col justify-center text-center">
      <pre
        className="w-full text-sm md:text-base p-2 overflow-x-auto"
        ref={codeElement}
        onClick={canCopy ? copyAddress : () => {}}
      >
        {!canCopy ? "Please connect to your wallet" : content}
      </pre>
      {canCopy && (
        <button
          onClick={copyAddress}
          className="text-base font-medium underline bg-white p-2 rounded-sm
            block text-black border border-black my-2"
        >
          {copied ? "Copied!" : "Click to copy"}
        </button>
      )}
    </div>
  );
}
