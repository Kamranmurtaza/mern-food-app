import Card from 'components/atoms/card';
import ConditionalWrapper from 'components/atoms/conditional-wrapper';
import Heading from 'components/atoms/heading';
import Text from 'components/atoms/Text';
import { Link, useLocation } from 'react-router-dom';
import './styles.scss';

const ItemCard = ({ isLink, linkSlug = '', id, title, description, price, footer, className, ...props }) => {
  const location = useLocation();

  return (
    <Card className={`item-card ${className}`} {...props}>
      <ConditionalWrapper
        condition={isLink}
        wrapper={(children) => <Link to={`${location.pathname}/${id}/${linkSlug}`}>{children}</Link>}
      >
        <Heading className="item-card__title" type="h3">
          {title}
        </Heading>
      </ConditionalWrapper>
      <div className="item-card__body">
        <Text className="item-card__description">{description}</Text>
        {price && <Text className="item-card__price">Price: ${price}</Text>}
      </div>
      <div className="item-card__footer">{footer && footer()}</div>
    </Card>
  );
};

export default ItemCard;
