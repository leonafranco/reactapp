import "./button-signUp-page.styles.scss";

const BUTTON_TYPE_OBJECT = {
  google: "google-sign-in",
  regular: "regular-button",
};

const ButtonSignInPage = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_OBJECT[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default ButtonSignInPage;
