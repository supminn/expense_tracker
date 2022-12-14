import { NhostClient, NhostNextProvider } from "@nhost/nextjs";
import { Footer } from "../components";
import { AuthProvider } from "../context/authProvider";
import { DataProvider } from "../context/dataContext";
import "../styles/globals.css";

export const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN || "",
  region: process.env.NEXT_PUBLIC_NHOST_REGION || "",
});

function MyApp({ Component, pageProps }) {
  return (
    <NhostNextProvider nhost={nhost} initial={pageProps.nhostSession}>
      <AuthProvider>
        <DataProvider>
          <section className="min-h-body">
            <Component {...pageProps} />
          </section>
          <Footer />
        </DataProvider>
      </AuthProvider>
    </NhostNextProvider>
  );
}

export default MyApp;
