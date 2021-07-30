import React, { useState, useEffect } from 'react';
// import ActionCable from 'actioncable';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { API_ROOT } from './constants';
import { getUserTokenCookie } from './user-auth/userAuth';
import Navbar from './navbar/Navbar';
import UserForm from './user-form/UserForm';
import ChatroomList from './chatroom/chatroom-list/ChatroomList';
import ChatroomShow from './chatroom/chatroom-show/ChatroomShow';
import ChatroomForm from './chatroom/chatroom-form/ChatroomForm';
import useStyles from './styles';

export default function App() {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  const token = getUserTokenCookie();

  useEffect(() => {
    async function getUser() {
      try {
        const response = await fetch(`${API_ROOT}/users`, {
          headers: {
            Authentication: token,
          },
        });
        const userData = await response.json();
        if (!userData) {
          console.log('no chatrooms were received');
        } else {
          setCurrentUser(userData);
        }
      } catch (e) {
        setCurrentUser(null);
        console.log(e);
      }
    }

    if (token) {
      getUser();
    }
  }, [token]);

  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar
          currentUserId={currentUser ? currentUser.id : false}
          currentUser={currentUser}
        />
        <div className={classes.root}>
          {currentUser ? (
            <>
              <div className={classes.formAndListRoot}>
                <ChatroomList />
                <ChatroomForm />
              </div>
              <Route path="/chatroom/:chatroomId">
                <ChatroomShow currentUser={currentUser} />
              </Route>
            </>
          ) : (
            <UserForm setCurrentUser={setCurrentUser} />
          )}
        </div>
      </Router>
    </>
  );
}
