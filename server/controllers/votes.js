import jwt from 'jsonwebtoken';
import db from '../models';

const { recipes } = db;


export default {
    downvote(req, res) {
        return recipes
          .findOne({
            where: {
              id: req.params.recipeId
            }
          })
          .then((recipe) => {
            recipe.decrement('votes').then(() => {
              recipe.reload();
            });
          })
          .catch(error => res.status(400).send(error));
      },

    upvote(req, res){
        return recipes
          .findOne({
              where:{
                  id: rew.params.recipeId
              }
          })
          .then((recipe) => {
              recipe.increment('votes').then(()=>{
                  recipe.reload();
              });
          })
          .catch(error => res.status(400).send(error));
    }
    
}


