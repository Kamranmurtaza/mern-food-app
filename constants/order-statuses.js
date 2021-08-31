const ORDER_STATUSES = ['Placed', 'Canceled', 'Processing', 'In Route', 'Delivered', 'Received'];

const statusKeyToValue = {
  placed: 'Placed',
  cancelled: 'Canceled',
  processing: 'Processing',
  inRoute: 'In Route',
  delivered: 'Delivered',
  received: 'Received',
};

module.exports = { ORDER_STATUSES, statusKeyToValue };
