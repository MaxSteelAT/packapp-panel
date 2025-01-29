import './App.css';
import './signin.css';
import logo from './assets/images/undraw_access-account_aydp.svg'
import { useState } from 'react';

const style = {
  App: {
    display: "flex",
    justifyContent: "space-arround",
    alignItems: "center",
    minHeight: "inherit"
  }
}

function App() {
  const [emailInput, setEmailInput] = useState('')
  const [showEmailError, setShowEmailError] = useState(false)

  const changeEmailInput = (event) => {
    const text = event.target.value
    setEmailInput(text)
  }

  const emailValidation = () => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regexEmail.test(emailInput)) {
      setShowEmailError(false);
    } else {
      setShowEmailError(true);
    }
  }

  const [passwordInput, setPasswordInput] = useState('')
  const [showPasswordError, setPasswordError] = useState(false)

  const changePasswordInput = (event) => {
    const text = event.target.value
    setPasswordInput(text)
  }

  const passwordValidation = () => {
    if (passwordInput.length > 8) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  }

  const buttonValidation = () => {
    emailValidation();
    passwordValidation();
  };

  const registerButton = () => {
    alert("You registered!");
  };

  const gmailButton = () => {
    alert("Login not available!");
  };

  return (
    <div style={style.App}>
      <div className='ilustration'>
        <img src={logo}></img>
      </div>
      <div className='formSection'>
        <div className='newAccoutn'>
          <h1>Already have an accoutn?</h1>
          <button onClick={registerButton}>Register</button>
        </div>
        <div className='title'>
          <h1>Hello! Welcome back.</h1>
          <p>Log in with your data that you entered during Your registration</p>
        </div>
        <div className='form'>
          <div>
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Email address:
            </label>
            <input placeholder="Example@email.com" type="text" value={emailInput} onChange={changeEmailInput} />
            {showEmailError && (
              <p>Email is invalid</p>
            )}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}> Password:</label>
            <input type="password" value={passwordInput} onChange={changePasswordInput} />
            {showPasswordError && (
              <p>Your password is less than 8 characters</p>
            )}
          </div>
          <button onClick={buttonValidation}>Start now?</button>
        </div>
        <h3>OR</h3>
        <button onClick={gmailButton}>Singin with Google</button>
        <h3>Don't have an accoutn?</h3>
        <a>Sing up</a>
      </div>
    </div>
  );
}

export default App;
