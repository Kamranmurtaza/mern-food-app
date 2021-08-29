import Banner from 'components/atoms/banner';
import Heading from 'components/atoms/heading';
import ItemsList from 'components/organisms/items-list';
import PageTemplate from 'components/templates/page-template';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addMeal, editMeal, fetchMeals, removeMeal } from 'redux/meals/actions';
import { mealForm } from 'utils/forms/meal-form';
import { omit } from 'utils/helper';

const MealsPage = ({ showActions }) => {
  const { data: meals, isLoading } = useSelector((state) => state.meals);
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
      />
    </PageTemplate>
  );
};

export default MealsPage;
