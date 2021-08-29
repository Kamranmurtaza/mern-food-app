import Button from 'components/atoms/button';
import { useState } from 'react';
import addIcon from 'assets/icons/add.png';
import removeIcon from 'assets/icons/remove.png';
import './styles.scss';

const CartFooter = ({ className, onAddToCart, ...props }) => {
  const [quantity, setQuantity] = useState(1);
  const onQuantityChange = (addition) => {
    if (!(addition === -1 && quantity === 1)) {
      setQuantity(quantity + addition);
    }
  };
  return (
    <div className={`cart-footer ${className}`} {...props}>
      <div className="cart-footer__quantity">
        <div className="cart-footer__quantity-btn" onClick={() => onQuantityChange(-1)}>
          <img src={removeIcon} alt="..." />
        </div>
        <div className="cart-footer__quantity">{quantity}</div>
        <div className="cart-footer__quantity-btn" onClick={() => onQuantityChange(1)}>
          <img src={addIcon} alt="..." />
        </div>
      </div>
      <Button onClick={onAddToCart}>Add to Cart</Button>
    </div>
  );
};

export default CartFooter;
