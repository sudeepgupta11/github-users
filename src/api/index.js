import { searchGitHubUsersUrl } from "./routes";

export const getUserList = (userName, page, per_page) => {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;

  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  return fetch(
    `${searchGitHubUsersUrl}?${new URLSearchParams({
      q: userName,
      sort: "followers",
      order: "desc",
      page,
      per_page,
    })}`,
    {
      method: "GET",
      headers,
    }
  );
};
