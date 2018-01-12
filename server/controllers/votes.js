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
  upvote(req, res) {
    const { userDetail } = req.decoded;
    return Vote
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: userDetail.id
        }
      }).then((foundVote) => {
        if (!foundVote) {
          return Vote.create({
            userId: userDetail.id,
            recipeId: req.params.recipeId,
            downvotes: false,
            upvotes: true
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'Successfully upvoted'
            });
          });
        }
        if (foundVote.upvotes) {
          foundVote.updateAttributes({
            upvotes: false,
            downvotes: foundVote.downvotes
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'upvote removed'
            });
          });
        } else {
          foundVote.updateAttributes({
            upvotes: true,
            downvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'upvote added'
            });
          });
        }
      });
  },
  downvote(req, res) {
    const { userDetail } = req.decoded;
    return Vote
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: userDetail.id
        }
      }).then((foundVote) => {
        if (!foundVote) {
          return Vote.create({
            userId: userDetail.id,
            recipeId: req.params.recipeId,
            downvotes: true,
            upvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'Successfully downvoted'
            });
          });
        }
        if (foundVote.downvotes) {
          foundVote.updateAttributes({
            upvotes: foundVote.upvotes,
            downvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'downvote removed'
            });
          });
        } else {
          foundVote.updateAttributes({
            upvotes: false,
            downvotes: true
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'downvote added'
            });
          });
        }
      });
  }
};
