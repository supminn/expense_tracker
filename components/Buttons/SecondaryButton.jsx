import Link from "next/link";
import PropTypes from "prop-types";

const SecondaryButton = ({ text, href }) => {
  return (
    <Link href={href}>
      <a className="border-green-800 border-2 p-1 m-1 rounded-md text-green-900 font-medium hover:bg-green-800 hover:text-amber-200 ease-in-out">
        {text}
      </a>
    </Link>
  );
};

SecondaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
SecondaryButton.defaultProps = {
  text: "",
  href: "",
};

export { SecondaryButton };
