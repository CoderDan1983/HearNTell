const Campaign = require('../model/Campaign');
const AdRun = require('../model/AdRun');
const { properlyUppercased } = require('../custom_modules/utilities') 

//* Create an campaign
const create = async (req, res) => {
  console.log('campaignController, line 7!')
  console.log(req.user);
  console.log(req.body);
  const request_data = req.body;

  const { tags: jsonnedTags } = req.body;
  
  // console.log('jsonnedTags: ', jsonnedTags, typeof(jsonnedTags));
  const tags = jsonnedTags.map((tag)=> properlyUppercased(tag));

  // console.log('tags are: ', tags); //okay
  
  let campaign_data = {
    account_id: request_data.account_id,
    name: request_data.name,
    tags: tags, // Expects an array
    ad_audio_url: request_data.ad_audio_url,
    ad_id: request_data.ad_id,
    max_bid: request_data.max_bid,
    budget: request_data.budget,
    spent_so_far: request_data.spent_so_far,
    active: request_data.active
  }
  let campaign = await Campaign.create(campaign_data);
    res.json(campaign);
};

//* Get list of all campaigns
const index = async (req, res) => {
  let campaigns = await Campaign.find({});
  res.json(campaigns);
};

//* Get list of all an advertiser's campaigns
const advertiserIndex = async (req, res) => {
  const account_id = req.params.account_id;
  let campaigns = await Campaign.find({account_id: account_id});
  res.json(campaigns);
};

//* Get single campaign
const show = async (req, res) => {
  const campaign_id = req.params.campaign_id;
  let campaign = await Campaign.findOne({_id: campaign_id});
  res.json(campaign);
};

//* Update a campaign
const update = async (req, res) => {
  const campaign_id = req.params.campaign_id;
  const request_data = req.body;
  let campaign_data = {
    account_id: request_data.account_id,
    name: request_data.name,
    tags: request_data.tags, // Expects an array
    ad_audio_url: request_data.ad_audio_url,
    ad_id: request_data.ad_id,
    max_bid: request_data.max_bid,
    budget: request_data.budget,
    spent_so_far: request_data.spent_so_far,
    active: request_data.active
  }
  let campaign = await Campaign.findOneAndUpdate({_id: campaign_id}, campaign_data);
  res.json(campaign);
};

//* Remove an ad
const remove = async (req, res) => {
  const campaign_id = req.params.campaign_id;
  let campaign = await Campaign.findOneAndDelete({_id: campaign_id});
  res.json(campaign);
};

//* List of ads run for a campaign
const adRunsPerCampaign = async (req, res) => {
  const campaign_id = req.params.campaign_id;
  let ad_runs = await AdRun.find({ad_campaign_id: campaign_id});
  res.json(ad_runs);
};



module.exports = {
  create,
  index,
  advertiserIndex,
  show,
  update,
  remove,
  adRunsPerCampaign
}
