import React, { useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../api/axios";
import { Link } from "react-router-dom";

function Login() {
  const { setUser, _setToken, _setRole, setNotification } = useStateContext();

  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState(null);
  const [errors, setErrors] = useState(null);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(payload);
    axiosClient
      .post("/login", payload)
      .then(({ data }) => {
        console.log(data);
        setUser(data.user);
        _setRole(data.user.role);
        _setToken(data.token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
          if (!response.data.errors) {
            setMessage(response.data.message);
          }

          setTimeout(() => {
            setErrors(null);
            setMessage(null);
          }, 5000);
        }
      });
  };

  return (
    <div className="grid grid-cols-1">
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
      {message && (
        <div className="alert">
            <p >{message}</p>
        </div>
      )}

      <form
        className="w-[439px] h-[407px] p-6 bg-white rounded-lg shadow flex-col justify-center items-center gap-6 inline-flex"
        onSubmit={onSubmit}
      >
        <div className="flex-col justify-center items-center gap-3 flex">
          <div className="text-neutral-800 text-2xl font-bold font-['Roboto'] leading-9">
            Login into your account
          </div>
          <div className="w-[372px] text-center text-slate-500 text-base font-bold font-['Roboto'] leading-7">
            Welcome! Enter your details to login.
          </div>
        </div>

        <div className="self-stretch h-[182px] flex-col justify-center items-start gap-3 flex">
          {/* email input */}
          <div className="self-stretch h-[71px] justify-start items-start gap-3 inline-flex">
            <div className="grow shrink basis-0 h-[42px] flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-gray-800 text-sm font-bold font-['Roboto'] leading-[21px]">
                Email
              </div>
              <input
                className="self-stretch h-10 p-4 py-3 bg-white bg-opacity-0 rounded-lg border border-gray-300 justify-start items-center gap-2.5 inline-flex outline outline-0 focus:border-2 focus:border-gray-800 focus:transition"
                placeholder="name@example.com"
                type="email"
                ref={emailRef}
              />
            </div>
          </div>
          {/* password input */}
          <div className="self-stretch h-[71px] justify-start items-start gap-3 inline-flex">
            <div className="grow shrink basis-0 h-[42px] flex-col justify-start items-start gap-2 inline-flex">
              <div className="self-stretch text-gray-800 text-sm font-bold font-['Roboto'] leading-[21px]">
                Password
              </div>
              <input
                className="self-stretch h-10 p-4 py-3 bg-white bg-opacity-0 rounded-lg border border-gray-300 justify-start items-center gap-2.5 inline-flex outline outline-0 focus:border-2 focus:border-gray-800 focus:transition"
                placeholder="Entre you password"
                type="password"
                ref={passwordRef}
              />
            </div>
          </div>
        </div>
        <button className="self-stretch px-[18px] py-2.5 bg-gray-800 rounded-lg shadow justify-center items-center gap-2 inline-flex hover:bg-gray-700 active:bg-gray-900">
          <div className="text-white text-sm font-bold font-['Roboto'] uppercase leading-[21px]">
            Login
          </div>
        </button>
        <p class=" block text-center font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
          Already have an account?{" "}
          <Link
            class="font-medium text-gray transition-colors hover:text-blue-700"
            to="/signup
            "
          >
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
