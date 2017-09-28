const db = []

db.recipes = [
  {
    userId: 1,
    recipeName: 'ofada rice',
    description: "Made with our local rice, enjoy with well fried stew and ponmo",
    upvote: 20,
    downvote: 2
  },

  {
    userId: 2,
    recipeName: 'Turkish salad',
    description: "Mix together the cucumber, tomatoes, pepper, onion, mint and oil in a large serving bowl and sprinkle over the feta and parsley",
    upvote: 20,
    downvote:2
  },

  {
    userId: 3,
    recipeName: 'Ewa Agoyin',
    description: "Mashed beans serve with stew",
    upvote: 20,
    downvote:2
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


export {db};