import { Footer } from "../components";
import { AuthProvider } from "../context/authProvider";
import { DataProvider } from "../context/dataContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <DataProvider>
        <section className="min-h-body">
          <Component {...pageProps} />
        </section>
        <Footer />
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
