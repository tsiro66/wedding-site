const SENTENCE =
  "Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua";

export default function PlaceholderSection() {
  return (
    <div className="flex items-center justify-center h-full w-full px-8">
      <p className="font-[family-name:var(--font-cormorant)] text-[clamp(2rem,5vw,4.5rem)] font-light text-stone-800 leading-[1.2] tracking-tight text-center max-w-5xl">
        {SENTENCE.split(" ").map((word, i) => (
          <span key={i} className="reveal-word inline-block opacity-[0.08] mr-[0.3em]">
            {word}
          </span>
        ))}
      </p>
    </div>
  );
}
