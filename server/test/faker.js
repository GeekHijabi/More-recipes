import faker from 'faker';

const fakeData = {
  newUser: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    userName: faker.name.findName(),
    email: faker.internet.email(),
    password: 'fodddyyy',
  },

  noEmailInput: {
    userName: faker.name.findName(),
  },

  noFirstNameInput: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    firstName: faker.name.lastName(),
    password: 'fodddyyy',
  },
  noLastNameInput: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    lastName: faker.name.lastName(),
    password: 'fodddyyy',
  },
  IncorrectFirstNameInput: {
    firstName: '     ',
    userName: faker.name.findName(),
    email: faker.internet.email(),
    lastName: faker.name.lastName(),
    password: 'fodddyyy',
  },
  IncorrectLastNameInput: {
    lastName: '     ',
    userName: faker.name.findName(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    password: 'fodddyyy',
  },
  

  noPasswordInput: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
  },
  passwordWrong: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    password: 'fodddyyy',
  },
  lenPasswordShort: {
    userName: faker.name.findName(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: 'food',
  },
  recipe1: {
    recipeName: 'Rice',
    ingredients: 'water rice',
    description: 'boil rice',
  },
  recipe2: {
    recipeName: 'Beans',
    ingredients: 'water, beans',
    description: 'fry beans'
  },
};

export default fakeData;
