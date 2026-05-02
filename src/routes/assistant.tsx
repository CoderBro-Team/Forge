import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { MessageBubble } from "@/features/chat/components/MessageBubble";
import { PromptInput } from "@/features/chat/components/PromptInput";
import { SuggestedPrompts } from "@/features/chat/components/SuggestedPrompts";
import { useChatStream } from "@/features/chat/hooks/useChatStream";
import type { ChatMessage } from "@/types";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "AI Assistant — Forge" },
      {
        name: "description",
        content: "Your always-on AI advisor for product, growth, fundraising, and more.",
      },
      { property: "og:title", content: "AI Assistant — Forge" },
      { property: "og:description", content: "Your always-on AI advisor for startup founders." },
    ],
  }),
  component: AssistantPage,
});

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function AssistantPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { send, stop, isStreaming } = useChatStream();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    const userMsg: ChatMessage = { id: uid(), role: "user", content: text, createdAt: Date.now() };
    const assistantMsg: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "",
      createdAt: Date.now(),
    };
    const next = [...messages, userMsg];
    setMessages([...next, assistantMsg]);

    let acc = "";
    await send(next, (chunk) => {
      acc += chunk;
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { ...copy[copy.length - 1], content: acc };
        return copy;
      });
    });
  };

  const empty = messages.length === 0;

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6">
          {empty ? (
            <SuggestedPrompts onPick={handleSend} />
          ) : (
            <div className="flex flex-col gap-5 pb-6">
              {messages.map((m, i) => (
                <MessageBubble
                  key={m.id}
                  message={m}
                  streaming={isStreaming && i === messages.length - 1 && m.role === "assistant"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6">
          <PromptInput onSend={handleSend} onStop={stop} isStreaming={isStreaming} />
        </div>
      </div>
    </div>
  );
}
