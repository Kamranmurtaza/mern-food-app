import { BUYER, RESTAURANT_OWNER } from './roles';

const transform = (obj, predicate) => {
  return Object.keys(obj).reduce((memo, key) => {
    if (predicate(obj[key], key)) {
      memo[key] = obj[key];
    }
    return memo;
  }, {});
};

export const omit = (obj, items) => transform(obj, (value, key) => !items.includes(key));

export const pick = (obj, items) => transform(obj, (value, key) => items.includes(key));

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

const statusKeyToValue = {
  placed: 'Placed',
  cancelled: 'Canceled',
  processing: 'Processing',
  inRoute: 'In Route',
  delivered: 'Delivered',
  received: 'Received',
};

export const nextStatus = (dbPrevStatus, userRole) => {
  const prevStatus = Object.keys(statusKeyToValue).find((key) => statusKeyToValue[key] === dbPrevStatus);

  // const incomingStatusOrder = statusOrder.find((stOrder) => stOrder.status === status);
  const currentStatusOrder = statusOrder.find((stOrder) => stOrder.status === prevStatus);
  const newStatusOrder = statusOrder.find(
    (stOrder) => stOrder.order === currentStatusOrder.order + 1 && stOrder.role === userRole
  );

  // Check if user can do this action
  if (newStatusOrder) {
    return statusKeyToValue[newStatusOrder.status];
  }

  return '';
};

export const nativeStatusToDBStatus = (native) => {
  const status = Object.keys(statusKeyToValue).find((key) => statusKeyToValue[key] === native);
  if (status) {
    return status;
  }
  return '';
};
