import React, { useEffect, useState } from "react";
import PortfolioCard from "../../components/Card/PortfolioCard";
import PostCard from "../../components/Card/PostCard";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../api/axios";
import { Link, useParams } from "react-router-dom";

function Portfolio() {
  const { user } = useStateContext();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id: userId } = useParams();

  const getPosts = () => {
    setLoading(true);
    setError(null);
    const targetUserId = userId || (user && user.id);

    if (!targetUserId) {
      setError("User ID is not available");
      setLoading(false);
      return;
    }

    axiosClient
      .get(`/users/${targetUserId}/posts`)
      .then(({ data }) => {
        setDatas(data.posts);
        console.log("User ID", targetUserId);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching posts.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getPosts();
  }, [userId, user]);

  const onDeleteClick = (id) => {
    const userConfirmation = window.confirm("Are you sure you want to delete this post?");
    
    if (userConfirmation) {
      axiosClient
        .delete(`/posts/${id}`)
        .then((response) => {
          console.log("Post deleted successfully");
          getPosts();
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
        });
    } else {
      console.log("Deletion canceled by user.");
    }
  };
  
  

  return (
    <div className="flex flex-row gap-8 justify-between items-start">
      <PortfolioCard user={user} />
      <div className="flex flex-col gap-12">
        {loading && <p>Loading posts...</p>}
        {error && <p>Error: {error}</p>}
      </div>
      <div className="grid grid-cols-1 w-full gap-4">
      {!loading &&
        !error &&
        datas.map((data) => (
          <PostCard key={data.post.id} data={data}   onDeleteClick={onDeleteClick} />
        ))}
      </div>

      <div className="grid grid-cols-1  justify-items-center content-center gap-4 w-1/4">
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
