import React from 'react';

function QuoteCard({ quote, author, language, category }) {
  return (
    <div className="group relative bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100 dark:border-neutral-800 overflow-hidden cursor-pointer transform hover:-translate-y-1">
      {/* Decorative accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
      
      <div className="flex flex-col h-full">
        {/* Quote category and language tag */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-xs font-semibold tracking-wider uppercase text-accent">
            {category}
          </span>
          <span className="text-xs bg-neutral-100 dark:bg-neutral-800 px-3 py-1 rounded-full text-neutral-500 dark:text-neutral-400">
            {language}
          </span>
        </div>

        {/* The Quote itself */}
        <p className="font-serif text-2xl md:text-3xl italic text-neutral-800 dark:text-neutral-200 leading-snug mb-8 flex-grow">
          "{quote}"
        </p>

        {/* Author */}
        <div className="flex flex-row items-center mt-auto pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="w-8 h-8 rounded-full bg-neutral-200 dark:bg-neutral-700 flex items-center justify-center mr-3 text-sm font-bold text-neutral-500 dark:text-neutral-400">
            {author.charAt(0)}
          </div>
          <div>
            <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100">
              {author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
