import PropTypes from "prop-types";

function CustomTextInput({ placeholder, onChange, value }) {
  return (
    <div className="border border-gray-300 rounded-md w-full shadow-sm focus-within:ring-2 focus-within:ring-blue-500 transition duration-200">
      <input
        type="text"
        className="rounded-md w-full p-2 outline-none focus:ring-0"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

CustomTextInput.propTypes = {
  placeholder: PropTypes.string,
};

export default CustomTextInput;
