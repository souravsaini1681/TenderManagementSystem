import NavBar from "../NavBar";
import PropTypes from "prop-types";

function PublicLayout({ children }) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}

PublicLayout.propTypes = {
  children: PropTypes.node,
};

export default PublicLayout;
