import Banner from 'components/atoms/banner';
import Heading from 'components/atoms/heading';
import ItemsList from 'components/organisms/items-list';
import PageTemplate from 'components/templates/page-template';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editCart } from 'redux/cart/actions';
import { addMeal, editMeal, fetchMeals, removeMeal } from 'redux/meals/actions';
import { mealForm } from 'utils/forms/meal-form';
import { omit } from 'utils/helper';

const MealsPage = ({ showActions }) => {
  const { data: meals, isLoading } = useSelector((state) => state.meals);
  const { data: cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { restaurantId } = useParams();

  useEffect(() => {
    dispatch(fetchMeals(restaurantId));
  }, [restaurantId, dispatch]);

  const onAdd = (data) => {
    dispatch(addMeal(restaurantId, data));
  };

  const onEdit = (data) => {
    dispatch(editMeal(restaurantId, data._id, omit(data, ['_id'])));
  };

  const onDelete = (id) => {
    dispatch(removeMeal(restaurantId, id));
  };

  const onAddToCart = (mealId, quantity) => {
    if (cart?.cartId) {
      if (cart.restaurantId === restaurantId) {
        let index = cart.items.findIndex((item) => item.meal._id === mealId);
        let items = [];
        if (index === -1) {
          items = [...cart.items, { meal: mealId, quantity: quantity }];
        } else {
          items = [...cart.items];
          items[index] = { ...items[index], quantity: items[index].quantity + quantity };
        }

        dispatch(editCart({ cartId: cart.cartId, restaurantId, items }));
      } else {
        dispatch(editCart({ cartId: cart.cartId, restaurantId, items: [{ meal: mealId, quantity: quantity }] }));
      }
    } else {
      dispatch(editCart({ restaurantId, items: [{ meal: mealId, quantity: quantity }] }));
    }
  };

  return (
    <PageTemplate isLoading={isLoading}>
      <Banner>
        <Heading>{meals && meals.length ? meals[0].restaurant.name : 'No meals'}</Heading>
      </Banner>

      <ItemsList
        showCart={true}
        title="Meals"
        items={meals}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        showActions={showActions}
        form={mealForm}
        onAddToCart={onAddToCart}
      />
    </PageTemplate>
  );
};

export default MealsPage;
