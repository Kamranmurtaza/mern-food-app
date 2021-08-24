import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginFooter from 'components/molecules/login-footer';
import Form from 'components/organisms/form';
import AuthTemplate from 'components/templates/auth-template';
import { login } from 'redux/users/actions';
import { loginForm } from 'utils/forms/login-form';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);
  const history = useHistory();

  const onFormSubmit = (data) => {
    dispatch(login(data, history));
  };

  return (
    <AuthTemplate
      center={
        <Form
          form={loginForm}
          onFormSubmit={onFormSubmit}
          loading={isLoading}
          footer={LoginFooter}
        />
      }
    />
  );
};

export default LoginPage;
