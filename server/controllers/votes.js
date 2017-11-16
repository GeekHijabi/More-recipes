import db from '../models';

const { Recipe, Vote } = db;
const updateVoteCounts = (recipeId) => {
  Vote
    .count({
      where: {
        recipeId,
        downvotes: true
      }
    }).then((totalDownVotes) => {
      if (totalDownVotes >= 0) {
        Recipe.findOne({
          where: {
            id: recipeId
          }
        }).then((recipeFound) => {
          recipeFound.updateAttributes({
            downvotes: totalDownVotes
          }).then(() => {
            Vote
              .count({
                where: {
                  recipeId,
                  upvotes: true
                }
              }).then((totalUpVotes) => {
                if (totalUpVotes >= 0) {
                  Recipe.findOne({
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
    const { userDetail } = req.decoded;
    return Vote
      .findOrCreate({
        where: {
          recipeId: req.params.recipeId,
          userId: userDetail.id
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
              message: 'counted'
            });
          });
        } else if (created === false) {
          vote.updateAttributes({
            upvotes: false,
            downvotes: true
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).send({
              message: 'downvoted'
            });
          });
        }
      }).catch((error) => {
        res.status(400).send(error);
      });
  },


  upvote(req, res) {
    const { userDetail } = req.decoded;
    return Vote
      .findOrCreate({
        where: {
          recipeId: req.params.recipeId,
          userId: userDetail.id
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
              message: 'counted'
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
          message: 'upvoted'
        });
      });
  }
};

