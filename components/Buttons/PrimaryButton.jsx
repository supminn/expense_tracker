import Link from "next/link";
import PropTypes from "prop-types";

const PrimaryButton = ({ text, href }) => {
  return (
    <Link href={href}>
      <a className="border-green-800 border-2 p-1 m-1 rounded-sm bg-green-800 text-amber-200 font-medium hover:bg-green-900 hover:-translate-y-0.5">
        {text}
      </a>
    </Link>
  );
};

PrimaryButton.propTypes = {
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
PrimaryButton.defaultProps = {
  text: "",
  href: "",
};

export { PrimaryButton };
