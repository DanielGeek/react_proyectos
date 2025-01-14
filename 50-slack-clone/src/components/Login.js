import { Button } from '@material-ui/core';
import { signInWithPopup } from 'firebase/auth';
import React from 'react'
import styled from 'styled-components';
import { auth, provider } from '../firebase';
function Login() {

  const signIn = async(e) => {
    e.preventDefault();
    try {

      await signInWithPopup(auth, provider);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
          alt=""
        />
        <h1>Sign in to the SalomonsGeeks</h1>
        <p>salomonsgeeks.slack.com</p>

        <Button onClick={signIn}>
          Sign in with Google
        </Button>
      </LoginInnerContainer>
    </LoginContainer>
  )
}

export default Login;

const LoginContainer = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: grid;
  place-items: center;
`;

const LoginInnerContainer = styled.div`
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }

  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #0a8d48 !important;
    color: white;
  }
`;