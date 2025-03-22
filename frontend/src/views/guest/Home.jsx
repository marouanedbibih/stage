import React, { useEffect, useState, useCallback } from "react";
import axiosClient from "../../api/axios";
import PostCard from "../../components/Card/PostCard";
import PostHomeCard from "../../components/Card/PostHomeCard";
import HomePostsCard from "../../components/Card/HomePostsCard";


function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState(true);


  const getPosts = useCallback(() => {
    if (request == true) {
      setLoading(true);
      setRequest(false);
      axiosClient
        .get(`getAllPostsWithUser?page=${page}`)
        .then(({ data }) => {
          console.log("Data Response",data);
          setPosts((prevPosts) => {
            const newPosts = data.posts.data.filter((newPost) => {
              return !prevPosts.some((prevPost) => prevPost.id === newPost.id);
            });
            setRequest(true);

            return [...prevPosts, ...newPosts];
          });
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [page]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const handleScroll = () => {
    // Check if the user has scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // Load more posts when scrolling to the bottom
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-1/2 flex flex-col gap-4">
        {posts.map((data) => (
          <HomePostsCard key={data.id} data={data} />
          // console.log("Post Home Card",data)
        ))}
        {loading && <p>Loading more posts...</p>}
      </div>
    </div>
  );
}

export default Home;
