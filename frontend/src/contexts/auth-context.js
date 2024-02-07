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
    const user = action.payload;

    return {
      ...state,
      ...(
        user
          ? ({
            isAuthenticated: true,
            isLoading: false,
            user: action.payload.user,
            token: action.payload.token
          })
          : ({
            isLoading: false
          })
      )
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

  const initialize = async () => {
    if (initialized.current) {
      return;
    }
  
    initialized.current = true;
  
    let isAuthenticated = false;
  
    try {
      isAuthenticated = window.sessionStorage.getItem('authenticated') === 'true';
    } catch (err) {
      console.error(err);
    }
  
    if (isAuthenticated) {
      // Obter os detalhes do usuário e token do sessionStorage
      const userData = JSON.parse(sessionStorage.getItem('userData'));
      dispatch({
        type: HANDLERS.INITIALIZE,
        payload: {
          user: userData.user,
          token: userData.access_token
        }
      });
    } else {
      dispatch({
        type: HANDLERS.INITIALIZE
      });
    }
  };

  useEffect(() => {
    initialize();
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
          sessionStorage.setItem('authenticated', 'true'); // Definir como autenticado
          sessionStorage.setItem('userData', JSON.stringify(response.data));
          sessionStorage.setItem('accessToken', JSON.stringify(response.data.access_token));
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
      window.sessionStorage.removeItem('authenticated'); // Remover após logout
      window.sessionStorage.removeItem('accessToken');
      window.sessionStorage.removeItem('userData');
    } catch (err) {
      console.error(err);
    }
  
    dispatch({
      type: HANDLERS.SIGN_OUT
    });
  };

  const signUp = async (email, name, password, company_id) => {
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
