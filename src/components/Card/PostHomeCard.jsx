import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../api/axios";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiSolidCommentDetail } from "react-icons/bi";

function PostHomeCard({post}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useStateContext();
  const [likes, setLikes] = useState(0);
  const [nbrComments, setNbrComments] = useState(0);
  const [comment, setComment] = useState({
    comment: "",
  });
  const [isLike, setIsLike] = useState(false);
  // console.log('User Id',post)

  useEffect(() => {
    setLoading(true);
    setError(null);
    getLikes();
    getNumbersComments();
    isPostLiked();
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []); // Dependency array is empty, so it runs only once when the component mounts

  const getLikes = () => {
    axiosClient
      .get(`/posts/${post.id}/likes`)
      .then(({ data }) => {
        setLikes(data.likes);
      })
      .catch((error) => {
        setError("Failed to fetch likes");
        console.error(error);
      });
  };

  const getNumbersComments = () => {
    axiosClient
      .get(`/posts/${post.id}/nbrComments`)
      .then(({ data }) => {
        setNbrComments(data.nbrComments);
      })
      .catch((error) => {
        setError("Failed to fetch likes");
        console.error(error);
      });
  };

  const isPostLiked = () => {
    axiosClient
      .post(`is-like/${post.id}/posts`)
      .then(({ data }) => {
        setIsLike(data.liked);
        console.log("Is Liked", isLike);
      })
      .catch((error) => {
        setError("Failed to fetch likes");
        console.error(error);
      });
  };

  const likePost = () => {
    axiosClient
      .post(`like/${post.id}/posts`)
      .then(({ data }) => {
        setIsLike(true);
        // console.log('Is Liked',isLike)
      })
      .catch((error) => {
        setError("Failed to fetch likes");
        console.error(error);
      });
  };

  const unlikePost = () => {
    axiosClient
      .post(`unlike/${post.id}/posts`)
      .then(({ data }) => {
        setIsLike(false);
        // console.log('Is Liked',isLike)
      })
      .catch((error) => {
        setError("Failed to fetch likes");
        console.error(error);
      });
  };

  const onClick = () => {
    if (isLike == true) {
      unlikePost();
      getLikes();
    } else {
      likePost();
      getLikes();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(comment);
    // Add your logic to submit the comment
    axiosClient
      .post(`comment/${post.id}/posts`, comment)
      .then(({ data }) => {
        getNumbersComments();
        setComment({ comment: "" });
      })
      .catch((error) => {
        setError("Failed to fetch likes");
        console.error(error);
      });
  };
//   console.log('Post Info',post)
  return (
    <div className="flex flex-col justify-end items-center">
      <div className="relative flex w-full max-w-[48rem] flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none shrink-0 rounded-xl bg-clip-border">
          {loading ? (
            <p>Loading image...</p>
          ) : (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL}/${post.url_media}`}
              alt="image"
              className="object-cover w-full h-full"
            />
          )}
        </div>
        <div className="p-6">
          <div className="flex flex-row w-full justify-between items-center">
            <div className="w-1/2 flex flex-row justify-end items-center gap-4">
              {post.user_id == user.id ? (
                <>
                  <Link
                    to={`/posts/update/${post.id}`}
                    className="w-full px-3.5 py-2 bg-emerald-800 hover:bg-emerald-700 active:bg-emerald-900 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
                  >
                    Edit
                  </Link>{" "}
                  <button
                    onClick={() => onDeleteClick(post.id)}
                    className="w-full px-3.5 py-2 bg-red-800 hover:bg-red-700 active:bg-red-900 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
                  >
                    Delete
                  </button>{" "}
                </>
              ) : (
""
              )}
            </div>
            <div className="flex flex-row justify-end items-center gap-2">
              <button onClick={() => onClick()}>
                {isLike ? (
                  <AiFillLike size={24} color="black" />
                ) : (
                  <AiOutlineLike size={24} color="black" />
                )}
              </button>
              <p>{likes}</p>
              <Link to={`/posts/comments/${post.id}`}>
                <BiSolidCommentDetail size={24} color="black" />
              </Link>
              <p>{nbrComments}</p>
            </div>
          </div>

          <h4 className="block my-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {loading ? "Loading title..." : post.title}
          </h4>
          <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
            {loading ? "Loading description..." : post.description}
          </p>
        </div>
      </div>
      <form
        className="w-full flex flex-row justify-center items-center gap-4 mt-4"
        onSubmit={onSubmit}
      >
        <input
          value={comment.comment}
          onChange={(ev) =>
            setComment({ ...comment, comment: ev.target.value })
          }
          placeholder="Add comment"
          className="outline-none bg-white w-full border-2 border-gray-300  px-[15px] py-[15px] box-border text-[14px] transition duration-300 rounded-[16px] focus:border-gray-800"
        />
        <button
          type="submit"
          className="w-[81px] px-3.5 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
        >
          Send
        </button>{" "}
      </form>
    </div>
  );
}

export default PostHomeCard;
