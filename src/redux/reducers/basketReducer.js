import { basketActionsType } from '../actions/basketActions';

const initialState = {
  addedMeals: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};
export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketActionsType.LOADING:
      return { ...state, isLoading: true };
    case basketActionsType.ADD:
      return {
        ...state,
        isLoading: false,
        error: null,
        addedMeals: action.payload,
      };
    case basketActionsType.REMOVE:
      return {
        ...state,
        isLoading: false,
        error: null,
        addedMeals: state.addedMeals.filter(meal => meal.id !== action.payload),
      };
    case basketActionsType.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};