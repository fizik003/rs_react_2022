import { SearchIcon } from "@heroicons/react/solid";
import React, { KeyboardEvent } from "react";

interface SearchInputInterface {
  className?: string;
  searchValue: string;
  onSearch(): void;
  changeValueHandler(e: React.ChangeEvent<HTMLInputElement>): void;
}

export function SearchInput({
  className,
  searchValue,
  changeValueHandler,
  onSearch,
}: SearchInputInterface) {
  const enterKeyPressHandler = (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      onSearch();
    }
  };
  return (
    <div className={className}>
      <div className="bg-white flex w-full">
        <input
          type="text"
          placeholder="search value"
          className="h-10 px-2 outline-none w-full"
          value={searchValue}
          onChange={changeValueHandler}
          onKeyDown={enterKeyPressHandler}
        />
        <button type="button" onClick={onSearch}>
          <SearchIcon className="h-10 w-10 text-gray-500 opacity-50" />
        </button>
      </div>
    </div>
  );
}
