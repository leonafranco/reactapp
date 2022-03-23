import "./signUp.styles.scss";
import SignUpForm from "../../components/signUp-forms/signUp-form.component";
import SignInForm from "../../components/signIn-forms/signIn-form.component";
import logo from "../../imgs/tumblr.png";
import ButtonSignInPage from "../../components/button-signUp-page/button-signUp-page.component";
import { useState } from "react";

const SignUp = () => {
  const [buttonSignInForm, setButtonSignInForm] = useState(false);

  return (
    <div className="mainDiv">
      <div className="div1">
        <img src={logo} alt=" logo" />
      </div>
      <div className="div2">
        <div className="div2Son">
          <h1>De ESTGOH para a ESTGOH</h1>
          <SignUpForm />
          <br />
          <h2>Já tem conta?</h2>
          <ButtonSignInPage
            buttonType="regular"
            onClick={() => setButtonSignInForm(true)}
          >
            Entrar
          </ButtonSignInPage>
        </div>
        <SignInForm
          trigger={buttonSignInForm}
          setTrigger={setButtonSignInForm}
        />
      </div>
    </div>
  );
};

export default SignUp;
