import { useNavigate, useLocation, Link} from "react-router-dom";

function CampaignListItem(props){

  const campaign = props.campaign;
  const edit_url = "/editCampaign/" + campaign._id;



  return(
      <>
        <h3>{campaign.name} <Link to={edit_url} >Edit</Link></h3>
      </>
  )
}


export default CampaignListItem;


