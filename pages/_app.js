import { Footer } from "../components";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <section className="min-h-body">
        <Component {...pageProps} />
      </section>
      <Footer />
    </>
  );
}

export default MyApp;
