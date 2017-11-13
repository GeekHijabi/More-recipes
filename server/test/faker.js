import faker from 'faker';

const fakeData = {
  newUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.name.findName(),
    email: faker.internet.email(),
    password: 'fodddyyy',
    confirmPassword: 'fodddyyy'
  },

  noEmailInput: {
    userName: faker.name.findName(),
    password: 'fodddyyy',
    confirmPassword: 'fodddyyy'
  },

  noPasswordInput: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    confirmPassword: 'fodddyyy'
  },
  passwordWrong: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    password: 'fodddyyy',
    confirmPassword: 'fodddyyy'
  },
  lenPasswordShort: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'food',
    confirmPassword: 'food'
  },
  nouserNameInput: {
    email: faker.internet.email(),
    password: 'fodddyyy',
    confirmPassword: 'fodddyyy'
  },
};

export default fakeData;
