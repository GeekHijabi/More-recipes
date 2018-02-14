import faker from 'faker';

const fakeData = {
  newUser: {
    userName: 'tester',
    email: 'test@test.com',
    password: 'fodddyyy',
  },

  signupUser: {
    userName: 'tester2',
    email: 'test2@test.com',
    password: 'fodddyyy',
  },
  newUser2: {
    identifier: faker.name.findName(),
    password: 'fodddyyy',
  },

  signedInUser2: {
    identifier: 'test@test.com',
    password: 'fodddyyy',
  },
  signedInUser5: {
    identifier: 'hamdalah',
    password: 'hamdalah',
  },

  signedInUser4: {
    username: 'tester',
    password: 'fodddyyy',
  },

  signedInUser3: {
    identifier: 'test@test.com',
    password: 'fodddyy',
  },
  userNameLess: {
    identifier: 'test',
    password: 'fodddyy',
  },

  updateProfile: {
    bio: 'nice, sweet, good',
    summary: 'I love food',
    imageUrl: 'https://res.cloudinary.com/geek-hijabi/image/upload/v1516811745/Photo_on_15-12-2017_at_11.18_alidfo.jpg'
  },

  noEmailInput: {
    userName: faker.name.findName(),
  },

  noPasswordInput: {
    identifier: faker.name.findName(),
    email: faker.internet.email(),
  },
  noPasswordSignupInput: {
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
    password: 'food',
  },
  emailReset: {
    email: 'test2@test.com'

  },
  recipe1: {
    recipeName: 'Rice',
    ingredients: 'water rice',
    description: 'boil rice',
  },
  recipe3: {
    id: 3,
    recipeName: 'Rice',
    ingredients: 'water rice',
    description: 'boil rice',
  },
  recipe2: {
    recipeName: 'Beans',
    ingredients: 'water, beans',
    description: 'fry beans'
  },
  norecipeName: {
    ingredients: 'water rice',
    description: 'boil rice'
  },
  noDescription: {
    recipeName: 'rice',
    ingredients: 'water rice'
  },
  noIngredient: {
    recipeName: 'rice',
    description: 'water rice',
  },
  reviews: {
    reviews: 'Very nice recipe'
  },
  reviews2: {
    reviews: '    '
  },
};

export default fakeData;
