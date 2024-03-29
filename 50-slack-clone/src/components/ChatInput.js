import { Button } from '@material-ui/core';
import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore/lite';
import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { startLoadingRoomDetails } from '../features/thunks';
import { auth, db } from '../firebase';

function ChatInput({ channelId, chatRef }) {
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const [user] = useAuthState(auth);


  const sendMessage = async(e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    const newMessage = {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL
    }

    const newDoc = doc( collection( db, `rooms/${channelId}/messages` ))
    await setDoc( newDoc, newMessage );

    dispatch(startLoadingRoomDetails(channelId));

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    setInput('');

  };

  return (
    <ChatInputContainer>
      <form>
        <input
          value={ input }
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #ROOM`}
        />
        <Button hidden type='submit' onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  )
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;