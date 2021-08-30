import Card from 'components/atoms/card';
import Heading from 'components/atoms/heading';
import Text from 'components/atoms/Text';
import './styles.scss';

const CartItem = ({ id, className = '', name = '', quantity, amount, onDelete }) => {
  return (
    <Card className={`cart-item ${className}`}>
      <div className="cart-item__remove">
        <span
          className="cart-item__remove-icon"
          onClick={() => {
            onDelete && onDelete(id);
          }}
        >
          &times;
        </span>
      </div>
      <Heading className="cart-item__heading">{name}</Heading>
      <Text className="cart-item__quantity-wrapper">
        Quantity: <span className="cart-item__quantity">{quantity}</span>
      </Text>
      <Text className="cart-item__amount">${amount}</Text>
    </Card>
  );
};

export default CartItem;
