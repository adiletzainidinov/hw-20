const BASKET_URL = 'https://basket-9f781-default-rtdb.firebaseio.com/basket';

// Действия
export const basketActionsType = {
  ADD: 'ADD_TO_BASKET',
  REMOVE: 'REMOVE_FROM_BASKET',
  ERROR: 'ERROR',
  LOADING: 'LOADING',
};

// Успешное добавление блюд в корзину
const getBasketMealsSuccess = (response) => {
  return {
    type: basketActionsType.ADD,
    payload: response,
  };
};

// Ошибка при получении/добавлении блюд
const getBasketMealsFailed = (error) => {
  return { type: basketActionsType.ERROR, payload: error };
};

// Загрузка блюд
const getbasketMealsPending = () => {
  return { type: basketActionsType.LOADING };
};

// Получение блюд из корзины
export const getBasketMealsThunk = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(getbasketMealsPending());
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

// Добавление блюда в корзину
export const addBasketThunk = (newMeal) => {
  return async (dispatch) => {
    try {
      dispatch(getbasketMealsPending());
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

// Успешное удаление блюда из корзины
const deleteBasketMealSuccess = (id) => {
  return {
    type: basketActionsType.REMOVE,
    payload: id,
  };
};

// Удаление блюда из корзины
export const removeBasketThunk = (id) => {
  return async (dispatch) => {
    try {
      dispatch(getbasketMealsPending());
      await fetch(`${BASKET_URL}/${id}.json`, {
        method: 'DELETE',
      });
      dispatch(deleteBasketMealSuccess(id));
    } catch (error) {
      dispatch(getBasketMealsFailed(error));
    }
  };
};
