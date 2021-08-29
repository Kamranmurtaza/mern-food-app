import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/atoms/button';
import Heading from 'components/atoms/heading';
import LabelInput from 'components/molecules/label-input';
import { CHECKBOX } from 'utils/form-fields';
import { validators } from 'utils/form-validations';
import './styles.scss';

const Form = ({ form = {}, onFormSubmit, showErrorsOnBlur = false, loading = false, footer, defaultValues = {} }) => {
  const [formData, setFormData] = useState(defaultValues);
  const [formErrors, setFormErrors] = useState({});

  const onChangeHandler = (e) => {
    const value = e.target.type === CHECKBOX ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
    setFormErrors({
      ...formErrors,
      [e.target.name]: [],
    });
  };

  const checkValidations = (validations, name) => {
    let errors = [];
    Object.keys(validations).forEach((validation) => {
      if (validations[validation]) {
        const result = validators[validation](formData[name]);
        if (!result.status) {
          errors.push(result.errorMessage);
        }
      }
    });
    return { status: errors.length > 0, errors: { [name]: errors } };
  };
  const onBlurHandler = (e) => {
    if (showErrorsOnBlur) {
      let toCheckValidations = {};
      form.formInputs.forEach((formRow) => {
        formRow.forEach(({ validations, name }) => {
          if (name === e.target.name) {
            toCheckValidations = validations;
          }
        });
      });
      const error = checkValidations(toCheckValidations, e.target.name);
      setFormErrors({
        ...formErrors,
        ...error.errors,
      });
    }
  };

  const checkAllValidations = (formInputs) => {
    let allErrors = {};
    let status = false;
    formInputs.forEach((formRow) => {
      formRow.forEach(({ validations, name }) => {
        const result = checkValidations(validations, name);
        if (result.status) status = result.status;
        allErrors = { ...allErrors, ...result.errors };
      });
    });
    return { status, allErrors };
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let errors = checkAllValidations(form.formInputs);
    setFormErrors(errors.allErrors);
    if (!errors.status) {
      onFormSubmit(formData);
    }
  };
  const Footer = footer;

  return (
    <div className="form">
      {form.title && <Heading className="form__title">{form.title}</Heading>}
      <form onSubmit={onSubmit}>
        {form.formInputs.map((formRow, rowIndex) => (
          <div key={rowIndex} className="form__row">
            {formRow.map(({ label, name, inputProps, fieldType, labelProps }, colIndex) => (
              <div
                key={colIndex}
                className="form__col"
                style={{
                  width: 100 / formRow.length + '%',
                }}
              >
                <LabelInput
                  label={label}
                  labelProps={{
                    ...labelProps,
                  }}
                  inputProps={{
                    value: formData[name] || '',
                    onBlur: onBlurHandler,
                    onChange: onChangeHandler,
                    name,
                    ...inputProps,
                  }}
                  fieldType={fieldType}
                  errors={formErrors[name]}
                />
              </div>
            ))}
          </div>
        ))}
        <div className="form__submit-button-wrapper">
          <Button disabled={loading} type="submit" className="form__submit-button">
            {loading ? 'Loading...' : form.buttonLabel}
          </Button>
        </div>
        <div className="form__footer">{footer && <Footer />}</div>
      </form>
    </div>
  );
};

Form.propTypes = {
  form: PropTypes.object,
  onFormSubmit: PropTypes.func,
  showErrorsOnBlur: PropTypes.bool,
  loading: PropTypes.bool,
  footer: PropTypes.any,
};

export default Form;
