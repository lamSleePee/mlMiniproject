import type { ResumeData, ResumeTemplateId } from "@/types/resume";
import { ClassicTemplateDoc } from "@/components/templates/ClassicTemplate";
import { ModernTemplateDoc } from "@/components/templates/ModernTemplate";

export function ResumePdfDocument({
  data,
  template,
}: {
  data: ResumeData;
  template: ResumeTemplateId;
}) {
  if (template === "modern") {
    return <ModernTemplateDoc data={data} />;
  }
  return <ClassicTemplateDoc data={data} />;
}
