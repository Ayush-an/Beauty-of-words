function WordCard({ title, meaning }) {
  return (
    <div className="h-full group relative bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 dark:border-neutral-800 overflow-hidden cursor-pointer flex flex-col items-center justify-center text-center transform hover:-translate-y-2">

      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-transparent dark:from-[#222222] dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      <h2 className="relative font-serif text-3xl md:text-4xl font-bold mb-4 text-neutral-900 dark:text-neutral-100 group-hover:text-[var(--color-accent)] transition-colors duration-300">
        {title}
      </h2>

      <p className="relative text-neutral-500 dark:text-neutral-400 font-medium tracking-wide flex-grow">
        {meaning}
      </p>

    </div>
  );
}

export default WordCard;