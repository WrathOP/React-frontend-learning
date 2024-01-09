import propTypes from "prop-types";

const Header = ({ title }) => {
  return () => {
    <header>
      <h1 style={headerStyle}>{title}</h1>
    </header>;
  };
};
export default Header;
Header.defaultProps = {
  title: propTypes.string.isRequired,
};

const headerStyle = {
  color: "red",
};
