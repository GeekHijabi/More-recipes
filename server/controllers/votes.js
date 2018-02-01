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
          if (recipeFound) {
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
          }
        });
      }
    });
};

export default {
  upvote(req, res) {
    const { id } = req.decoded;
    const { recipeId } = req.params;
    return Vote
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: id
        }
      }).then((foundVote) => {
        if (!foundVote) {
          return Vote.create({
            userId: id,
            recipeId: req.params.recipeId,
            downvotes: false,
            upvotes: true
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            Recipe.findOne({
              id: recipeId
            }).then((recipeFound) => {
              const data = recipeFound.get({ plain: true });
              return res.status(200).json({
                downvotes: data.downvotes,
                upvotes: data.upvotes
              });
            });
          });
        }
        if (foundVote.upvotes) {
          foundVote.updateAttributes({
            upvotes: false,
            downvotes: foundVote.downvotes
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            Recipe.findOne({
              id: recipeId
            }).then((recipeFound) => {
              const data = recipeFound.get({ plain: true });
              return res.status(200).json({
                downvotes: data.downvotes,
                upvotes: data.upvotes
              });
            });
          });
        } else {
          foundVote.updateAttributes({
            upvotes: true,
            downvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            Recipe.findOne({
              id: recipeId
            }).then((recipeFound) => {
              const data = recipeFound.get({ plain: true });
              return res.status(200).json({
                downvotes: data.downvotes,
                upvotes: data.upvotes
              });
            });
          });
        }
      });
  },
  downvote(req, res) {
    const { id } = req.decoded;
    const { recipeId } = req.params;
    return Vote
      .findOne({
        where: {
          recipeId: req.params.recipeId,
          userId: id
        }
      }).then((foundVote) => {
        if (!foundVote) {
          return Vote.create({
            userId: id,
            recipeId: req.params.recipeId,
            downvotes: true,
            upvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            Recipe.findOne({
              id: recipeId
            }).then((recipeFound) => {
              const data = recipeFound.get({ plain: true });
              return res.status(200).json({
                downvotes: data.downvotes,
                upvotes: data.upvotes
              });
            });
          });
        }
        if (foundVote.downvotes) {
          foundVote.updateAttributes({
            upvotes: foundVote.upvotes,
            downvotes: false
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            Recipe.findOne({
              id: recipeId
            }).then((recipeFound) => {
              const data = recipeFound.get({ plain: true });
              return res.status(200).json({
                downvotes: data.downvotes,
                upvotes: data.upvotes
              });
            });
          });
        } else {
          foundVote.updateAttributes({
            upvotes: false,
            downvotes: true
          }).then(() => {
            updateVoteCounts(req.params.recipeId);
            Recipe.findOne({
              id: recipeId
            }).then((recipeFound) => {
              const data = recipeFound.get({ plain: true });
              return res.status(200).json({
                downvotes: data.downvotes,
                upvotes: data.upvotes
              });
            });
          });
        }
      });
  }
};
