import { useCallback, useRef, useState } from "react";
import type { ChatMessage } from "@/types";

function lastUserMessage(history: ChatMessage[]): string {
  for (let i = history.length - 1; i >= 0; i--) {
    if (history[i].role === "user") return history[i].content;
  }
  return "";
}

function buildDemoReply(userText: string): string {
  const trimmed = userText.trim();
  const preview =
    trimmed.length > 220
      ? `${trimmed.slice(0, 220).replace(/\s+/g, " ")}…`
      : trimmed.replace(/\n/g, " ");

  return [
    "**Frontend demo** — replies are generated in the browser only. No server, SSE, or external AI API.",
    "",
    preview ? `You wrote: “${preview}”` : "",
    "",
    "Wire your backend here for production.",
    "",
    "- Ship a thin slice this week and get it in front of users.",
    "- Keep the MVP scope narrow; expand after retention signals.",
    "- Price early and watch retention, not vanity signups.",
  ]
    .filter(Boolean)
    .join("\n");
}

/**
 * Client-only demo: typewriter effect on a local template response (no network).
 */
export function useChatStream() {
  const [isStreaming, setIsStreaming] = useState(false);
  const cancelRef = useRef(false);

  const stop = useCallback(() => {
    cancelRef.current = true;
    setIsStreaming(false);
  }, []);

  const send = useCallback(
    async (history: ChatMessage[], onDelta: (chunk: string) => void): Promise<void> => {
      cancelRef.current = false;
      setIsStreaming(true);
      try {
        await new Promise((r) => setTimeout(r, 280));
        const text = buildDemoReply(lastUserMessage(history));
        const chunkSize = 3;
        for (let i = 0; i < text.length; i += chunkSize) {
          if (cancelRef.current) break;
          onDelta(text.slice(i, i + chunkSize));
          await new Promise((r) => setTimeout(r, 12));
        }
      } finally {
        setIsStreaming(false);
      }
    },
    [],
  );

  return { send, stop, isStreaming };
}
