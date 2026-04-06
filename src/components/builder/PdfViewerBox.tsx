"use client";

import { PDFViewer } from "@react-pdf/renderer";
import type { ReactElement } from "react";

export function PdfViewerBox({ children }: { children: ReactElement }) {
  return (
    <PDFViewer width="100%" height="100%" showToolbar={false}>
      {children}
    </PDFViewer>
  );
}
