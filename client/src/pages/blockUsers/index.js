import Banner from 'components/atoms/banner';
import Heading from 'components/atoms/heading';
import UsersList from 'components/organisms/block-users';
import PageTemplate from 'components/templates/page-template';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlockUsers, editBlockUsers } from 'redux/block-users/actions';

const BlockUsersPage = () => {
  const { data: blockUsers, isLoading } = useSelector((state) => state.blockUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBlockUsers());
  }, [dispatch]);

  const onStatusChange = (buyerId, block) => {
    dispatch(editBlockUsers({ buyerId, block }));
  };

  return (
    <PageTemplate isLoading={isLoading}>
      <Banner>
        <Heading>{'Users List'}</Heading>
      </Banner>
      <UsersList title="Users" items={blockUsers} onStatusChange={onStatusChange} />
    </PageTemplate>
  );
};

export default BlockUsersPage;
