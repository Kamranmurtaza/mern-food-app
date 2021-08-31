import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import ItemCard from 'components/molecules/item-card';
import { useSelector } from 'react-redux';
import { nextStatus } from 'utils/helper';
import './styles.scss';

const OrdersList = ({ title, items = [], onStatusChange, className = '', ...props }) => {
  const { data: user } = useSelector((state) => state.user);
  return (
    <div className={`orders-list ${className}`} {...props}>
      <div className="orders-list__header">
        <Heading>{title}</Heading>
      </div>
      <div className="orders-list__list">
        {items &&
          items.map(({ _id, restaurant, amount, status, items }) => (
            <ItemCard
              key={_id}
              title={restaurant.name}
              description={`Order ID: ${_id}`}
              body={() => {
                return (
                  <div>
                    {items.map((item) => (
                      <div key={item._id}>
                        - {item.meal.name} x{item.quantity}
                      </div>
                    ))}
                  </div>
                );
              }}
              price={amount}
              id={_id}
              footer={() => (
                <div className="orders-list__footer">
                  <div>
                    Status: <span className="orders-list__status">{status}</span>
                  </div>
                  {nextStatus(status, user?.userType) && (
                    <div>
                      <span>Change to: </span>
                      <Button
                        style={{
                          padding: '5px 10px',
                        }}
                        onClick={() => onStatusChange && onStatusChange(_id, nextStatus(status, user?.userType))}
                      >
                        {nextStatus(status, user?.userType)}
                      </Button>
                    </div>
                  )}
                </div>
              )}
            />
          ))}
      </div>
    </div>
  );
};

export default OrdersList;
