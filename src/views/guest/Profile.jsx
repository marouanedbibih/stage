import React, { useEffect, useState } from "react";
import PortfolioCard from "../../components/Card/PortfolioCard";
import { useStateContext } from "../../contexts/ContextProvider";
import PostCard from "../../components/Card/PostCard";
import axiosClient from "../../api/axios";
import { AiOutlinePlus } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";

function Profile() {
  // const { user } = useStateContext();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  let { id } = useParams();
  const [user,setUser] = useState({});
  useEffect(() => {
    getPosts();
    getUser();
  }, [id]); // Add user.id to the dependency array to re-fetch posts when the user changes

  const getPosts = () => {
    setLoading(true);
    setError(null);

    axiosClient
      .get(`/users/${id}/posts`)
      .then(({ data }) => {
        setPosts(data.posts);
        console.log('Posts',posts)
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching posts.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const getUser = () => {
    axiosClient
      .get(`/users/${id}`)
      .then(({ data }) => {
        setUser(data.user);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching posts.");
      })
      .finally(() => {
        setLoading(false);
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
            <PostCard key={post.id} post={post}  />
          ))}
      </div>
      <div className="grid grid-cols-1  justify-items-center content-center gap-4">
        {
            
        }
        <Link
          to="/posts/create"
          className="w-full px-3.5 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
        >
          Accueil
        </Link>{" "}
      </div>
    </div>
  );
}

export default Profile;
