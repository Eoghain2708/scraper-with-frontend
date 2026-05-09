
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (!input.trim()) return

    navigate(`/?q=${encodeURIComponent(input)}`)
  }
    return (
    <form className="w-100 mx-auto" onSubmit={handleSearch}>
      <label
        htmlFor="search"
        className="block mb-2.5 text-sm font-medium text-heading sr-only "
      >
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 inset-s-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
          </svg>
        </div>
          <input
          type="search"
          id="search"
          className="block w-full p-3 ps-9 bg-neutral-secondary-medium
          border-b-2 border-b-red-500
          border-r border-r-red-500/20
          border-l border-l-red-500/20
          outline-0 rounded-xl text-heading
          text-sm shadow-xs placeholder:text-body"
          placeholder="Search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="absolute inset-e-1.5 bottom-1.5 text-white
           box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs
           font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none
          bg-red-500/40 hover:bg-red-500"
        >
          Search
        </button>
      </div>
    </form>
  );
}