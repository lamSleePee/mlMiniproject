import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import type { ResumeData } from "@/types/resume";
import { formatDateRange } from "@/lib/resume-utils";

const accent = "#4f46e5";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    fontSize: 9,
    fontFamily: "Helvetica",
    color: "#1a1a1a",
    lineHeight: 1.4,
  },
  headerBar: {
    backgroundColor: accent,
    padding: 14,
    marginHorizontal: -32,
    marginTop: -32,
    marginBottom: 16,
  },
  name: { fontSize: 20, color: "#fff", fontFamily: "Helvetica-Bold" },
  contact: { fontSize: 8, color: "#e0e7ff", marginTop: 4 },
  section: { marginTop: 12 },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: accent,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 6,
  },
  row: { flexDirection: "row", justifyContent: "space-between" },
  jobTitle: { fontFamily: "Helvetica-Bold", fontSize: 10 },
  jobDate: { fontSize: 8, color: "#555" },
  company: { fontSize: 9, color: "#444", marginBottom: 3 },
  bullet: { fontSize: 8, marginLeft: 6, marginBottom: 2 },
  body: { fontSize: 8, marginBottom: 4 },
  skillPill: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 3,
    marginRight: 4,
    marginBottom: 4,
    fontSize: 8,
  },
  skillsRow: { flexDirection: "row", flexWrap: "wrap" },
});

export function ModernTemplateDoc({ data }: { data: ResumeData }) {
  const p = data.personalInfo;
  const contactBits = [p.email, p.phone, p.location].filter(Boolean);

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <View style={styles.headerBar}>
          <Text style={styles.name}>{p.fullName || "Your Name"}</Text>
          <Text style={styles.contact}>{contactBits.join(" · ")}</Text>
          <Text style={[styles.contact, { marginTop: 2 }]}>
            {[p.linkedin, p.github, p.website].filter(Boolean).join(" · ")}
          </Text>
        </View>

        {data.summary ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Profile</Text>
            <Text style={styles.body}>{data.summary}</Text>
          </View>
        ) : null}

        {data.experience?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experience</Text>
            {data.experience.map((ex) => (
              <View key={ex.id} style={{ marginBottom: 8 }} wrap={false}>
                <View style={styles.row}>
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
                <View style={styles.row}>
                  <Text style={styles.jobTitle}>
                    {ed.degree} — {ed.field}
                  </Text>
                  <Text style={styles.jobDate}>
                    {ed.startDate} — {ed.endDate}
                  </Text>
                </View>
                <Text style={styles.company}>{ed.institution}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {data.skills?.length ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>
            <View style={styles.skillsRow}>
              {data.skills.map((s, i) => (
                <Text key={i} style={styles.skillPill}>
                  {s}
                </Text>
              ))}
            </View>
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
      </Page>
    </Document>
  );
}
