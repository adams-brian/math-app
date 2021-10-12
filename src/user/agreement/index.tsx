import React, { useContext } from 'react';
import { Link, useParams } from "react-router-dom";
import { DataStoreContext } from '../../dataStore';
import { UserBaseUrlContext } from '../';

const Agreement = () => {
  const { userId } = useParams<{ userId: string }>();
  const userBaseUrl = useContext(UserBaseUrlContext);
  const { getUserSettings, setUserSettings } = useContext(DataStoreContext);

  const accept = () => {
    const settings = getUserSettings(userId);
    settings.pa = Date.now();
    setUserSettings(userId, settings);
  }

  return (
    <div className="max-w-3xl panel text-md">
      <div className="bg-gray-200 p-5 text-4xl lg:text-5xl">Privacy Agreement</div>
      <div className="bg-gray-200 flex flex-col leading-tight gap-6 p-6">
        <div>We value your privacy</div>
        <div>No user data is sent over the network at any time while using this app</div>
        <div>All data is stored in the local browser storage</div>
        <div>By continuing you agree to allow this app to store data in the local browser storage</div>
        <div>Note: to accurately capture progress always use the same browser (Chrome, Edge, Safari, etc.) on the same device when using this app</div>
        <div><Link className="btn btn-app btn-md" to={`${userBaseUrl}/instructions`} onClick={accept}><span>Accept</span></Link></div>
        <div><Link className="btn btn-app btn-md" to="/users"><span>Reject</span></Link></div>
      </div>
    </div>
  );
};

export default Agreement;
