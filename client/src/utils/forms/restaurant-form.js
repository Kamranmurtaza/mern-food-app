export const restaurantForm = {
  title: '',
  buttonLabel: 'Save',
  formInputs: [
    [
      {
        name: 'name',
        label: 'Name',
        validations: {
          isRequired: true,
        },
      },
    ],
    [
      {
        name: 'description',
        label: 'Description',
        validations: {
          isRequired: false,
        },
      },
    ],
  ],
};
