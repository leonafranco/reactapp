import { useState } from "react";
import {
  signInUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../firebase/firebase";
import FormInput from "../form-input/form-input.component";
import Button from "../button-signUp-page/button-signUp-page.component";

import "./signIn-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = (props) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInUserWithEmailAndPassword(email, password);
      resetFormFields();
      
    } catch (error) {
      if (error.code === "auth/wrong-password")
        alert("Password ou Email incorretos");
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return props.trigger ? (
    <div className="popup">
      <div className="main">
        <h2>Entre na ESTGOH</h2>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          ></FormInput>
          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          ></FormInput>
          <Button buttonType="regular" type="submit">
            Entrar
          </Button>
          <Button buttonType="google" onClick={signInWithGoogle}>
            Sign In with Google
          </Button>
          <Button buttonType="regular" onClick={() => props.setTrigger(false)}>
            Fechar
          </Button>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default SignInForm;
