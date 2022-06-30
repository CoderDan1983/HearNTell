import Account from './components/pages/account/Account';

import Advertiser from './components/pages/advertiser/Advertiser';
import Ads from './components/pages/advertiser/Ads';
import CreateAd from './components/pages/advertiser/CreateAd'; //new
import Campaigns from './components/pages/advertiser/Campaigns';
import CampaignReport from './components/pages/advertiser/CampaignReport'; //new
import EditCampaign from './components/pages/advertiser/EditCampaign'; //new
import CreateCampaign from './components/pages/advertiser/CreateCampaign'; //new

import CreatorProfile from './components/pages/creator/CreatorProfile';
import CreatorHomepage from './components/pages/creator/CreatorHomepage';
import EditCreatorProfile from './components/pages/creator/EditCreatorProfile';
import AddEditStory from './components/pages/creator/AddEditStory'; //new
import CreatorAccessRequests from './components/pages/creator/CreatorAccessRequests'; //new

import Listener from './components/pages/listener/Listener';
import ListenerPlaylist from './components/pages/listener/ListenerPlaylist'; //new
import ListenerSingleStory from './components/pages/listener/ListenerSingleStory'; //new
import RatingModal from './components/pages/listener/RatingModal'; //new

import Admin from './components/pages/admin/Admin';
import AdminReports from './components/pages/admin/AdminReports'; //new
import AdminManageUsers from './components/pages/admin/AdminManageUsers'; //new
import AdminManageTags from './components/pages/admin/AdminManageTags'; //new

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Layout from './components/layouts/Main';
import Editor from './components/pages/Editor';
import Missing from './components/pages/Missing';
import Unauthorized from './components/pages/Unauthorized';
import Lounge from './components/pages/Lounge';
import HomePublic from './components/pages/HomePublic';
import RequiredAuth from './components/pages/RequireAuth';
import PersistLogin from './components/pages/PersistLogin';

import { Routes, Route } from 'react-router-dom';
import { ROLES } from './hooks/useRoles';

import './index.css';

//Hackers that are good enough could see your javascript
//they would see this.  Up to you if you want to show it, though ^_^.



function App() {

  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        {/* public routes */}
        <Route path="login" element = { <Login /> } />
        <Route path="register" element = { <Register /> } />
        <Route path="homepublic" element = { <HomePublic /> } />
        <Route path="unauthorized" element = { <Unauthorized /> } />

        <Route path="listener" element = { <Listener /> } />
        <Route path="listenerSingleStory/:story_id" element = { <ListenerSingleStory /> } />
        <Route path="creatorprofile/:creator_id" element = { <CreatorProfile /> } />

        {/* we want to protect these routes */}
        <Route element={ <PersistLogin /> }>
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Member ]}/> }>
            <Route path="/" element = { <Home /> } />
            <Route path="listenerPlaylist/:story_id" element = { <ListenerPlaylist /> } />
            <Route path="ratingModal/:story_id" element = { <RatingModal /> } />
          </Route>

          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Member ]}/> }>
            <Route path="editor" element = { <Editor /> } /> {/* tutorial route */}
            <Route path="creatorHomepage" element = { <CreatorHomepage /> } />
            <Route path="editCreatorProfile" element = { <EditCreatorProfile /> } />
            <Route path="creatorAddStory" element = { <AddEditStory /> } />
            <Route path="creatorEditStory/:story_id" element = { <AddEditStory /> } />
            <Route path="creatorAccessRequests" element = { <CreatorAccessRequests /> } />
          </Route>

          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Admin, ROLES.Member ]}/> }> //todo Remove ROLES.Member after testing
            <Route path="admin" element = { <Admin /> } />
            <Route path="adminReports" element = { <AdminReports /> } />
            <Route path="adminManageUsers" element = { <AdminManageUsers /> } />
            <Route path="adminManageTags" element = { <AdminManageTags /> } />
          </Route>
          <Route element={ <RequiredAuth allowedRoles={[ 
            ROLES.Member, ROLES.Admin, ROLES.Advertiser ]}/> }>
            <Route path="lounge" element = { <Lounge /> } /> {/* tutorial route */}
          </Route>
   
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Advertiser, ROLES.Member ]}/> }>
            <Route path="account" element = { <Account /> } /> {/* tutorial route */}
          </Route>

          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Advertiser, ROLES.Member  ]}/> }> {/*todo Need to remove member role after testing. */}
            <Route path="ads" element = { <Ads /> } />
            <Route path="campaignReport/:campaign_id" element = { <CampaignReport /> } />
            <Route path="editCampaign/:campaign_id" element = { <EditCampaign /> } />
            <Route path="createCampaign" element = { <CreateCampaign /> } />
            <Route path="createAd" element = { <CreateAd /> } />
            <Route path="campaigns" element = { <Campaigns /> } />
            <Route path="advertiser" element = { <Advertiser /> } />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={ <Missing /> } />
      </Route>
    </Routes>
  );
}

export default App;