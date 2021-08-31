import Button from 'components/atoms/button';
import Card from 'components/atoms/card';
import Heading from 'components/atoms/heading';
import './styles.scss';

const UsersList = ({ title, items = [], onStatusChange, className = '', ...props }) => {
  return (
    <div className={`users-list ${className}`} {...props}>
      <div className="users-list__header">
        <Heading>{title}</Heading>
      </div>
      <div className="users-list__list">
        {items &&
          items.map(({ _id, firstName, lastName, email, block }) => (
            <Card key={_id} className="users-list__row">
              <div>
                {firstName} {lastName}
              </div>
              <div>{email}</div>
              <div>
                <Button
                  className={`${block ? '' : 'users-list__button--unblock'}`}
                  onClick={() => onStatusChange && onStatusChange(_id, !block)}
                >
                  {block ? 'Unblock' : 'Block'}
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default UsersList;
