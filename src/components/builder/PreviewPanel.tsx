"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { useMemo } from "react";
import type { ResumeData, ResumeTemplateId } from "@/types/resume";
import { ResumePdfDocument } from "@/components/builder/ResumePdfDocument";
import { PdfViewerBox } from "@/components/builder/PdfViewerBox";
import { ATSScorePanel } from "@/components/ats/ATSScorePanel";
import type { ATSResult } from "@/hooks/useResumeStore";
import { resumeToPlainText } from "@/lib/resume-utils";
import { cn } from "@/lib/utils";

export function PreviewPanel({
  data,
  template,
  onTemplateChange,
  jobDescription,
  atsResult,
  onAtsResult,
}: {
  data: ResumeData;
  template: ResumeTemplateId;
  onTemplateChange: (t: ResumeTemplateId) => void;
  jobDescription: string;
  atsResult: ATSResult | null;
  onAtsResult: (r: ATSResult) => void;
}) {
  const doc = useMemo(
    () => <ResumePdfDocument data={data} template={template} />,
    [data, template],
  );

  const resumeText = useMemo(() => resumeToPlainText(data), [data]);
  const fileName = `${data.personalInfo.fullName || "resume"}.pdf`.replace(
    /\s+/g,
    "_",
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md">
        <div className="h-[min(520px,55vh)] w-full bg-[#f8f8f8]">
          <PdfViewerBox>{doc}</PdfViewerBox>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <PDFDownloadLink
          document={doc}
          fileName={fileName}
          className="inline-flex flex-1 items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Download PDF
        </PDFDownloadLink>
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          Template
        </p>
        <div className="flex gap-2">
          {(["classic", "modern"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => onTemplateChange(t)}
              className={cn(
                "flex-1 rounded-lg border px-3 py-2 text-sm font-medium capitalize",
                template === t
                  ? "border-indigo-600 bg-indigo-50 text-indigo-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <ATSScorePanel
        jobDescription={jobDescription}
        resumeText={resumeText}
        result={atsResult}
        onResult={onAtsResult}
      />
    </div>
  );
}
