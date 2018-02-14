const mockData = {
  signupData: {
    username: 'madam',
    email: 'madam@md.com',
    password: 'madam123'
  },

  signFail: {
    email: 'madam@md.com',
    password: 'madam123'
  },

  signupResponse: {
    userDetails: {
      userName: 'madam',
      email: 'madam@md.com'
    }
  },

  authResponse: {
    message: 'You have successfully signed in',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTE3NzU3MzcyLCJleHAiOjE1MTc5MzAxNzJ9.vYQzfbN0W52oDGrHizWSAoWGOFV4XP3BKL71AZrJn0c'
  },

  signUpfailure: {
    error: 'Please provide a valid username with atleast 2 characters.'
  },

  signinFailure: {
    error: 'Password is required'
  },

  loginFailed: {
    userName: 'madam',
    email: 'madam23@example.com'
  },

  userProfileData: {
    userName: 'madam',
    email: 'madam2@example.com',
    bio: 'awesome, cool,  foodie',
    summary: 'lorem ipsum ti da la',
    imageUrl: 'http://res.cloudinary.com/geek-hijabi/image/upload/v1515791347/hamdala_peibni.jpg',
  },

  userProfileResponse: {
    updatedProfile: {
      id: 1,
      userName: 'madam',
      email: 'madam2@example.com',
      bio: 'awesome, cool,  foodie',
      summary: 'lorem ipsum ti da la',
      imageUrl: 'http://res.cloudinary.com/geek-hijabi/image/upload/v1515791347/hamdala_peibni.jpg',
      createdAt: '2018-02-02T23:14:18.770Z',
      updatedAt: '2018-02-02T23:16:09.493Z'
    }
  },

  getRecipes: {
    page: 1,
    totalCount: 2,
    pageCount: 1,
    pageSize: 2,
    allRecipes: [
      {
        id: 2,
        recipeName: 'fish',
        imageUrl: null,
        ingredients: 'fish',
        description: 'cook it',
        preptime: null,
        servings: null,
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        favoriteCount: 0,
        views: 0,
        createdAt: '2018-02-04T17:39:29.064Z',
        updatedAt: '2018-02-04T17:39:29.064Z'
      },
      {
        id: 1,
        recipeName: 'foal meat',
        imageUrl: null,
        ingredients: 'foal, oil',
        description: 'cook it',
        preptime: '2 hours',
        servings: 4,
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        favoriteCount: 0,
        views: 0,
        createdAt: '2018-02-04T17:39:11.726Z',
        updatedAt: '2018-02-04T17:39:11.726Z'
      }
    ]
  },

  recipeUpvote: {
    id: 8,
    recipeName: 'Asdf',
    ingredient: 'dsfg',
    details: 'dsf',
    picture: 'tw2y57mjg7pbdo4dyrci',
    userId: 1,
    upvotes: 1,
    downvotes: 0,
    views: 0,
    createdAt: '2018-01-10T01:36:04.250Z',
    updatedAt: '2018-01-10T01:36:04.250Z'
  },

  recipeDownvote: {
    id: 7,
    recipeName: 'Wer',
    ingredient: 'asdf',
    details: 'wesrdf',
    picture: 'chnwhqvvdivf06okfv5p',
    userId: 1,
    upvotes: 0,
    downvotes: 1,
    views: 0,
    createdAt: '2018-01-10T01:28:32.849Z',
    updatedAt: '2018-01-10T01:28:32.849Z'
  },

  viewedRecipe: {
    id: 1,
    recipeName: 'foal meat',
    imageUrl: null,
    ingredients: 'foal, oil',
    description: 'cook it',
    preptime: '2 hours',
    servings: 4,
    userId: 1,
    upvotes: 1,
    downvotes: 0,
    favoriteCount: 0,
    views: 0,
    createdAt: '2018-02-04T17:39:11.726Z',
    updatedAt: '2018-02-04T22:42:54.888Z',
    Reviews: [
      {
        id: 5,
        userId: 1,
        recipeId: 2,
        reviews: 'my reviews worked',
        createdAt: '2018-02-06T00:35:06.129Z',
        updatedAt: '2018-02-06T00:35:06.129Z',
        User: {
          userName: 'madam',
          imageUrl: 'http://res.cloudinary.com/geek-hijabi/image/upload/v1515791347/hamdala_peibni.jpg'
        }
      }
    ],
    Favorites: [
      {
        id: 6,
        userId: 1,
        recipeId: 2,
        createdAt: '2018-02-06T00:35:30.315Z',
        updatedAt: '2018-02-06T00:35:30.315Z'
      }
    ]
  },

  searchRecipes: {
    status: true,
    page: 1,
    pageCount: null,
    searchFound: [
      {
        id: 1,
        recipeName: 'foal meat',
        imageUrl: null,
        ingredients: 'foal, oil',
        description: 'cook it',
        preptime: '2 hours',
        servings: 4,
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        favoriteCount: 0,
        views: 0,
        createdAt: '2018-02-04T17:39:11.726Z',
        updatedAt: '2018-02-04T17:39:11.726Z'
      },
      {
        id: 2,
        recipeName: 'fish',
        imageUrl: null,
        ingredients: 'fish',
        description: 'cook it',
        preptime: null,
        servings: null,
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        favoriteCount: 0,
        views: 0,
        createdAt: '2018-02-04T17:39:29.064Z',
        updatedAt: '2018-02-04T17:39:29.064Z'
      }
    ]

  },

  createReviewData: {
    message: 'Your recipe has been reviewed',
    review: {
      id: 1,
      userId: 1,
      recipeId: 1,
      reviews: 'my reviews worked',
      updatedAt: '2018-02-04T23:03:55.392Z',
      createdAt: '2018-02-04T23:03:55.392Z',
      User: {
        userName: 'madam',
        imageUrl: 'http://res.cloudinary.com/geek-hijabi/image/upload/v1515791347/hamdala_peibni.jpg'
      }
    }
  },

  deletedRecipe: {
    message: 'Recipe deleted successfully'
  },

  editedRecipe: {
    id: 1,
    recipeName: 'Yam',
    ingredients: 'yam and water',
    imageUrl: null,
    description: 'cook it',
    preptime: '2 hours',
    servings: 4,
    userId: 1,
    upvotes: 1,
    downvotes: 0,
    favoriteCount: 1,
    views: 0,
    createdAt: '2018-02-04T17:39:11.726Z',
    updatedAt: '2018-02-04T23:23:08.688Z'
  },

  editedRecipeData: {
    recipeName: 'bean cake'
  },

  editedRecipeResponse: {
    id: 1,
    recipeName: 'bean cake',
    imageUrl: null,
    ingredients: 'foal, oil',
    description: 'cook it',
    preptime: '2 hours',
    servings: 4,
    userId: 1,
    upvotes: 1,
    downvotes: 0,
    favoriteCount: 1,
    views: 0,
    createdAt: '2018-02-04T17:39:11.726Z',
    updatedAt: '2018-02-04T23:23:08.688Z'
  },

  createRecipeData: {
    recipeName: 'bread',
    ingredient: 'bread, watwer',
    description: 'bake the bread'
  },

  createRecipeDataFailure: {
    recipeName: 'rice',
    ingredient: 'yam, oil'
  },

  getAllFavorite: {
    favRecipes: [
      {
        id: 3,
        recipeName: 'yam, book',
        imageUrl: '',
        ingredients: 'rice, oil, fish',
        description: 'boil rice, fry oil',
        preptime: null,
        servings: null,
        userId: 4,
        upvotes: 0,
        downvotes: 1,
        favoriteCount: 1,
        views: 0,
        createdAt: '2018-02-05T09:52:22.036Z',
        updatedAt: '2018-02-05T10:09:08.795Z'
      }
    ]

  },

  favoritedRecipeResponse: {
    id: 4,
    userId: 1,
    recipeId: 2,
    createdAt: '2018-02-05T11:50:43.368Z',
    updatedAt: '2018-02-05T11:50:43.368Z',
    Recipe: {
      id: 2,
      recipeName: 'fish',
      imageUrl: null,
      ingredients: 'fish',
      description: 'cook it',
      preptime: null,
      servings: null,
      userId: 1,
      upvotes: 0,
      downvotes: 0,
      favoriteCount: 1,
      views: 0,
      createdAt: '2018-02-04T17:39:29.064Z',
      updatedAt: '2018-02-05T11:50:43.418Z'
    }
  },

  createdRecipeData: {
    recipeName: 'fish',
    description: 'cook it',
    ingredients: 'fish',
    imageUrl: null,
    preptime: null,
    servings: null,
    id: 2,
    userId: 1
  },

  editedDetails: {
    updatedProfile: {
      id: 1,
      userName: 'madam',
      email: 'madam2@example.com',
      bio: 'awesome, cool,  foodie',
      summary: 'lorem ipsum ti da la',
      imageUrl: 'http://res.cloudinary.com/geek-hijabi/image/upload/v1515791347/hamdala_peibni.jpg',
      createdAt: '2018-02-03T21:48:16.029Z',
      updatedAt: '2018-02-04T16:23:05.313Z'
    }
  },

  getUserDetails:
    {
      id: 1,
      userName: 'madam',
      email: 'madam2@example.com',
      bio: null,
      summary: null,
      imageUrl: null,
      createdAt: '2018-02-03T21:48:16.029Z',
      updatedAt: '2018-02-03T21:48:16.029Z'
    },

  signinData: {
    username: 'madam',
    password: 'madam123'
  },

  getMyRecipes: {
    page: 1,
    pageCount: 1,
    pageSize: 2,
    allMyRecipes: [
      {
        id: 2,
        recipeName: 'fish',
        imageUrl: null,
        ingredients: 'fish',
        description: 'cook it',
        preptime: null,
        servings: null,
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        favoriteCount: 0,
        views: 0,
        createdAt: '2018-02-04T17:39:29.064Z',
        updatedAt: '2018-02-04T17:39:29.064Z'
      },
      {
        id: 1,
        recipeName: 'foal meat',
        imageUrl: null,
        ingredients: 'foal, oil',
        description: 'cook it',
        preptime: '2 hours',
        servings: 4,
        userId: 1,
        upvotes: 0,
        downvotes: 0,
        favoriteCount: 0,
        views: 0,
        createdAt: '2018-02-04T17:39:11.726Z',
        updatedAt: '2018-02-04T17:39:11.726Z'
      }
    ]
  },

  favoriteData:
    [
      {
        id: 12,
        userId: 1,
        recipeId: 8,
        createdAt: '2018-02-06T11:32:32.415Z',
        updatedAt: '2018-02-06T11:32:32.415Z',
        Recipe: {
          id: 8,
          recipeName: 'dfgbn',
          imageUrl: '',
          ingredients: 'dfghjnm',
          description: 'dfghj',
          preptime: null,
          servings: null,
          userId: 4,
          upvotes: 0,
          downvotes: 0,
          favoriteCount: 2,
          views: 0,
          createdAt: '2018-02-06T10:59:54.829Z',
          updatedAt: '2018-02-06T11:32:32.423Z'
        }
      },
      {
        id: 13,
        userId: 1,
        recipeId: 9,
        createdAt: '2018-02-06T11:32:32.415Z',
        updatedAt: '2018-02-06T11:32:32.415Z',
        Recipe: {
          id: 9,
          recipeName: 'fgh',
          imageUrl: '',
          ingredients: 'dfghjnm',
          description: 'dfghj',
          preptime: null,
          servings: null,
          userId: 4,
          upvotes: 0,
          downvotes: 0,
          favoriteCount: 2,
          views: 0,
          createdAt: '2018-02-06T10:59:54.829Z',
          updatedAt: '2018-02-06T11:32:32.423Z'
        }
      }
    ],

  ReviewedData:
    [
      {
        id: 5,
        userId: 1,
        recipeId: 2,
        reviews: 'my reviews worked',
        createdAt: '2018-02-06T00:35:06.129Z',
        updatedAt: '2018-02-06T00:35:06.129Z',
        User: {
          userName: 'madam',
          imageUrl: 'http://res.cloudinary.com/geek-hijabi/image/upload/v1515791347/hamdala_peibni.jpg'
        }
      },
      {
        id: 7,
        userId: 1,
        recipeId: 2,
        reviews: 'my reviews worked 3',
        createdAt: '2018-02-06T00:35:06.129Z',
        updatedAt: '2018-02-06T00:35:06.129Z',
        User: {
          userName: 'madam',
          imageUrl: 'http://res.cloudinary.com/geek-hijabi/image/upload/v1515791347/hamdala_peibni.jpg'
        }
      },
    ]
};


export default mockData;

