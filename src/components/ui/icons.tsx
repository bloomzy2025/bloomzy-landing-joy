
import * as React from "react"

export type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  twitter: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  gitHub: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  ),
  google: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.545 12.151c0 .269-.023.537-.07.802h-5.44v-1.604h3.11c-.067-.518-.271-.954-.578-1.29a2.52 2.52 0 0 0-1.882-.79c-1.524 0-2.766 1.31-2.766 2.815 0 1.504 1.242 2.812 2.766 2.812a2.53 2.53 0 0 0 1.815-.782l1.176 1.176c-.534.534-1.292.833-2.113.833-1.881 0-3.418-1.537-3.418-3.418 0-1.883 1.537-3.42 3.418-3.42 1.881 0 3.418 1.537 3.418 3.42l.564.445zM20.635 12.151c0 2.316-1.782 4.107-4.069 4.107-2.286 0-4.069-1.791-4.069-4.107 0-2.316 1.782-4.107 4.069-4.107 2.286 0 4.069 1.791 4.069 4.107zm-1.604 0c0-1.354-1.087-2.457-2.463-2.457s-2.463 1.103-2.463 2.457c0 1.354 1.087 2.457 2.463 2.457s2.463-1.103 2.463-2.457z"
      />
    </svg>
  ),
  apple: (props: IconProps) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
      <path d="M10 2c1 .5 2 2 2 5" />
    </svg>
  ),
}
