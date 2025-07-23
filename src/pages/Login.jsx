import React, { useState } from "react";

const Login = () => {
  const [currentUser, setCurrentUser] = useState("Login");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    // TODO: handle login or signup logic here
    console.log(`${currentUser} form submitted`);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-[600px] mx-auto my-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentUser}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentUser !== "Login" && (
        <input
          type="text"
          placeholder="Name"
          required
          className="w-full px-3 py-2 border border-gray-800"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        required
        className="w-full px-3 py-2 border border-gray-800"
      />
      <input
        type="password"
        placeholder="Password"
        required
        className="w-full px-3 py-2 border border-gray-800"
      />

      <div className="w-full flex justify-between items-center text-sm text-gray-500">
        <p className="cursor-pointer">Forgot Password</p>

        {currentUser === "Login" ? (
          <p
            onClick={() => setCurrentUser("Signup")}
            className="cursor-pointer"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentUser("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-black text-white font-light px-8 py-2 mt-4"
      >
        {currentUser === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
