import LinkListItem from "../../parts/LinkListItem";

export default function Advertiser(){
    return(
        <>
            <h1 className="contact-us">Advertiser Page</h1>

            <LinkListItem name="Create Campaign" to="/createCampaign" />
        </>
    )
}