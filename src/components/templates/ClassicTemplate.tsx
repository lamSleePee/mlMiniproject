import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { formatDateRange, resumeToPlainText } from "@/lib/resume-utils";

const styles = StyleSheet.create({
  page: {
    padding: 36,
    fontSize: 10,
    fontFamily: "Times-Roman",
    color: "#111",
    lineHeight: 1.45,
  },
  name: { fontSize: 22, fontFamily: "Times-Bold", marginBottom: 4 },
  contact: { fontSize: 9, color: "#333", marginBottom: 12 },
  section: { marginTop: 10 },
  sectionTitle: {
    fontSize: 11,
    fontFamily: "Times-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  jobHeader: { flexDirection: "row", justifyContent: "space-between" },
  jobTitle: { fontFamily: "Times-Bold", fontSize: 10 },
  jobDate: { fontSize: 9, color: "#444" },
  company: { fontSize: 9, marginBottom: 4, color: "#333" },
  bullet: { fontSize: 9, marginLeft: 8, marginBottom: 2 },
  body: { fontSize: 9, marginBottom: 4 },
});

export function ClassicTemplateDoc({ data }: { data: ResumeData }) {
  const p = data.personalInfo;
  const contactBits = [p.email, p.phone, p.location].filter(Boolean);
  const links = [p.linkedin, p.github, p.website].filter(Boolean);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.name}>{p.fullName || "Your Name"}</Text>
        <Text style={styles.contact}>
          {[...contactBits, ...links].join(" · ")}
        </Text>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.body}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((ex) => (
              <View key={ex.id} style={{ marginBottom: 8 }} wrap={false}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>{ex.title}</Text>
                  <Text style={styles.jobDate}>
                    {formatDateRange(ex.startDate, ex.endDate, ex.current)}
                  </Text>
                </View>
                <Text style={styles.company}>{ex.company}</Text>
                {ex.bullets.map((b, i) =>
                  b.trim() ? (
                    <Text key={i} style={styles.bullet}>
                      • {b}
                    </Text>
                  ) : null,
                )}
              </View>
            ))}
          </View>
        ) : null}

        {data.education?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((ed) => (
              <View key={ed.id} style={{ marginBottom: 6 }} wrap={false}>
                <View style={styles.jobHeader}>
                  <Text style={styles.jobTitle}>
                    {ed.degree} in {ed.field}
                  </Text>
                  <Text style={styles.jobDate}>
                    {ed.startDate} — {ed.endDate}
                  </Text>
                </View>
                <Text style={styles.company}>{ed.institution}</Text>
                {ed.gpa ? (
                  <Text style={styles.bullet}>GPA: {ed.gpa}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ) : null}

        {data.skills?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <Text style={styles.body}>{data.skills.join(", ")}</Text>
          </View>
        ) : null}

        {data.projects?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((pr) => (
              <View key={pr.id} style={{ marginBottom: 8 }} wrap={false}>
                <Text style={styles.jobTitle}>{pr.name}</Text>
                {pr.description ? (
                  <Text style={styles.body}>{pr.description}</Text>
                ) : null}
                {pr.techStack?.length ? (
                  <Text style={styles.bullet}>
                    Tech: {pr.techStack.join(", ")}
                  </Text>
                ) : null}
                {pr.bullets.map((b, i) =>
                  b.trim() ? (
                    <Text key={i} style={styles.bullet}>
                      • {b}
                    </Text>
                  ) : null,
                )}
              </View>
            ))}
          </View>
        ) : null}

        {data.certifications?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((c) => (
              <Text key={c.id} style={styles.bullet}>
                {c.name} — {c.issuer} ({c.date})
              </Text>
            ))}
          </View>
        ) : null}
      </Page>
    </Document>
  );
}

export function resumePlainTextForAts(data: ResumeData): string {
  return resumeToPlainText(data);
}
