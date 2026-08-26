"use client";

import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onChange: (value: string) => void;
}

export default function SearchBox({ onChange }: SearchBoxProps) {
  return (
    <input
      type="search"
      placeholder="Search notes"
      onChange={(event) => onChange(event.target.value)}
      className={css.input}
    />
  );
}
