import { createContext, useContext, useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const HANDLERS = {
  INITIALIZE: 'INITIALIZE',
  SIGN_IN: 'SIGN_IN',
  SIGN_OUT: 'SIGN_OUT'
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  token: null
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token
    };
  },
  [HANDLERS.SIGN_IN]: (state, action) => {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
      token: action.payload.token
    };
  },
  [HANDLERS.SIGN_OUT]: (state) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
      token: null
    };
  }
};

const reducer = (state, action) => (
  handlers[action.type] ? handlers[action.type](state, action) : state
);

export const AuthContext = createContext({ undefined });

export const AuthProvider = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, initialState);
  const initialized = useRef(false);

  useEffect(() => {
    const initializeAuth = async () => {
      let accessToken = null;
      try {
        accessToken = sessionStorage.getItem('accessToken');
      } catch (error) {
        console.error('Error retrieving accessToken:', error);
      }
      if (accessToken) {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        dispatch({ type: HANDLERS.INITIALIZE, payload: { user: userData, token: accessToken } });
      } else {
        dispatch({ type: HANDLERS.SIGN_OUT });
      }
    };

    if (!initialized.current) {
      initializeAuth();
      initialized.current = true;
    }
  }, []);

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/login`, {
        username: email,
        password: password
      });
  
      if (response.data.access_token) {
        const accessToken = response.data.access_token;
        try {
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('userData', JSON.stringify(response.data));
        } catch (err) {
          console.error(err);
        }
  
        dispatch({ type: HANDLERS.SIGN_IN, payload: { user: response.data.user, token: accessToken } });
        return response.status;
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      throw new Error('Please check your email and password');
    }
  };

  const signOut = () => {
    try {
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('userData');
    } catch (err) {
      console.error(err);
    }

    dispatch({ type: HANDLERS.SIGN_OUT });
  };


  const signUp = async (username, password, access_token) => {
    throw new Error('Sign up is not implemented');
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);
