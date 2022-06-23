import LinkListItem from "../../parts/LinkListItem";

export default function Advertiser(){
    return(
        <>
            <h1 className="contact-us">Advertiser Page</h1>

            <LinkListItem name="Create Campaign" to="/createCampaign" />

            <LinkListItem name="Create Ad" to="/createAd" />

            <LinkListItem name="List of Ads" to="/ads" />

            <LinkListItem name="List of Campaigns" to="/campaigns" />
        </>
    )
}