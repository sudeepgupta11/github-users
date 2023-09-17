import React from "react";
import { CgSearch } from "react-icons/cg";

const UserInputSearch = ({ userSearchText, handleUserSearchChange, error }) => {
  return (
    <>
      <div className="pb-8 w-full flex flex-col items-center justify-center">
        <div className="w-1/2 flex  border border-gray-400 rounded-lg items-center px-2 py-2">
          <input
            type="text"
            value={userSearchText}
            onChange={handleUserSearchChange}
            className="w-full border-transparent focus:outline-none"
            placeholder="Type the username"
          />
          <CgSearch size={20} />
        </div>
        {error && <p className="w-1/2 mt-2 text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default UserInputSearch;
