import Account from './components/pages/account/Account';
import Ad from './components/pages/advertiser/Ad';
import Advertiser from './components/pages/advertiser/Advertiser';
import Campaign from './components/pages/advertiser/Campaign';
import CreatorProfile from './components/pages/creator/CreatorProfile';
import Listener from './components/pages/listener/Listener';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Layout from './components/layouts/Main';
import Editor from './components/pages/Editor';
import Admin from './components/pages/admin/Admin';
import Missing from './components/pages/Missing';
import Unauthorized from './components/pages/Unauthorized';
import Lounge from './components/pages/Lounge';
import HomePublic from './components/pages/HomePublic';
import RequiredAuth from './components/pages/RequireAuth';
import PersistLogin from './components/pages/PersistLogin';
import CreatorHomepage from './components/pages/creator/CreatorHomepage';
import EditCreatorProfile from './components/pages/creator/EditCreatorProfile';

import { Routes, Route } from 'react-router-dom';
import { ROLES } from './hooks/useRoles';

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

        {/* we want to protect these routes */}
        <Route element={ <PersistLogin /> }>
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Member ]}/> }>
            <Route path="/" element = { <Home /> } />
          </Route>
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Member ]}/> }>
            <Route path="editor" element = { <Editor /> } />
          </Route>

          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Member ]}/> }>
            <Route path="creatorHomepage" element = { <CreatorHomepage /> } />
            <Route path="editCreatorProfile" element = { <EditCreatorProfile /> } />
          </Route>

          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Admin ]}/> }>
            <Route path="admin" element = { <Admin /> } />
          </Route>
          <Route element={ <RequiredAuth allowedRoles={[ 
            ROLES.Member, ROLES.Admin, ROLES.Advertiser ]}/> }>
            <Route path="lounge" element = { <Lounge /> } />
          </Route>
   
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Member ]}/> }>
            <Route path="creatorprofile" element = { <CreatorProfile /> } />
          </Route>
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Advertiser, ROLES.Member ]}/> }>
            <Route path="account" element = { <Account /> } />
          </Route>

          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Advertiser ]}/> }>
            <Route path="ad" element = { <Ad /> } />
          </Route>
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Advertiser ]}/> }>
            <Route path="advertiser" element = { <Advertiser /> } />
          </Route>
          <Route element={ <RequiredAuth allowedRoles={[ ROLES.Advertiser ]}/> }>
            <Route path="campaign" element = { <Campaign /> } />
          </Route>
        </Route>

        {/* catch all */}
        <Route path="*" element={ <Missing /> } />
      </Route>
    </Routes>
  );
}

export default App;