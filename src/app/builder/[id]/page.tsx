import { BuilderLayout } from "@/components/builder/BuilderLayout";
import { BuilderInit } from "./builder-init";

type Props = { params: { id: string } };

export default function BuilderPage({ params }: Props) {
  const { id } = params;
  return (
    <>
      <BuilderInit resumeId={id} />
      <BuilderLayout />
    </>
  );
}
