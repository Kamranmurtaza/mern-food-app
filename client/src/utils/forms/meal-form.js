export const mealForm = {
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
    [
      {
        name: 'price',
        label: 'Price',
        validations: {
          isRequired: true,
          // isNumber: true,
        },
      },
    ],
  ],
};
