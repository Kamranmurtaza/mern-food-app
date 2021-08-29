import Banner from 'components/atoms/banner';
import Heading from 'components/atoms/heading';
import ItemsList from 'components/organisms/items-list';
import PageTemplate from 'components/templates/page-template';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRestaurant, editRestaurant, fetchRestaurants, removeRestaurant } from 'redux/restaurants/actions';
import { restaurantForm } from 'utils/forms/restaurant-form';
import { omit } from 'utils/helper';

const RestaurantsPage = ({ showActions }) => {
  const { data: restaurants, isLoading } = useSelector((state) => state.restaurants);
  const { data: user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchRestaurants(showActions && user?.id));
  }, [dispatch, user, showActions]);

  const onAdd = (data) => {
    dispatch(addRestaurant(data));
  };

  const onEdit = (data) => {
    dispatch(editRestaurant(data._id, omit(data, ['_id'])));
  };

  const onDelete = (id) => {
    dispatch(removeRestaurant(id));
  };

  return (
    <PageTemplate isLoading={isLoading}>
      <Banner>
        <Heading>Restaurants</Heading>
      </Banner>
      <ItemsList
        isLinks={true}
        linkSlug={'meals'}
        title="Restaurants"
        items={restaurants}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
        showActions={showActions}
        form={restaurantForm}
      />
    </PageTemplate>
  );
};

export default RestaurantsPage;
