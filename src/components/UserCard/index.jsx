import React from "react";
import Image from "next/image";
import styles from "./UserCard.module.scss";
import Link from "next/link";

const UserCard = ({ cardInfo }) => {
  return (
    <Link
      href={`/user/${cardInfo?.login}`}
      rel="noopener noreferrer"
      className="cursor-pointer"
    >
      <div
        className={`flex rounded-lg shadow-lg px-6 py-4 hover:bg-[#EEFFFF] ${styles.card}`}
      >
        <Image
          src={cardInfo?.avatar_url}
          alt={"User Avatar"}
          className="rounded-full w-24 h-24"
          height={96}
          width={96}
        />
        <div className="px-6 py-4 flex-wrap  overflow-hidden">
          <p className="text-gray-600 mb-2 truncate">@{cardInfo?.login}</p>
          <a
            href={`/user/${cardInfo?.login}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {"More Info"}
          </a>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
