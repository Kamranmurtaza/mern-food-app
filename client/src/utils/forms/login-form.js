export const loginForm = {
  title: 'Login',
  buttonLabel: 'Login',
  formInputs: [
    [
      {
        name: 'email',
        label: 'Email',
        validations: {
          isRequired: true,
          isEmail: true,
        },
      },
    ],
    [
      {
        name: 'password',
        label: 'Password',
        inputProps: {
          type: 'password',
        },
        validations: {
          isRequired: true,
        },
      },
    ],
  ],
};
