import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';
import { API_ROOT } from '../../constants';
import useStyles from './styles';

export default function ChatroomForm() {
  const classes = useStyles();
  const [chatroomName, setChatroomName] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleInputChange = event => {
    if (inputError) {
      setInputError(false);
    }
    setChatroomName(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (chatroomName.length > 0) {
      try {
        const response = await fetch(`${API_ROOT}/chatrooms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: chatroomName }),
        });
        setChatroomName('');
        console.log('response status', response.status);
      } catch (e) {
        console.log(e);
      }
    } else {
      setInputError(true);
    }
  };

  return (
    <div className={classes.root}>
      <h2>Add a new chatroom</h2>
      <form
        className={classes.formRoot}
        onSubmit={event => handleFormSubmit(event)}
      >
        <FormControl>
          <InputLabel htmlFor="chatroom-name-input">Chatroom Name</InputLabel>
          <Input
            id="chatroom-name-input"
            onChange={event => handleInputChange(event)}
            value={chatroomName}
          />
          {inputError && (
            <FormHelperText error>*Chatroom name required</FormHelperText>
          )}
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Add Chatroom
        </Button>
      </form>
    </div>
  );
}
