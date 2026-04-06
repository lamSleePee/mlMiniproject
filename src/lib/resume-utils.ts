import type { ResumeData } from "@/types/resume";

export function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number,
): (...args: Parameters<T>) => void {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function formatDateRange(
  start: string,
  end: string,
  current: boolean,
): string {
  const s = start?.trim() || "—";
  const e = current ? "Present" : end?.trim() || "—";
  return `${s} — ${e}`;
}

/** Plain text for ATS / AI context */
export function resumeToPlainText(data: ResumeData): string {
  const p = data.personalInfo;
  const lines: string[] = [];
  lines.push(p.fullName || "Name");
  if (p.email) lines.push(p.email);
  if (p.phone) lines.push(p.phone);
  if (p.location) lines.push(p.location);
  lines.push("");
  if (data.summary) {
    lines.push("SUMMARY");
    lines.push(data.summary);
    lines.push("");
  }
  if (data.experience?.length) {
    lines.push("EXPERIENCE");
    for (const ex of data.experience) {
      lines.push(`${ex.title} at ${ex.company}`);
      lines.push(formatDateRange(ex.startDate, ex.endDate, ex.current));
      for (const b of ex.bullets || []) if (b.trim()) lines.push(`• ${b}`);
      lines.push("");
    }
  }
  if (data.education?.length) {
    lines.push("EDUCATION");
    for (const ed of data.education) {
      lines.push(`${ed.degree} — ${ed.field}, ${ed.institution}`);
      lines.push(`${ed.startDate} — ${ed.endDate}${ed.gpa ? ` | GPA: ${ed.gpa}` : ""}`);
      lines.push("");
    }
  }
  if (data.skills?.length) {
    lines.push("SKILLS");
    lines.push(data.skills.join(", "));
    lines.push("");
  }
  if (data.projects?.length) {
    lines.push("PROJECTS");
    for (const pr of data.projects) {
      lines.push(pr.name);
      if (pr.description) lines.push(pr.description);
      if (pr.techStack?.length) lines.push(pr.techStack.join(", "));
      for (const b of pr.bullets || []) if (b.trim()) lines.push(`• ${b}`);
      lines.push("");
    }
  }
  if (data.certifications?.length) {
    lines.push("CERTIFICATIONS");
    for (const c of data.certifications) {
      lines.push(`${c.name} — ${c.issuer} (${c.date})`);
    }
  }
  return lines.join("\n").trim();
}

export function demoResumeData(): ResumeData {
  return {
    personalInfo: {
      fullName: "Alex Morgan",
      email: "alex.morgan@email.com",
      phone: "(555) 123-4567",
      location: "San Francisco, CA",
      linkedin: "linkedin.com/in/alexmorgan",
      github: "github.com/alexmorgan",
      website: "",
    },
    summary:
      "Software engineer focused on full-stack web apps and cloud-native systems. Passionate about clean code, performance, and user-centered design.",
    experience: [
      {
        id: "e1",
        company: "TechCorp",
        title: "Software Engineer",
        startDate: "Jan 2022",
        endDate: "",
        current: true,
        bullets: [
          "Shipped features used by 50k+ users using React and Node.js",
          "Reduced API latency by 30% through caching and query optimization",
        ],
      },
    ],
    education: [
      {
        id: "ed1",
        institution: "State University",
        degree: "B.S.",
        field: "Computer Science",
        startDate: "2018",
        endDate: "2022",
        gpa: "3.7",
      },
    ],
    skills: ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "AWS"],
    projects: [
      {
        id: "p1",
        name: "Joblit Resume Builder",
        description: "ATS-optimized resume builder with live PDF preview.",
        techStack: ["Next.js", "Tailwind", "Zustand"],
        link: "",
        bullets: ["Built responsive three-panel UI inspired by leading resume tools"],
      },
    ],
    certifications: [],
  };
}
