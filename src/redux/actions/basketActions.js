const BASKET_URL =
  'https://basket-9f781-default-rtdb.firebaseio.com/basket.json';

export const basketActionsType = {
  ADD: 'ADD_TO_BASKET',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
};

// id: id,
// name: name,
// amount: amount,
// price: price

const getBasketMealsSuccess = (response) => {
  return {
    type: basketActionsType.ADD,
    payload: response,
  };
};

const getBasketMealsFailed = (error) => {
  return { type: basketActionsType.ERROR, payload: error };
};

const getbasketMealsPending = () => {
  return { type: basketActionsType.LOADING };
};

export const getBasketMealsThunk = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getbasketMealsPending());
      const data = await fetch(BASKET_URL);
      const response = await data.json();
      const exchangeResponseToArray = [];
      for (const key in response) {
        exchangeResponseToArray.push({
          id: key,
          name: response[key].name,
          amount: response[key].amount,
          price: response[key].price,
        });
      }
      dispatch(getBasketMealsSuccess(exchangeResponseToArray));
    } catch (error) {
      dispatch(getBasketMealsFailed(error));
    }
  };
};

export const addBasketThunk = (newMeal) => {
  return async (dispatch) => {
    try {
      dispatch(getbasketMealsPending());
      await fetch(BASKET_URL, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(newMeal),
      });
      dispatch(getBasketMealsThunk());
    } catch (error) {
      dispatch(getBasketMealsFailed(error));
    }
  };
};
