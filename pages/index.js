import Head from "next/head";
import { Footer, Welcome } from "../components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Welcome to FINSAVER</title>
      </Head>
      <Welcome />
    </div>
  );
}
