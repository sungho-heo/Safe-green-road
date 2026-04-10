"use client";

import React, { useState } from "react";

interface SearchBoxProps {
  onSearch: (keyword: string) => void;
}

const SearchBox = ({ onSearch }: SearchBoxProps) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 들어오는 데이터 띄워쓰기 방지.
    if (text.trim()) onSearch(text);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="목적지 검색."
          className="w-full py-4 px-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-md border-2 border-transparent focus:border-blue-500 outline-none text-lg font-bold transition-all placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-xl"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
