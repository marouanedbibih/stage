import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../../api/axios.js";
import { useStateContext } from "../../contexts/ContextProvider.jsx";
import coverImage from "../../../public/images/cover-default.jpg";

function PostForm() {
  const navigate = useNavigate();
  const {user} = useStateContext();
  let { id } = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    file: null,
    url_media: null,
    image_url:null,
  });
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext();
  const [loading, setLoading] = useState(false);

  const onImageChoose = (ev) => {
    const file = ev.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPost({
        ...post,
        file: file,
        image_url: reader.result,
      });
      ev.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setPost(data.post);
          console.log(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const payload = { ...post };
    if (payload.file) {
      payload.file = payload.image_url;
    }
    console.log("Payload", payload);

    if (id) {
      axiosClient
        .put(`/posts/${id}`, payload)
        .then(() => {
          setNotification("Section was successfully updated");
          navigate(`/portfolio/${user.id}`);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/posts", payload)
        .then(() => {
          setNotification("Post was successfully created");
          navigate(`/portfolio/${user.id}`);
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      <div className="w-full h-20 justify-between items-center inline-flex">
        <div className="text-black text-5xl font-bold font-['Roboto'] leading-[62.40px]">
          {post.id && <h1>Update Post: {post.title} </h1>}
          {!post.id && <h1>New Post</h1>}
        </div>
      </div>
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}

        {!loading && (
          <form onSubmit={onSubmit} className="grid grid-cols-2 items-start gap-4 ">
            <div className="grid grid-colms-1 gab-8 ">
              <input
                value={post.title}
                onChange={(ev) =>
                  setPost({ ...post, title: ev.target.value })
                }
                placeholder="Post Title"
                className="outline-none bg-white w-full h-20 border-2 border-gray-300 mb-[15px] px-[15px] py-[15px] box-border text-[14px] transition duration-300 rounded-[16px] focus:border-gray-800"
              />

              <textarea
                value={post.description}
                onChange={(ev) =>
                  setPost({ ...post, description: ev.target.value })
                }
                placeholder="Description about Post"
                className="outline-none bg-white w-full h-80 border-2 border-gray-300 mb-[15px] px-[15px] py-[15px] box-border text-[14px] transition duration-300 rounded-[16px] focus:border-gray-800"
              />
            </div>

            <div className="flex justify-center items-center">
              <label htmlFor="profile-image" className="file-input-label">
                <div className="relative w-[480px] h-[480px] rounded overflow-hidden border-2 border-gray-300 bg-white">
                  <img
                    src={
                      post.image_url ||
                      (id
                        ? `${import.meta.env.VITE_API_BASE_URL}/${
                            post.url_media
                          }`
                        : coverImage)
                    }
                    alt="Profile Image"
                    className="w-full h-full object-cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <input
                    type="file"
                    id="profile-image"
                    className="hidden"
                    accept="image/*"
                    onChange={(ev) => onImageChoose(ev, "image")}
                  />
                </div>
              </label>
            </div>
            <div className="grid grid-cols-1 w-1/12">
              <button
                type="submit"
                className="w-[81px] px-3.5 py-2 bg-emerald-600 rounded-lg shadow justify-center items-center gap-2 flex text-white text-xs font-bold font-['Roboto'] uppercase leading-[18px]"
              >
                Save
              </button>{" "}
            </div>
          </form>
        )}
      </div>
    </>
  );
}

export default PostForm