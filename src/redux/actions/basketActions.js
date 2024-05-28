const BASKET_URL = 'https://basket-9f781-default-rtdb.firebaseio.com/basket';

export const basketActionsType = {
  ADD: 'ADD_TO_BASKET',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  REMOVE: 'REMOVE_FROM_BASKET',
};

const getBasketMealsSuccess = (response) => {
  return {
    type: basketActionsType.ADD,
    payload: response,
  };
};

const getBasketMealsFailed = (error) => {
  return { type: basketActionsType.ERROR, payload: error };
};

const getBasketMealsPending = () => {
  return { type: basketActionsType.LOADING };
};

export const getBasketMealsThunk = () => {
  return async (dispatch) => {
    try {
      dispatch(getBasketMealsPending());
      const data = await fetch(`${BASKET_URL}.json`);
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
      dispatch(getBasketMealsPending());
      await fetch(`${BASKET_URL}.json`, {
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

const deleteBasketMealSuccess = (id) => {
  return {
    type: basketActionsType.REMOVE,
    payload: id,
  };
};

export const removeBasketThunk = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getBasketMealsPending());
      await fetch(`${BASKET_URL}/${id}.json`, {
        method: 'DELETE',
      });
      dispatch(deleteBasketMealSuccess(id));
    } catch (error) {
      dispatch(getBasketMealsFailed(error));
    }
  };
};
