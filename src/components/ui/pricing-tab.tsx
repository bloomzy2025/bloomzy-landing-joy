
import * as React from "react"
import { cn } from "@/lib/utils"

interface TabProps {
  text: string
  selected: boolean
  setSelected: (value: string) => void
  discount?: boolean
}

export function Tab({ text, selected, setSelected, discount = false }: TabProps) {
  return (
    <button
      className={cn(
        "relative rounded-full px-4 py-2 text-sm transition-colors",
        selected
          ? "bg-background text-foreground"
          : "bg-transparent text-muted-foreground hover:bg-background/50 hover:text-foreground"
      )}
      onClick={() => setSelected(text)}
    >
      {discount && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand-green text-[10px] font-semibold text-white">
          %
        </span>
      )}
      {text.charAt(0).toUpperCase() + text.slice(1)}
    </button>
  )
}
