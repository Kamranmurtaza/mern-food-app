import Banner from 'components/atoms/banner';
import Heading from 'components/atoms/heading';
import OrdersList from 'components/organisms/orders';
import PageTemplate from 'components/templates/page-template';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editOrderStatus, fetchOrders } from 'redux/orders/actions';
import { nativeStatusToDBStatus } from 'utils/helper';

const OrdersPage = () => {
  const { data: items, isLoading } = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const onStatusChange = (orderId, status) => {
    dispatch(editOrderStatus(orderId, { status: nativeStatusToDBStatus(status) }));
  };

  const activeOrders = items?.filter((item) => !(item.status === 'Canceled' || item.status === 'Received')) || [];
  const pastOrders = items?.filter((item) => item.status === 'Canceled' || item.status === 'Received') || [];

  return (
    <PageTemplate isLoading={isLoading}>
      <Banner>
        <Heading>{'Orders'}</Heading>
      </Banner>

      {activeOrders.length > 0 && (
        <OrdersList title="Active Orders" items={activeOrders} onStatusChange={onStatusChange} />
      )}
      {pastOrders.length > 0 && <OrdersList title="Past Orders" items={pastOrders} />}
    </PageTemplate>
  );
};

export default OrdersPage;
