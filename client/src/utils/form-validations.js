import isEmail from 'validator/lib/isEmail';

const errorMessages = {
  isRequired: 'This field is required',
  isEmail: 'Please enter a valid email',
};

export const validators = {
  isRequired: (value) => {
    if (value && value.length > 0) {
      return {
        status: true,
      };
    } else {
      return {
        status: false,
        errorMessage: errorMessages.isRequired,
      };
    }
  },
  isEmail: (value) => {
    if (value && value.length > 0) {
      if (isEmail(value)) {
        return {
          status: true,
        };
      } else {
        return {
          status: false,
          errorMessage: errorMessages.isEmail,
        };
      }
    } else {
      return {
        status: true,
      };
    }
  },
};
