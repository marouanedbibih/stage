import React, { useEffect, useState } from "react";
import PortfolioCard from "../../components/Card/PortfolioCard";
import { useStateContext } from "../../contexts/ContextProvider";
import PostCard from "../../components/Card/PostCard";
import axiosClient from "../../api/axios";
import { AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";

function Portfolio() {
  const { user } = useStateContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosts();
  }, [user.id]); // Add user.id to the dependency array to re-fetch posts when the user changes

  const getPosts = () => {
    setLoading(true);
    setError(null);

    axiosClient
      .get(`/users/${user.id}/posts`)
      .then(({ data }) => {
        setPosts(data.posts);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching posts.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteClick = (id) => {
    if (!window.confirm("Are you sure you want to delete this Post?")) {
      return;
    }
    axiosClient
      .delete(`/posts/${id}`)
      .then(() => {
        getPosts();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="flex flex-row gap-8 justify-between items-start">
      <PortfolioCard user={user} />
      <div className="flex flex-col gap-12">
        {loading && <p>Loading posts...</p>}
        {error && <p>Error: {error}</p>}
        {!loading &&
          !error &&
          posts.map((post) => (
            <PostCard key={post.id} post={post} onDeleteClick={onDeleteClick}  />
          ))}
      </div>
      <div className="grid grid-cols-1  justify-items-center content-center gap-4">
        <Link
          to="/posts/create"
          className="w-full px-3.5 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
        >
          Add New Post
        </Link>{" "}
      </div>
    </div>
  );
}

export default Portfolio;
