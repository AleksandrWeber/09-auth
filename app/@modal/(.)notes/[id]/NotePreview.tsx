import NotePreviewClient from "./NotePreview.client";

interface NotePreviewProps {
  id: string;
}

export default function NotePreview({ id }: NotePreviewProps) {
  return <NotePreviewClient id={id} />;
}
