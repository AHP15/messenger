import { createContext, useContext, useReducer } from 'react';
import { TOGGLE_SELECTED_CHAT } from './contstants';

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
};
export const StoreProvider = ({ children, contacts, chatrooms }) => {
  const [state, dispatch] = useReducer(reducer, {...initialState, contacts, chatrooms});

  const value = {state, dispatch}
  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
}