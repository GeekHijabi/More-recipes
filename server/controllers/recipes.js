import {db} from '../models/recipes';

class Recipe{
  addRecipe(req, res) {
    const {recipeName, description} = req.body;
    if (!recipeName){ 
        return res.status(400).send({message: 'supply recipe'});
    }
    if (!description){
      return res.status(400).send({message: 'Description your recipe'});
    }
    
      let newRecipe = {
        recipeName: recipeName,
        description: description,
      }
    db.recipes.push(newRecipe);
    res.status(200)
      .send(newRecipe);
    }

  getRecipe(req, res) {
      res.status(200).send(db.recipes);
    }



  deleteRecipe(req, res) {
    for (let i = 0; i < db.recipes.length; i++) {
      if (parseInt(db.recipes[i].userId, 10) === parseInt(req.params.userId, 10)){
        db.recipes.splice(i, 1);
        return res.status(204).send({
          message: 'Recipe Deleted'
        });
      }
    }
    return res.status(404).send({
      message: 'No Recipe found!'
    });    
}

put(req, res) {
  const  id = req.params.Id;
  const { recipeName, description } = req.body;

  for (let i = 0; i < db.recipes.length; i++) {
    if (db.recipes[i].id === parseInt(id, 10)){
      db.recipes[i].recipeName = recipeName || db.recipes[i].recipeName;
      db.recipes[i].description = description || db.recipes[i].description;
      
      
      return res.status(200).send(db.recipes[i]);   
    } 
  }

  return res.status(404).send({
    message: 'Recipe Not found!'
  });
}

  
    
  }
  
export {Recipe};

