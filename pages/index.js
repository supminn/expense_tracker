import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Welcome } from "../components";
import { useAuthContext } from "../context/authProvider";

export default function Home() {
  const {
    authState: { authToken },
  } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!!authToken) {
      router.push("/home");
    }
  }, [authToken, router]);

  return (
    <div>
      <Head>
        <title>Welcome to FINSAVER</title>
      </Head>
      <Welcome />
    </div>
  );
}
