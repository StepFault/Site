export type BrandId =
  | "google"
  | "ycombinator"
  | "techstars"
  | "openai"
  | "anthropic"
  | "tulsa-remote"
  | "tu"
  | "ttcu"
  | "stanford"
  | "mit"
  | "research-partner"
  | "nextjs"
  | "react"
  | "tailwind"
  | "framer"
  | "vercel"
  | "nodejs"
  | "python"
  | "postgresql"
  | "supabase"
  | "redis"
  | "pytorch"
  | "tensorflow"
  | "huggingface"
  | "langchain"
  | "aws"
  | "azure"
  | "docker"
  | "github-actions"
  | "qiskit"
  | "ibm-quantum"
  | "ibm"
  | "cpp";

export function BrandIcon({
  brand,
  className = "h-7 w-auto shrink-0 fill-current",
}: {
  brand: BrandId | string;
  className?: string;
}) {
  switch (brand) {
    case "google":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
          />
          <path
            fill="currentColor"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="currentColor"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="currentColor"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      );
    case "ycombinator":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M2 2h6v20H2V2zm8 0h2.4l5.2 11.2V2H20v20h-6v-9.6L8.8 22H6.4L12 10.4V2h-2z"
          />
        </svg>
      );
    case "techstars":
      return (
        <span
          className={`font-mono text-sm font-semibold tracking-tight ${className?.includes("fill") ? "" : className}`}
          aria-hidden
        >
          techstars
        </span>
      );
    case "openai":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .742 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.514 2.9 5.985 5.985 0 0 0 4.981 1.18 5.985 5.985 0 0 0 4.98-1.18 6.056 6.056 0 0 0 3.994-2.9 5.99 5.99 0 0 0 .33-3.268zM12 18.354a6.352 6.352 0 0 1-5.87-3.93 6.34 6.34 0 0 1-.338-4.662l3.218 1.86a3.17 3.17 0 0 0 3.18 0l3.22-1.86a6.337 6.337 0 0 1-3.41 8.592z"
          />
        </svg>
      );
    case "anthropic":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M13.827 3.52h3.603L24 20.48h-3.67l-1.69-4.35h-6.12l-1.69 4.35H7.34L13.827 3.52zm.45 11.09-2.07-5.35-2.07 5.35h4.14zM4.15 3.52H0L6.33 20.48h3.18L4.15 3.52z"
          />
        </svg>
      );
    case "tulsa-remote":
      return (
        <span className="font-mono text-xs font-medium tracking-wide" aria-hidden>
          Tulsa Remote
        </span>
      );
    case "tu":
      return (
        <span
          className="font-mono text-lg font-bold tracking-[0.2em]"
          aria-hidden
        >
          TU
        </span>
      );
    case "nextjs":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.104 8.374c.47 3.546 2.79 6.803 6.102 8.065 1.06.382 2.082.58 3.106.608.403.016.83.018 1.24.002l.056-.002h10.523l.099-.007c3.35-.245 6.258-2.118 7.887-5.012a11.88 11.88 0 0 0 2.053-8.45 11.988 11.988 0 0 0-2.53-6.083C19.44 2.733 15.69.35 11.572 0zm5.802 20.44l-5.802-9.35-5.802 9.35h11.604z"
          />
        </svg>
      );
    case "tailwind":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.666 1.759 3.027 3.141 6.001 3.141 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624-1.666-1.759-3.027-3.141-6.001-3.141z"
          />
        </svg>
      );
    case "vercel":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path fill="currentColor" d="M12 2 2 19.5h20L12 2z" />
        </svg>
      );
    case "supabase":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M11.9 2.1c-.5-.3-1.1-.1-1.4.4L3.5 15.2c-.4.7.1 1.6.9 1.6h6.2l-1.1 6.5c-.1.6.6 1.1 1.1.7l9.8-11.3c.5-.6.1-1.6-.7-1.6h-6.9l1.1-8.9z"
          />
        </svg>
      );
    case "pytorch":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2.4c-3.2 0-5.8 2.6-5.8 5.8 0 2.2 1.2 4.1 3 5.1l-.9 3.4 3.5-1.2a6 6 0 0 0 2.9.5c3.2 0 5.8-2.6 5.8-5.8S15.2 2.4 12 2.4zm0 9.4a3.6 3.6 0 1 1 0-7.2 3.6 3.6 0 0 1 0 7.2z"
          />
          <circle cx="15.2" cy="7.8" r="1.2" fill="currentColor" />
        </svg>
      );
    case "aws":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M6.5 10.2c0 .3.03.5.09.7.06.2.15.3.28.4.12.1.3.12.5.12.3 0 .5-.1.7-.25.2-.18.35-.43.45-.75l.75.32c-.14.42-.36.75-.67 1-.3.24-.7.37-1.17.37-.45 0-.82-.1-1.08-.31-.27-.2-.46-.5-.56-.87-.1-.38-.16-.82-.16-1.32V6.5h.94v3.7z"
          />
          <path
            fill="currentColor"
            d="M12 17.8c-3.1 1.1-6.5.7-9.4-1-.2-.1 0-.35.15-.28 2.7.8 5.6 1 8.4.55 1-.1 2-.25 2.9-.52.25-.08.42.17.22.33-.9.7-2 1.2-3.2 1.42z"
          />
          <path
            fill="currentColor"
            d="M17.2 6.5h1.1l-1.4 2.4 2.5-4.3h1.2l-3.2 5.5 1.5 2.6h-1.1l-1.3-2.3-1.3 2.3h-1.1l1.5-2.6-3.2-5.5z"
          />
        </svg>
      );
    case "azure":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M5.48 18.79 12.32 17.6 9.3 23.2 5.48 18.79zm13.79-12.09L12.01 11.9l-1.88-6.44 9.15-1.55zM1.69 16.79l6.03-10.45 4.3 7.4L1.69 16.79zm16.31-11.35-2.14 7.35-5.86-3.35 8-4z"
          />
        </svg>
      );
    case "ibm":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M2.8 8.4h2.8v1.4H2.8V8.4zm0 2.8h2.8v1.4H2.8v-1.4zm0 2.8h2.8V15H2.8v-1zm3.5-5.6h2.8v1.4H6.3V8.4zm0 2.8h2.8v1.4H6.3v-1.4zm0 2.8h2.8V15H6.3v-1zm3.5-5.6h2.8v1.4H9.8V8.4zm0 2.8h2.8v1.4H9.8v-1.4zm0 2.8h2.8V15H9.8v-1zm3.5-5.6h2.8v1.4h-2.8V8.4zm0 2.8h2.8v1.4h-2.8v-1.4zm0 2.8h2.8V15h-2.8v-1zm3.5-5.6h2.8v1.4H17v-1.4zm0 2.8h2.8v1.4H17v-1.4zm0 2.8h2.8V15H17v-1z"
          />
        </svg>
      );
    case "python":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M11.9 2.1c-2.8.1-5 2.4-5 5.2V9H5v2h1.9v7.1H5V20h6.1v-5.9c2.4.1 4.4-1.8 4.5-4.2V9h2V7h-2V6.3c0-1.5-1.2-2.8-2.7-3.2h-.9zm-2.2 2.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4zm8.6 14a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zM14 11.9h5v2h-5v-2z"
          />
        </svg>
      );
    case "cpp":
      return (
        <span className="font-mono text-sm font-bold" aria-hidden>
          C++
        </span>
      );
    case "ttcu":
      return (
        <span className="font-mono text-sm font-bold tracking-widest" aria-hidden>
          TTCU
        </span>
      );
    case "stanford":
      return (
        <span className="font-mono text-xs font-semibold tracking-wide" aria-hidden>
          Stanford
        </span>
      );
    case "mit":
      return (
        <span className="font-mono text-sm font-bold tracking-wider" aria-hidden>
          MIT
        </span>
      );
    case "research-partner":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3l2.2 6.8H21l-5.5 4 2.1 6.8L12 16.6 6.3 20.6l2.1-6.8-5.5-4h6.8L12 3z"
            opacity="0.35"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "react":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="2.2" fill="currentColor" />
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="currentColor" strokeWidth="1.2" transform="rotate(120 12 12)" />
        </svg>
      );
    case "framer":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path fill="currentColor" d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm9-9h7v7h-7V4zm0 9h7v7h-7v-7z" opacity="0.9" />
        </svg>
      );
    case "nodejs":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2C8.5 2 6 3.5 6 6.5v11C6 20.5 8.5 22 12 22s6-1.5 6-4.5v-11C18 3.5 15.5 2 12 2zm0 2c2.2 0 3.5.8 3.5 2.5S14.2 9 12 9 8.5 8.2 8.5 6.5 9.8 4 12 4zm-1 14.5v-3h2v3c0 .8-.9 1.5-2 1.5s-2-.7-2-1.5z"
          />
        </svg>
      );
    case "postgresql":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2c-4 0-7 2-7 5v10c0 2 2 3.5 5 4l-1 3 3-2 3 2-1-3c3-.5 5-2 5-4V7c0-3-3-5-7-5zm0 2c3 0 5 1.5 5 3s-2 3-5 3-5-1.5-5-3 2-3 5-3z"
          />
        </svg>
      );
    case "redis":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path fill="currentColor" d="M12 2 4 6v12l8 4 8-4V6l-8-4zm0 2.2 5.5 2.8L12 9.8 6.5 7 12 4.2zM6 8.5l6 3v7.2l-6-3V8.5zm12 0v7.2l-6 3v-7.2l6-3z" />
        </svg>
      );
    case "tensorflow":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path fill="currentColor" d="M12 2 4 7v10l8 5 8-5V7l-8-5zm0 3 5 3.1v5.8L12 17 7 13.9V8.1L12 5z" />
          <path fill="currentColor" d="M12 8v8l6-3.5V11.5L12 8z" opacity="0.6" />
        </svg>
      );
    case "huggingface":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 3c-3 0-5 2-5 4.5 0 1.2.5 2.3 1.4 3.1-.9.8-1.4 1.9-1.4 3.1 0 2.5 2 4.5 5 4.5s5-2 5-4.5c0-1.2-.5-2.3-1.4-3.1.9-.8 1.4-1.9 1.4-3.1C17 5 15 3 12 3zm-2.5 8a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
          />
        </svg>
      );
    case "langchain":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            d="M8 12h8M12 8v8M6 6l3 3M15 15l3 3M18 6l-3 3M9 15l-3 3"
          />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
        </svg>
      );
    case "docker":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M4 14h1v2H4v-2zm2-2h1v4H6v-4zm2 0h1v4H8v-4zm2-2h1v6h-1v-6zm2 0h1v6h-1v-6zm2 2h1v4h-1v-4zm2 0h1v4h-1v-4zm2-2h1v6h-1v-6zM3 12h14.5c.8 0 1.5.7 1.5 1.5v.5c0 2.2-1.8 4-4 4H8c-2.8 0-5-2.2-5-5v-1z"
          />
        </svg>
      );
    case "github-actions":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1 14.5v-9l6.5 4.5L11 16.5z"
          />
        </svg>
      );
    case "qiskit":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.4" />
          <path fill="currentColor" d="M12 7v10M8 9.5l8 5M16 9.5l-8 5" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      );
    case "ibm-quantum":
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden>
          <path
            fill="currentColor"
            d="M2.8 8.4h2.8v1.4H2.8V8.4zm0 2.8h2.8v1.4H2.8v-1.4zm0 2.8h2.8V15H2.8v-1zm3.5-5.6h2.8v1.4H6.3V8.4zm0 2.8h2.8v1.4H6.3v-1.4zm0 2.8h2.8V15H6.3v-1zm3.5-5.6h2.8v1.4H9.8V8.4zm0 2.8h2.8v1.4H9.8v-1.4zm0 2.8h2.8V15H9.8v-1zm3.5-5.6h2.8v1.4h-2.8V8.4zm0 2.8h2.8v1.4h-2.8v-1.4zm0 2.8h2.8V15h-2.8v-1zm3.5-5.6h2.8v1.4H17v-1.4zm0 2.8h2.8v1.4H17v-1.4zm0 2.8h2.8V15H17v-1z"
          />
        </svg>
      );
    default:
      return null;
  }
}
