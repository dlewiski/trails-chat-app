/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
} from '@material-ui/core';
import { setUserTokenCookie } from '../user-auth/userAuth';
import { API_ROOT } from '../constants';
import useStyles from './styles';

export default function UserForm(props) {
  const { setCurrentUser } = props;
  const classes = useStyles();
  const [newUsername, setNewUsername] = useState('');
  const [inputError, setInputError] = useState(false);

  const handleInputChange = event => {
    if (inputError) {
      setInputError(false);
    }
    setNewUsername(event.target.value);
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
    if (newUsername.length > 0) {
      try {
        const response = await fetch(`${API_ROOT}/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: newUsername }),
        });
        setNewUsername('');
        const userInfo = await response.json();
        setUserTokenCookie(userInfo.token);
        setCurrentUser(userInfo);
        console.log(userInfo);
        console.log('response status', response.status);
      } catch (e) {
        console.log(e);
      }
    } else {
      setInputError(true);
    }
  };
  return (
    <div>
      <div className={classes.root}>
        <h2>Create your username</h2>
        <form
          className={classes.formRoot}
          onSubmit={event => handleFormSubmit(event)}
        >
          <FormControl>
            <InputLabel htmlFor="chatroom-name-input">Username</InputLabel>
            <Input
              id="chatroom-name-input"
              onChange={event => handleInputChange(event)}
              value={newUsername}
            />
            {inputError && (
              <FormHelperText error>*Username required</FormHelperText>
            )}
          </FormControl>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
