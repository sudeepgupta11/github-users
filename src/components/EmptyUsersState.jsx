import React from "react";
import { BiErrorAlt } from "react-icons/bi";

const EmptyUsersState = ({ textLength }) => {
  return (
    <div className="w-full h-[70vh] flex flex-col items-center justify-center">
      <BiErrorAlt size={40} color="#9CA3AF" />
      <div className="mt-4 text-center text-lg text-gray-400 ">
        {textLength > 0 ? (
          <>
            <p>
              {"No user found with the following username"}
              <br />
              {"Type another username to search!!"}
            </p>
          </>
        ) : (
          <>
            <p>
              {"Looking to find GitHub profiles?"}
              <br />
              {"Type a username and let's search!"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default EmptyUsersState;
