import { createContext, useContext, useEffect, useReducer } from 'react';
import { io } from "socket.io-client";

import {
  TOGGLE_SELECTED_CHAT,
  SET_SOCKET,
  OPEN_MODEL,
  CLOSE_MODEL,
  CONTACT_ADDED,
  ADD_CONTACT_FAILED,
  ALREADY_CONTACT,
  CLEAR_ALERT,
  REQUITED_USER,
  CHAT_ADDED,
  ADD_CHAT_FAILED,
  ADD_UNREAD_MESSAGE,
  CLEAR_PREV_CHAT
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
        clearChat: false,
        chatrooms: state.chatrooms.map(chat => {
          if (chat._id === action.id) {
            return {
              ...chat,
              unreadMessages: 0
            }
          }
          return chat;
        })
      };
    case CLEAR_PREV_CHAT:
      return {
        ...state,
        clearChat: true,
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
      return {
        ...state,
        alert: {
          type: 'error',
          message: action.payload.message,
        },
      };
    case ALREADY_CONTACT:
      return {
        ...state,
        alert: {
          type: 'error',
          message: `${action.payload} is already a friend`,
        },
      };
    case CLEAR_ALERT:
      return {
        ...state,
        alert: {
          type: null,
          message: null,
        }
      };
    case REQUITED_USER:
      return {
        ...state,
        alert: {
          type: 'error',
          message: 'Please add at least one of your contacts',
        }
      };
    case CHAT_ADDED:
      const { chatrooms } = state;
      const { chat } = action.data;
      return {
        ...state,
        chatrooms: [...chatrooms, { ...chat, unreadMessages: [] }],
        alert: {
          type: 'success',
          message: 'Chat added successfully',
        }
      }
    case ADD_CHAT_FAILED:
      return {
        ...state,
        alert: {
          type: 'error',
          message: action.data.message,
        }
      };
    case ADD_UNREAD_MESSAGE:
      const chats = state.chatrooms;
      return {
        ...state,
        chatrooms: chats.map(chat => {
          if (chat._id === action.id) {
            return {
              ...chat,
              unreadMessages: chat.unreadMessages + 1
            }
          }
          return chat;
        })
      };
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
  clearChat: false,
};
export const StoreProvider = ({ children, contacts, chatrooms, user }) => {
  const [state, dispatch] = useReducer(reducer, {...initialState, contacts, chatrooms, user});

  useEffect(() => {
    const connection = io('http://localhost:8081');
    dispatch({ type: SET_SOCKET, payload: connection });
    connection.emit('user', user.id);

    return () => {
      connection.disconnect();
      state.socket?.disconnect();
    };
  }, []);

  const value = {state, dispatch}
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}