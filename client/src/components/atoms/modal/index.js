import Button from 'components/atoms/button';
import Heading from '../heading';
import './styles.scss';

const Modal = ({ children, title = '', className = '', okText, onOk, onCancel, showFooter, ...props }) => {
  return (
    <div className={`modal ${className}`} {...props}>
      <div className="modal__content">
        <div className="modal__header">
          <Heading>{title}</Heading>
          <div className="modal__close-icon" onClick={onCancel}>
            X
          </div>
        </div>
        <div className="modal__body">{children}</div>
        {showFooter && (
          <div className="modal__footer">
            <Button onClick={onOk}>{okText}</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
