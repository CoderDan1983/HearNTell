import defaultImage from '../pages/creator/user-icon.png';

export default function ProfileComponent({ profile }){
    console.log('profile is: ', profile);
    const SERVER_URL = "http://localhost:3500";
    const profile_url = profile.image_name ? `${SERVER_URL}/images/${ profile.image_name }` : defaultImage;
    return(<div>
        <h1>{profile.creator.name}</h1>
        <p>{ profile.about_me }</p>
        <img src = { profile_url } alt="profile pic" width="250" height="450" />






    </div>)
}