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
        } else if (foundVote.downvotes === false) {
          return res.status(400).send({
            message: 'you cannot downvote, please remove upvote'
          });
        } else if (foundVote.downvotes === true
            && foundVote.upvotes === false) {
          Vote.destroy({
            where: {
              $and: [
                {
                  recipeId: foundVote.recipeId
                },
                { userId: foundVote.userId }
              ]
            }
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'downvote removed'
            });
          });
        }
      }).catch(() => {
        res.status(500).json({ error: 'No recipe found' });
      });
  },

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
        } else if (foundVote.upvotes === false) {
          return res.status(400).send({
            message: 'you cannot upvote, please remove downvote'
          });
        } else if (foundVote.upvotes === true
            && foundVote.downvotes === false) {
          Vote.destroy({
            where: {
              $and: [
                {
                  recipeId: foundVote.recipeId
                },
                { userId: foundVote.userId }
              ]
            }
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            return res.status(200).json({
              message: 'upvote removed'
            });
          });
        }
      }).catch(() => {
        res.status(500).json({ error: 'No recipe found' });
      });
  }
};
