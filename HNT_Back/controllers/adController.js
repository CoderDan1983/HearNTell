const Ad = require('../model/Ad');


//* Create an ad
const create = async (req, res) => {
  const request_data = req.body;

  let ad_data = {
    name: request_data.name,
    audio_url: request_data.audio_url,
    duration: request_data.duration,
    file_size: request_data.file_size
  }

  let ad = await Ad.create(ad_data);
    res.json(ad);
};


//* Get list of all ads
const index = async (req, res) => {
  let ads = await Ad.find({});
  res.json(ads);
};

//* Get single ad
const show = async (req, res) => {
  const ad_id = req.params.ad_id;
  let ad = Ad.findOne({_id: ad_id});
  res.json(ad);
};

//* Update an ad
const update = async (req, res) => {
  const ad_id = req.params.ad_id;
  const request_data = req.body;
  let ad_data = {
    name: request_data.name,
    audio_url: request_data.audio_url,
    duration: request_data.duration,
    file_size: request_data.file_size
  }
  let ad = Ad.findOneAndUpdate({_id: ad_id}, ad_data);
  res.json(ad);
};

//* Remove an ad
const remove = async (req, res) => {
  const ad_id = req.params.ad_id;
  let ad = await Ad.findOneAndDelete({_id: ad_id});
  res.json(ad);
};



module.exports = {
  create,
  index,
  show,
  update,
  remove
}
