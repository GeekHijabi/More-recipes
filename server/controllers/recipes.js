// import recipes from '../models/recipes';
class Recipe{

    static test(req, res){
        return res.status(200).send({
            "message":"Hello World!"
    })
    

    };
}

export default Recipe;

