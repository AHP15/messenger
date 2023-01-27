import { createContext, useContext, useEffect, useReducer } from 'react';
import { io } from "socket.io-client";

import {
  TOGGLE_SELECTED_CHAT,
  SET_SOCKET,
  OPEN_MODEL,
  CLOSE_MODEL,
  CONTACT_ADDED,
  ADD_CONTACT_FAILED
} from './contstants';

const StoreContext = createContext(null);

export const useStore = () => {
  return useContext(StoreContext);
}

const reducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_SELECTED_CHAT:
      return {
        ...state,
        selectedRoom: action.id,
      };
    case SET_SOCKET:
      return {
        ...state,
        socket: action.payload,
      };
    case OPEN_MODEL:
      return {
        ...state,
        model: action.payload,
      };
    case CLOSE_MODEL:
      return {
        ...state,
        model: null,
      };
    case CONTACT_ADDED:
      const { payload } = action;
      const { contacts } = state;
      return {
        ...state,
        contacts: [...contacts, payload.contact],
        alert: {
          type: 'success',
          message: payload.message,
        },
      };
    case ADD_CONTACT_FAILED:
      return {};
    default:
      return state;
  }
};

const initialState = {
  selectedRoom: null,
  alert: {
    type: null,
    message: null,
  },
  socket: null,
  model: null,
};
export const StoreProvider = ({ children, contacts, chatrooms, user }) => {
  const [state, dispatch] = useReducer(reducer, {...initialState, contacts, chatrooms, user});

  useEffect(() => {
    /*
    const connection = io('http://localhost:8081');
    dispatch({ type: SET_SOCKET, payload: connection });
    connection.emit('user', user.email);

    return () => {
      connection.disconnect();
      state.socket?.disconnect();
    };
    */
  }, []);

  const value = {state, dispatch}
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}