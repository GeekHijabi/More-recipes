let db = []

db.recipes = [
  {
    userId: 1,
    recipeName: 'ofada rice',
    picture: '../mock.jpg',
    description: "Made with our local rice, enjoy with well fried stew and ponmo",
    created_at: 19-2-17
  },
  {
    userId: 2,
    recipeName: 'Turkish salad',
    picture: '../mock.jpg',
    description: "Mix together the cucumber, tomatoes, pepper, onion, mint and oil in a large serving bowl and sprinkle over the feta and parsley",
    created_at: 1-2-17
  },

  {
    userId: 3,
    recipeName: 'Ewa Agoyin',
    picture: '../mock.jpg',
    description: "Mashed beans serve with stew",
    created_at: 9-5-17
  },


];

db.review = [
  {
    userId: 1,
    review: 'Awesome'
  },
  {
    userId: 2,
    review: 'Just there'
  }

];


export default db;