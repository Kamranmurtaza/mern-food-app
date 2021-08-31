import './styles.scss';

const ActionsFooter = ({ className = '', onEditClick, onDeleteClick, ...props }) => {
  return (
    <div className={`actions-footer ${className}`} {...props}>
      <div className="actions-footer__item edit" onClick={onEditClick}>
        Edit
      </div>
      <div className="actions-footer__item delete" onClick={onDeleteClick}>
        Delete
      </div>
    </div>
  );
};

export default ActionsFooter;
