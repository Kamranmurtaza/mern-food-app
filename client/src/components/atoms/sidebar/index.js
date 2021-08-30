import Heading from 'components/atoms/heading';
import './styles.scss';

const Sidebar = ({ open, onClose, title = '', className = '', footer, children, ...props }) => {
  return (
    <>
      {open && <div className="sidebar__overlay" onClick={onClose} />}
      {open && (
        <div className={`sidebar ${className}`} {...props}>
          <div className="sidebar__header">
            <Heading>{title}</Heading>
            <span className="sidebar__close-icon" onClick={onClose}>
              &times;
            </span>
          </div>
          <div className="sidebar__items">{children}</div>
          <div className="sidebar__footer">{footer && footer()}</div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
