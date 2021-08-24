import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import RegisterFooter from 'components/molecules/register-footer';
import Form from 'components/organisms/form';
import AuthTemplate from 'components/templates/auth-template';
import { register } from 'redux/users/actions';
import { registerForm } from 'utils/forms/register-form';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const history = useHistory();

  const onFormSubmit = (data) => {
    dispatch(register(data, history));
  };

  return (
    <AuthTemplate
      center={
        <Form
          form={registerForm}
          onFormSubmit={onFormSubmit}
          loading={isLoading}
          footer={RegisterFooter}
        />
      }
    />
  );
};

export default RegisterPage;
