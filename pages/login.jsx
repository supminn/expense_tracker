import { useState } from "react";
import { Password, SecondaryButton } from "../components";
import Loader from "react-loader-spinner";

export default function Login() {
  const [{ username, password }, setCredentials] = useState({
    username: "",
    password: "",
  });
  const loginHandler = (event) => {
    event.preventDefault();
    console.log("logging creds", username, password);
  };
  return (
    <div className="shadow-xl p-2 m-auto mt-10 w-full sm:w-11/12 md:w-3/4 lg:w-8/12 text-center bg-gray-100">
      <h2 className="text-2xl font-medium m-3 text-green-900">
        Login to <span className="text-amber-700">continue!</span>
      </h2>
      <form
        className="border border-green-900 rounded-sm p-6 md:w-3/4 m-auto lg:w-8/12"
        onSubmit={loginHandler}
      >
        <div className="p-2">
          <span className="p-2 bg-green-900 text-green-50 rounded-sm">
            <i className="fas fa-at fa-lg"></i>
          </span>
          <input
            required
            className="p-2 rounded-sm border border-transparent  focus:outline-none focus:ring-2 focus:ring-green-900 w-3/4"
            type="text"
            value={username}
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                username: e.target.value,
              }))
            }
            placeholder="Username"
          />
        </div>
        <Password userValue={password} setCredentials={setCredentials} />
        <button
          type="submit"
          className={`border-green-800 border-2 p-1 m-1 rounded-sm bg-green-800 text-amber-200 font-medium hover:bg-green-900 hover:-translate-y-0.5 mt-2`}
        >
          Login
        </button>
        <p
          className="font-semibold text-green-900 hover:text-amber-700 cursor-pointer hover:underline"
          onClick={() =>
            setCredentials((credentials) => ({
              ...credentials,
              username: "tester",
              password: "Testing1",
            }))
          }
        >
          Use test credentials
        </p>
        {/* {auth.error && (
          <p className="text-red-600 text-lg pt-3">{auth.error}</p>
        )} */}
      </form>

      <div className="p-2 md:w-3/4 lg:w-8/12 m-auto">
        <b className="text-lg">Not a member? </b>
        <SecondaryButton text="Register" href="/register" />
      </div>

      {/* {auth.loading && (
        <Loader
          className="m-auto w-min"
          type="Oval"
          color="#1e3a8a"
          height={40}
          width={40}
        />
      )} */}
    </div>
  );
}
