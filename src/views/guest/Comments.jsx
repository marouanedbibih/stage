import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../../api/axios";
import PostCard from "../../components/Card/PostCard";
import CommentCard from "../../components/Card/CommentCard";

function Comments() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]); // Initialize with an empty array

  let { id } = useParams();

  useEffect(() => {
    getPost();
    getComments();
  }, [id]);

  console.log("Comments Post",post.user)

  const getPost = () => {
    setLoading(true);
    setError(null);

    axiosClient
      .get(`/posts/${id}`)
      .then(({ data }) => {
        console.log('Post API',data.post)
        setPost(data.post);
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
        // Implement logic to handle post deletion if needed
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getComments = () => {
    setLoading(true);
    setError(null);
    axiosClient
      .get(`/posts/${id}/comments`)
      .then(({ data }) => {
        setComments(data.comments);
        console.log("Comments", comments);
      })
      .catch((error) => {
        setError(error.message || "An error occurred while fetching comments.");
      })
      .finally(() => {
        setLoading(false);
      });
  };



  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center w-1/2">
      {post && post.id && (
          <PostCard key={post.id} post={post} onDeleteClick={onDeleteClick} />
        )}

        {comments.map((comment) => (
          <CommentCard key={comment.id} comment={comment} getComments={getComments} />
        ))}
      </div>

    </div>
  );
}

export default Comments;
