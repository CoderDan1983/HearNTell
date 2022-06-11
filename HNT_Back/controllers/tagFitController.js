const TagFit = require('../model/TagFit');


//* Create a new tag_fit
const create = async (req, res) => {
  const tag_fit_data = {
    story_id: req.body.story_id,
    tag_name: req.body.tag_name,
    fit: req.body.fit,
  };
  let tag_fit = await TagFit.create(tag_fit_data);
  res.json(tag_fit);
};

//* Get all the tag_fits for a tag
const tagIndex = async (req, res) => {
  const tag_name = req.body.tag_name;
  let tag_fits = await TagFit.find({tag_name: tag_name});
  res.json(tag_fits);
};

//* Remove a tag_fit
const remove = async (req, res) => {
  const tag_fit_id = req.params.tag_fit_id
  let tag_fit = await TagFit.findOneAndDelete({_id: tag_fit_id});
  res.json(tag_fit);
};



module.exports = {
  create,
  tagIndex,
  remove
}