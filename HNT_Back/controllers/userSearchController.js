const UserSearch = require('../model/UserSearch');


//* Create (record) a new search
const create = async (req, res) => {
  const user_search_data = {
    user_id: req.body.user_id,
    search_string: req.body.search_string
  };
  let user_search = await UserSearch.create(user_search_data)
  res.json(user_search);
};

//* Remove search record
const remove = async (req, res) => {
  const user_search_id = req.params.user_search_id;
  let user_search = await UserSearch.findOneAndDelete({_id: user_search_id});
  res.json(user_search);
};

//* Get searches by user
const searchesByUser = async (req, res) => {
  const user_id = req.params.user_id;
  let searches = await UserSearch.find({user_id: user_id});
  res.json(searches);
};

module.exports = {
  create,
  remove,
  searchesByUser
}