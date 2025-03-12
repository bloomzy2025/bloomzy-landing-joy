
import { cn } from "@/lib/utils"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  return (
    <article className={cn(
      "flex w-[320px] shrink-0 flex-col gap-4 rounded-xl border bg-card p-6",
      "transition-colors duration-200 hover:bg-muted/50",
      className
    )}>
      <p className="flex-1 text-sm text-muted-foreground">{text}</p>
      <div className="flex items-center gap-3">
        <img
          src={author.avatar}
          alt={author.name}
          className="h-10 w-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{author.name}</span>
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:underline"
            >
              {author.handle}
            </a>
          ) : (
            <span className="text-xs text-muted-foreground">{author.handle}</span>
          )}
        </div>
      </div>
    </article>
  )
}
