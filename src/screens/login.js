import '../assets/css/signin.css';
import logo from '../assets/images/undraw_access-account_aydp.svg'
import { useState, useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [emailInput, setEmailInput] = useState('')
  const [showEmailError, setShowEmailError] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPasswordError, setPasswordError] = useState(false)

  const { login } = useContext(AuthContext);

  // useEffect(() => {
  //   // Verificar si hay un token guardado en localStorage
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     login(token);
  //   }
  // }, [login]);

  const changeEmailInput = (event) => {
    const text = event.target.value
    setEmailInput(text)
    emailValidation();
  }

  const emailValidation = () => {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (regexEmail.test(emailInput)) {
      setShowEmailError(false);

    } else {
      setShowEmailError(true);
    }
  }

  const changePasswordInput = (event) => {
    const text = event.target.value
    setPasswordInput(text)
    passwordValidation();
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

    if (!showEmailError && !showPasswordError) {
      fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
        })
      })
        .then(response => response.json())
        .then((response) => {
          console.log(response);
          if (response.success) {
            login(response.token)
          } else {
            alert("No puedes entrar, bye")
          }
        }).catch((error) => {
          console.error(error);
        })
      //haremos una peticion al backend
    }
  };

  const registerButton = () => {
    alert("You registered!");
  };

  const gmailButton = () => {
    alert("Login not available!");
  };

  return (
    <div className='App'>
      <div className='ilustration'>
        <img src={logo}></img>
      </div>
      <div className='formSection'>
        <div className='newAccout'>
          <h3 className='register'>Already have an accoutn?</h3>
          <button className='buttonRegister' onClick={registerButton}>Register</button>
        </div>
        <div>
          <h1 className='title'>Hello! Welcome back.</h1>
          <p className='descriptionTitle'>Log in with your data that you entered during Your registration</p>
        </div>
        <div className='form'>
          <div>
            <label className='email' htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>
              Email address:
            </label>
            <input className='input' placeholder="Example@email.com" type="text" value={emailInput} onChange={changeEmailInput} />
            {showEmailError && (
              <p>Email is invalid</p>
            )}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}> Password:</label>
            <input className='input' type="password" value={passwordInput} onChange={changePasswordInput} />
            {showPasswordError && (
              <p>Your password is less than 8 characters</p>
            )}
          </div>
          <button disabled={showEmailError || showPasswordError} className='buttonStart' onClick={buttonValidation}>Start now?</button>
        </div>
        <h3 className='separator'>OR</h3>
        <button className='gmailButton' onClick={gmailButton}>Signin with Google</button>
        <div className='signUp'>
          <h3>Don't have an accoutn?</h3>
          <a>Sing up</a>
        </div>

      </div>
    </div>
  );
}

export default Login;