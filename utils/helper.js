const { statusKeyToValue } = require('../constants/order-statuses');
const { BUYER, RESTAURANT_OWNER } = require('../constants/user-types');

const totalAmount = (items) => {
  return items.reduce((prev, cur) => cur.meal.price * cur.quantity + prev, 0);
};

const statusOrder = [
  {
    order: 1,
    status: 'placed',
    role: BUYER,
  },
  {
    order: 2,
    status: 'cancelled',
    role: BUYER,
  },
  {
    order: 2,
    status: 'processing',
    role: RESTAURANT_OWNER,
  },
  {
    order: 3,
    status: 'inRoute',
    role: RESTAURANT_OWNER,
  },
  {
    order: 4,
    status: 'delivered',
    role: RESTAURANT_OWNER,
  },
  {
    order: 5,
    status: 'received',
    role: BUYER,
  },
];

const checkStatusOrder = (status, dbPrevStatus, userRole) => {
  const prevStatus = Object.keys(statusKeyToValue).find((key) => statusKeyToValue[key] === dbPrevStatus);

  const incomingStatusOrder = statusOrder.find((stOrder) => stOrder.status === status);
  const currentStatusOrder = statusOrder.find((stOrder) => stOrder.status === prevStatus);
  const newStatusOrder = statusOrder.find((stOrder) => stOrder.order === currentStatusOrder.order + 1);

  // Check if user can do this action
  if (incomingStatusOrder.role !== userRole) {
    return false;
  }

  // Check if status order is correct
  if (incomingStatusOrder.order === newStatusOrder.order) {
    return true;
  }
  return false;
};

module.exports = { totalAmount, checkStatusOrder };
