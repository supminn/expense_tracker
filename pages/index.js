import Head from "next/head";
import { Landing, Welcome } from "../components";
import { useAuthContext } from "../context/authProvider";

export default function Home() {
  const {
    authState: { isLoggedIn },
  } = useAuthContext();
  return (
    <div>
      <Head>
        <title>Welcome to FINSAVER</title>
      </Head>
      {isLoggedIn ? <Landing /> : <Welcome />}
    </div>
  );
}
