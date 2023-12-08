import {createContext, useContext, useState} from "react";

const StateContext = createContext({
  currentUser: null,
  token: null,
  tokenAdmin: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setAdmin: () => {},
  setTokenAdmin: () => {},
  setNotification: () => {}
})

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [token, _setToken] = useState(localStorage.getItem('access_token'));
  const [admin, setAdmin] = useState(null);
  const [tokenAdmin, _setTokenAdmin] = useState(localStorage.getItem('adminToken'));
  const [notification, _setNotification] = useState('');

  const setToken = (token) => {
    _setToken(token)
    if (token) {
      localStorage.setItem('access_token', token);
    } else {
      // localStorage.removeItem('access_token');
    }
  }
  const setTokenAdmin = (token) => {
    _setTokenAdmin(token)
    if (token) {
      localStorage.setItem('adminToken', token);
    } else {
      // localStorage.removeItem('access_token');
    }
  }
  const setNotification = message => {
    _setNotification(message);

    setTimeout(() => {
      _setNotification('')
    }, 5000)
  }

  return (
    <StateContext.Provider value={{
      user,
      setUser,
      admin,
      setAdmin,
      tokenAdmin,
      setTokenAdmin,
      token,
      setToken,
      notification,
      setNotification
    }}>
      {children}
    </StateContext.Provider>
  );
}

export const useStateContext = () => useContext(StateContext);
