const POST = 'POST';
const GET = 'GET';
const PATCH = 'PATCH';
const DELETE = 'DELETE';

export const user = {
  postLogin: {
    method: POST,
    url: '/auth/login',
  },
  postRegister: {
    method: POST,
    url: '/auth/register',
  },
};

export const restaurant = {
  getRestaurants: (ownerId) => {
    return {
      method: GET,
      url: '/restaurants' + (ownerId ? '?owner=' + ownerId : ''),
    };
  },
  postRestaurants: {
    method: POST,
    url: '/restaurants',
  },
  getRestaurant: (restaurantId) => {
    return {
      method: GET,
      url: `/restaurants/${restaurantId}`,
    };
  },
  patchRestaurant: (restaurantId) => {
    return {
      method: PATCH,
      url: `/restaurants/${restaurantId}`,
    };
  },
  deleteRestaurant: (restaurantId) => {
    return {
      method: DELETE,
      url: `/restaurants/${restaurantId}`,
    };
  },
};

export const meal = {
  getMeals: (restaurantId) => {
    return {
      method: GET,
      url: `/restaurants/${restaurantId}/meals`,
    };
  },
  postMeals: (restaurantId) => {
    return {
      method: POST,
      url: `/restaurants/${restaurantId}/meals`,
    };
  },
  getMeal: (restaurantId, mealId) => {
    return {
      method: GET,
      url: `/restaurants/${restaurantId}/meals/${mealId}`,
    };
  },
  patchMeal: (restaurantId, mealId) => {
    return {
      method: PATCH,
      url: `/restaurants/${restaurantId}/meals/${mealId}`,
    };
  },
  deleteMeal: (restaurantId, mealId) => {
    return {
      method: DELETE,
      url: `/restaurants/${restaurantId}/meals/${mealId}`,
    };
  },
};

export const cart = {
  getCart: (cartId) => {
    return {
      method: GET,
      url: `/cart/${cartId}`,
    };
  },
  patchCart: {
    method: PATCH,
    url: `/cart`,
  },
};

export const order = {
  getOrders: {
    method: GET,
    url: `/orders`,
  },
  postOrders: {
    method: POST,
    url: `/orders`,
  },
  patchOrder: (orderId) => {
    return {
      method: PATCH,
      url: `/orders/${orderId}`,
    };
  },
};
export const blockUsers = {
  getUsers: {
    method: GET,
    url: `/block-users`,
  },
  patchUsers: {
    method: PATCH,
    url: `/block-users`,
  },
};
