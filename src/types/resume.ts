/**
 * Canonical shape for `resumes.resume_data` (JSONB) in Supabase.
 * Single source of truth for builder state and PDF templates.
 */

export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  current: boolean;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  link: string;
  bullets: string[];
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
}

/** Values stored in `resumes.template` */
export type ResumeTemplateId = "classic" | "modern";

/** Row shape for `resumes` (subset used by the app) */
export interface ResumeRow {
  id: string;
  user_id: string;
  title: string;
  target_job_role: string | null;
  resume_data: ResumeData;
  template: ResumeTemplateId;
  created_at: string;
  updated_at: string;
}

/** Default empty resume_data for new resumes */
export const emptyResumeData = (): ResumeData => ({
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
});
