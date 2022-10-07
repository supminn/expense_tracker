import { useState } from "react";
import Loader from "react-loader-spinner";
import { Password, SecondaryButton } from "../components";

export default function Register() {
  const signed = false;
  const [{ username, password, email, name, error }, setCredentials] = useState(
    {
      name: "",
      email: "",
      username: "",
      password: "",
      error: "",
    }
  );

  const signupHandler = async (event) => {
    event.preventDefault();
    if (!isPasswordValid()) {
      setCredentials((data) => ({
        ...data,
        error:
          "Password must contain at least 8 characters, at least 1 number and both lower and uppercase letters.",
      }));
    } else {
      dispatch(startLoadingAuth());
      await dispatch(registerUser({ username, password, email, name }));
      setCredentials((data) => ({
        name: "",
        email: "",
        username: "",
        password: "",
        error: "",
      }));
    }
  };

  const isPasswordValid = () => {
    if (
      password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/) ==
      null
    )
      return false;
    else return true;
  };
  return signed ? (
    <Registered />
  ) : (
    <div className="shadow-xl p-2 m-auto mt-10 bg-gray-100 w-full sm:w-11/12 md:w-3/4 lg:w-8/12 text-center">
      <h2 className="text-2xl font-medium m-3 text-green-900">
        Sign <span className="text-amber-700">up</span>
      </h2>
      <form
        className="border border-green-900 rounded-sm p-6 md:w-3/4 m-auto lg:w-8/12"
        onSubmit={signupHandler}
      >
        <div className="p-2">
          <input
            required
            className="p-2 rounded-sm border border-transparent  focus:outline-none focus:ring-2 focus:ring-green-900 w-3/4"
            type="text"
            value={name}
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                name: e.target.value,
              }))
            }
            placeholder="Name"
          />
          <span className="p-2 bg-green-900 text-green-50 rounded-sm">
            <i className="fas fa-address-card fa-lg"></i>
          </span>
        </div>
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
        <div className="p-2">
          <span className="p-2 bg-green-900 text-green-50 rounded-sm">
            <i className="fas fa-envelope fa-lg"></i>
          </span>
          <input
            required
            className="p-2 rounded-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-green-900 w-3/4"
            type="email"
            value={email}
            onChange={(e) =>
              setCredentials((credentials) => ({
                ...credentials,
                email: e.target.value,
              }))
            }
            placeholder="Email address"
          />
        </div>
        <Password userValue={password} setCredentials={setCredentials} />
        {error && <p className="text-red-600 pt-3">{error}</p>}
        <button
          type="submit"
          className={`border-green-800 border-2 p-1 m-1 rounded-sm bg-green-800 text-amber-200 font-medium hover:bg-green-900 hover:-translate-y-0.5 mt-2`}
        >
          Register
        </button>
        {/* {auth.error && (
          <p className="text-red-600 text-lg pt-3">{auth.error}</p>
        )} */}
      </form>
      <div className="text-lg font-semibold p-2 md:w-3/4 lg:w-8/12 m-auto">
        Already a member? <SecondaryButton text="Login" href="/login" />
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

const Registered = () => {
  const userDispatch = useDispatch();
  return (
    <div className="shadow-xl pb-1 m-auto w-full sm:w-11/12 md:w-3/4 lg:w-8/12 text-center min-h-body">
      <h3 className="text-2xl p-4">
        Thank you for signing up on <b>SupSocial</b>.
      </h3>
      <SecondaryButton text="Login to continue" href="/login" />
    </div>
  );
};
