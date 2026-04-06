import Link from "next/link";
import { ArrowRight, FileText, Sparkles, Wand2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] via-[#252542] to-[#1a1a2e] text-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <span className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600">
            <FileText className="h-5 w-5" />
          </span>
          Joblit
        </span>
        <Link
          href="/builder/demo"
          className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20"
        >
          Open builder
        </Link>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-12">
        <p className="text-center text-sm font-medium uppercase tracking-[0.2em] text-indigo-300">
          University project demo
        </p>
        <h1 className="mt-4 text-center text-4xl font-bold tracking-tight sm:text-5xl">
          AI-powered, ATS-optimized resumes
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg text-white/75">
          Edit in a Zety-style three-panel builder, preview a live PDF, and run
          a quick ATS keyword check — add{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm">
            GROQ_API_KEY
          </code>{" "}
          for real AI (optional for class demo).
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/builder/demo"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold shadow-lg shadow-indigo-900/40 hover:bg-indigo-500"
          >
            Try demo resume
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/builder/new"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-base font-semibold hover:bg-white/10"
          >
            Blank resume
          </Link>
        </div>
        <ul className="mx-auto mt-16 grid max-w-3xl gap-6 sm:grid-cols-3">
          <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Wand2 className="h-8 w-8 text-emerald-400" />
            <h2 className="mt-3 font-semibold">AI enhance</h2>
            <p className="mt-1 text-sm text-white/65">
              Polish bullets and skills with one tap (demo mode works offline).
            </p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <FileText className="h-8 w-8 text-indigo-300" />
            <h2 className="mt-3 font-semibold">Live PDF</h2>
            <p className="mt-1 text-sm text-white/65">
              Classic & modern templates with instant preview and download.
            </p>
          </li>
          <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <Sparkles className="h-8 w-8 text-amber-300" />
            <h2 className="mt-3 font-semibold">ATS score</h2>
            <p className="mt-1 text-sm text-white/65">
              Paste a job description and see matched vs missing keywords.
            </p>
          </li>
        </ul>
      </main>
    </div>
  );
}
