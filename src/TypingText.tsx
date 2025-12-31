import { useEffect, useState } from "react";

type TypingTextProps = {
  text: string;
  speed?: number;
};

export default function TypingText({ text, speed = 100 }: TypingTextProps) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;

    const chars = Array.from(text);
    let i = 0;

    const interval = setInterval(() => {
      if (i >= chars.length - 1) {
        clearInterval(interval);
        return;
      }
      setDisplayed((prev) => prev + chars[i]);
      i++;
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p>{displayed}</p>;
}
