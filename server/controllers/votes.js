import db from '../models';

const { recipes, votes } = db;

const updateVoteCounts = (recipeId) => {
  votes
    .count({
      where: {
        recipeID: recipeId,
        downvotes: true
      }
    }).then((totalDownVotes) => {
      if (totalDownVotes >= 0) {
        recipes.findOne({
          where: {
            id: recipeId
          }
        }).then((recipeFound) => {
          recipeFound.updateAttributes({
            downvotes: totalDownVotes
          }).then(() => {
            votes
              .count({
                where: {
                  recipeID: recipeId,
                  upvotes: true
                }
              }).then((totalUpVotes) => {
                if (totalUpVotes >= 0) {
                  recipes.findOne({
                    where: {
                      id: recipeId
                    }
                  }).then((foundRecipe) => {
                    foundRecipe.updateAttributes({
                      upvotes: totalUpVotes,
                      downvotes: totalDownVotes
                    }).then(updatedRecipe => updatedRecipe);
                  });
                }
              });
          });
        });
      }
    });
};

export default {
  downvote(req, res) {
    const { user } = req.decoded;
    return votes
      .findOrCreate({
        where: {
          recipeID: req.params.recipeId,
          userId: user.id
        },
        defaults: {
          upvotes: false,
          downvotes: true
        }
      }).spread((vote, created) => {
        if (created === true) {
          vote.updateAttributes({
            upvotes: false,
            downvotes: true
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).send({
              message: 'Successfully downvoted'
            });
          });
        } else if (created === false) {
          vote.updateAttributes({
            upvotes: false,
            downvotes: true
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).send({
              message: 'your vote has been recorded'
            });
          });
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
  },


  upvote(req, res) {
    const { user } = req.decoded;
    return votes
      .findOrCreate({
        where: {
          recipeID: req.params.recipeId,
          userId: user.id
        },
        defaults: {
          upvotes: true,
          downvotes: false
        }
      }).spread((vote, created) => {
        if (created === true) {
          vote.updateAttributes({
            upvotes: true,
            downvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).send({
              message: 'Successfully upvoted'
            });
          });
        } else if (created === false) {
          vote.updateAttributes({
            upvotes: true,
            downvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).send({
              message: 'already voted'
            });
          });
        }
      }).catch(() => {
        res.status(201).send({
          message: 'Created'
        });
      });
  }
};

