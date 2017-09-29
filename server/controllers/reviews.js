import {db} from '../models/recipes';

class review {
  add(req, res) {
    const { review, userId } = req.body;
    if(!review) {
      res.status(400).send({
        Message: 'review this recipe'
      });
    } else {
      let l = db.review.length;
      const id = 1 + l;
      db.review.push({
        id: id,
        userId: userId,
        review: review
      });
      res.status(200).send(db.review[userId-1]);
    }
  }
}

export {review};