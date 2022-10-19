import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Landing } from "../components";
import { useAuthContext } from "../context/authProvider";
import { useDataContext } from "../context/dataContext";
import { clearErrorMessage } from "../reducer/actions";

export default function Home() {
  const router = useRouter();
  const {
    authState: { authToken },
  } = useAuthContext();
  const {
    dataState: { error },
    dataDispatch,
  } = useDataContext();

  useEffect(() => {
    if (!authToken) {
      router.replace("/login");
    }
  }, [authToken, router]);

  return (
    !!authToken && (
      <>
        <Head>
          <title>FINSAVER | Home</title>
        </Head>
        {error && (
          <div className="fixed z-30 w-64 top-20 right-2 bg-red-600 p-2 rounded-lg text-gray-200">
            <i
              class="fa-regular fa-rectangle-xmark fa-lg hover:scale-150 cursor-pointer py-2"
              onClick={() => clearErrorMessage(dataDispatch)}
            ></i>
            <p>{error}</p>
          </div>
        )}
        <Landing />
      </>
    )
  );
}
