import React from "react";
import Image from "next/image";

const UserDetailPage = ({ user }) => {
  return (
    <>
      <title>{"User Detail Page"}</title>
      <div className="max-w-xs mx-auto my-10 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <Image
            src={user.avatar_url}
            alt={"User Avatar"}
            height={96}
            width={96}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-gray-600">@{user.login}</p>
        </div>
        <div className="mt-6">
          <p className="text-secondary">
            <span className="font-semibold text-primary">Followers: </span>
            {user.followers}
          </p>
          <p className="text-secondary">
            <span className="font-semibold text-primary">Following: </span>
            {user.following}
          </p>
          <p className="text-secondary">
            <span className="font-semibold text-primary">Public Repos: </span>
            {user.public_repos}
          </p>
        </div>
        <div className="mt-6">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            GitHub Profile
          </a>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { username } = params;
  const apiUrl = `https://api.github.com/users/${username}`;
  const response = await fetch(apiUrl);
  const user = await response.json();

  return {
    props: {
      user,
    },
  };
};

export default UserDetailPage;
