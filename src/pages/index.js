import React, { useEffect, useState } from "react";
import { getUserList } from "@/api";
import UserCard from "@/components/UserCard";
import isEmpty from "lodash/isEmpty";
import InfiniteScroll from "react-infinite-scroll-component";
import UserInputSearch from "@/components/UserInputSearch";
import EmptyUsersState from "@/components/EmptyUsersState";

const INITIAL_PAGINATION_DATA = {
  page: 1,
  hasMoreItems: false,
};

const LIMIT = 24;

const Home = () => {
  const [userSearchText, setUserSearchText] = useState();
  const [pagination, setPagination] = useState(INITIAL_PAGINATION_DATA);
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  const fetchGitHubUsersList = async (searchKey, pageNumber) => {
    try {
      const res = await getUserList(searchKey, pageNumber, LIMIT);
      const response = await res.json();

      const newPageData = response?.items;
      if (!isEmpty(newPageData)) {
        if (pageNumber === 1) {
          setData(newPageData);
          setPagination({
            page: 1,
            hasMoreItems: response?.total_count > LIMIT,
          });
        } else {
          setData((prev) => [...prev, ...newPageData]);
          setPagination({
            page: pageNumber,
            hasMoreItems: response?.total_count / LIMIT > pageNumber,
          });
        }
      } else {
        setError(response?.message);
      }
    } catch (err) {
      setError("An error occured. Please try again!!");
    }
  };

  const handleUserSearchChange = (e) => {
    const updatedText = e.target.value;

    setError();
    setUserSearchText(updatedText);
    if (updatedText?.length > 0) {
      fetchGitHubUsersList(updatedText, 1);
    } else {
      setData([]);
      setPagination(INITIAL_PAGINATION_DATA);
    }
  };

  const handleLoadMore = () => {
    fetchGitHubUsersList(userSearchText, pagination.page + 1);
  };

  return (
    <>
      <title>GitHub Users List</title>
      <div>
        <div className="container mx-auto py-4">
          <UserInputSearch
            userSearchText={userSearchText}
            handleUserSearchChange={handleUserSearchChange}
            error={error}
          />

          {isEmpty(data) ? (
            <EmptyUsersState textLength={userSearchText?.length || 0} />
          ) : (
            <InfiniteScroll
              dataLength={data?.length}
              next={handleLoadMore}
              hasMore={pagination?.hasMoreItems}
              loader={<p className="mt-2 text-center">Loading...</p>}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data.map((item) => (
                  <UserCard key={item.id} cardInfo={item} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
