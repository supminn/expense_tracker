import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Landing } from "../components";
import { useAuthContext } from "../context/authProvider";

export default function Home() {
  const router = useRouter();
  const {
    authState: { authToken },
  } = useAuthContext();

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
        <Landing />
      </>
    )
  );
}
