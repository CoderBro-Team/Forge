import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface SuggestedPromptsProps {
  onPick: (text: string) => void;
}

const suggestions = [
  {
    title: "Plan a launch",
    prompt: "Draft a 4-week launch plan for a new B2B SaaS targeting Series A startups.",
  },
  {
    title: "Analyze churn",
    prompt: "My monthly churn jumped from 2% to 5%. Walk me through how to diagnose the cause.",
  },
  {
    title: "Cold outreach",
    prompt: "Write a cold email to a Head of Eng at a 200-person fintech for an AI dev tool.",
  },
  {
    title: "Pricing strategy",
    prompt: "Help me decide between usage-based and seat-based pricing for an AI product.",
  },
];

export function SuggestedPrompts({ onPick }: SuggestedPromptsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-12"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-card text-primary">
        <Sparkles className="h-5 w-5" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">How can I help?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Ask anything. I'm trained on what works for early-stage founders.
        </p>
      </div>
      <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
        {suggestions.map((s) => (
          <button
            key={s.title}
            onClick={() => onPick(s.prompt)}
            className="group rounded-xl border border-border bg-card p-3.5 text-left transition-all hover:border-primary/40 hover:bg-accent/40"
          >
            <div className="text-sm font-medium">{s.title}</div>
            <div className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{s.prompt}</div>
          </button>
        ))}
      </div>
    </motion.div>
  );
}
