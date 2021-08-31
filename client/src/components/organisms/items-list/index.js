import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import Modal from 'components/atoms/modal';
import ActionsFooter from 'components/molecules/actions-footer';
import CartFooter from 'components/molecules/cart-footer';
import ItemCard from 'components/molecules/item-card';
import { useState } from 'react';
import Form from 'components/organisms/form';
import './styles.scss';
const ItemsList = ({
  title,
  isLinks,
  linkSlug = '',
  items = [],
  onAdd,
  onEdit,
  onDelete,
  className = '',
  showActions,
  form,
  showCart,
  onAddToCart,
  ...props
}) => {
  const [showFormModal, setShowFormModal] = useState(false);
  const [showWarnModal, setShowWarnModal] = useState();
  const [editData, setEditData] = useState();
  const onFormSubmit = (data) => {
    closeModal();
    if (data._id) {
      onEdit(data);
    } else {
      onAdd(data);
    }
  };

  const closeModal = () => {
    setEditData();
    setShowFormModal(false);
  };

  return (
    <div className={`items-list ${className}`} {...props}>
      <div className="items-list__header">
        <Heading>{title}</Heading>
        {showActions && <Button onClick={() => setShowFormModal(true)}>ADD</Button>}
      </div>
      <div className="items-list__list">
        {items &&
          items.map(({ _id, name, description, price }) => (
            <ItemCard
              key={_id}
              isLink={isLinks}
              linkSlug={linkSlug}
              title={name}
              description={description}
              price={price}
              id={_id}
              footer={() => (
                <div>
                  {showActions ? (
                    <ActionsFooter
                      onEditClick={() => {
                        setEditData({ _id, name, description, price });
                        setShowFormModal(true);
                      }}
                      onDeleteClick={() => {
                        setShowWarnModal(_id);
                      }}
                    />
                  ) : showCart ? (
                    <CartFooter
                      onAddToCart={(quantity) => {
                        onAddToCart(_id, quantity);
                      }}
                    />
                  ) : null}
                </div>
              )}
            />
          ))}
      </div>
      {showActions && showFormModal && (
        <Modal onCancel={closeModal}>
          <Form form={form} onFormSubmit={onFormSubmit} defaultValues={editData} />
        </Modal>
      )}
      {showActions && showWarnModal && (
        <Modal
          showFooter={true}
          onOk={() => {
            setShowWarnModal();
            onDelete(showWarnModal);
          }}
          okText={'Yes'}
          onCancel={() => setShowWarnModal()}
        >
          Are you sure you want to delete this?
        </Modal>
      )}
    </div>
  );
};

export default ItemsList;
