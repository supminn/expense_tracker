export const Footer = () => {
  return (
    <footer className="bg-green-900 p-6">
      <h3 className=" text-center text-green-50 font-semibold mb-2 text-xl">
        Made with <i className="fas fa-heart text-amber-300"></i> by{" "}
        <span className="text-amber-300">Supminn</span>
      </h3>
      <div className="w-max m-auto">
        <a
          className="p-2 text-green-50"
          rel="noopener noreferrer"
          href="https://github.com/supminn"
        >
          <i className="fab fa-github fa-lg"></i>
        </a>
        <a
          className="p-2 text-green-50"
          rel="noopener noreferrer"
          href="https://twitter.com/supminn"
        >
          <i className="fab fa-twitter fa-lg"></i>
        </a>
        <a
          className="p-2 text-green-50"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/supminn"
        >
          <i className="fab fa-linkedin-in fa-lg"></i>
        </a>
      </div>
    </footer>
  );
};
