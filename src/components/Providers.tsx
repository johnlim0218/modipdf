"use client";

import { EditorProvider } from "./Editor/EditorContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <EditorProvider>{children}</EditorProvider>;
}
