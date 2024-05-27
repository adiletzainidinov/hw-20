import { basketActionsType } from '../actions/basketActions';

const initialState = {
  addedMeals: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

export const basketReducer = (state = initialState, action) => {
  if (action.type === basketActionsType.LOADING) {
    return { ...state, isLoading: true };
  }
  if (action.type === basketActionsType.ADD) {
    return {
      ...state,
      isLoading: false,
      error: null,
      addedMeals: action.payload,
    };
  }
  if (action.type === basketActionsType.ERROR) {
    return {
      ...state,
      isLoading: false,
      error: action.payload,
    };
  }
  return state;
};
