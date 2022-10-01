import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <meta name="description" content="Personal Expense Tracker" />
        <meta name="author" content="Supriya" />
        <meta name="Copyright" content="SupTECH" />
        <meta
          name="keywords"
          content="expense tracker, personal tracker, personal expense tracker, open source, supminn"
        />
        <link rel="icon" href="/favicon.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
