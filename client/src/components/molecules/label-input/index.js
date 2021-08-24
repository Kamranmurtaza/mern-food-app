import PropTypes from 'prop-types';
import Input from 'components/atoms/input';
import Label from 'components/atoms/label';
import Text from 'components/atoms/Text';
import Checkbox from 'components/atoms/checkbox';
import TextArea from 'components/atoms/textarea';
import { CHECKBOX, TEXTAREA } from 'utils/form-fields';
import './styles.scss';

const LabelInput = ({
  className = '',
  label = '',
  errors = [],
  inputProps,
  labelProps,
  fieldType = '',
  ...props
}) => {
  const renderInput = (type) => {
    switch (type) {
      case CHECKBOX:
        return <Checkbox {...inputProps} />;
      case TEXTAREA:
        return <TextArea {...inputProps} />;
      default:
        return <Input {...inputProps} />;
    }
  };
  return (
    <div className={`label-input ${fieldType} ${className}`} {...props}>
      <Label {...labelProps}>{label}</Label>
      {renderInput(fieldType)}
      {errors.map((error, i) => (
        <Text key={i} className="label-input__error-message">
          {error}
        </Text>
      ))}
    </div>
  );
};

LabelInput.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  labelProps: PropTypes.object,
  errors: PropTypes.array,
  fieldType: PropTypes.string,
};

export default LabelInput;
