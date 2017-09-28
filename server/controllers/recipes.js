import {db} from '../models/recipes';
class Recipe{
  addRecipe(req, res) {
    const {recipeName, description} = req.body;
    if (!recipeName){ 
        return res.status(400).send({message: 'supply recipe'});
    }
    if (!description){
      return res.status(400).send({message: 'Add a description'});
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
      if (db.recipes[i].userId === parseInt(req.params.userId, 2)){
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

putrecipe(req, res){

}
  
    
  }
  
export {Recipe};

