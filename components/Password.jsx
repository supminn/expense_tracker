import { useState } from "react";

export const Password = ({
  userValue,
  setCredentials,
  placeholder = "Password",
  label = "password",
}) => {
  const [viewPwd, setViewPwd] = useState(false);

  return (
    <div className="p-2">
      <input
        required
        className="p-2 rounded-sm border border-transparent  focus:outline-none focus:ring-2 focus:ring-green-900 w-3/4"
        type={viewPwd ? "text" : "password"}
        value={userValue}
        onChange={(e) =>
          setCredentials((credentials) => ({
            ...credentials,
            [label]: e.target.value,
          }))
        }
        placeholder={placeholder}
      />
      <span
        className="p-2 bg-green-900 text-green-50 rounded-sm cursor-pointer"
        onClick={() => setViewPwd((val) => !val)}
      >
        <i className="fas fa-eye fa-lg"></i>
      </span>
    </div>
  );
};
