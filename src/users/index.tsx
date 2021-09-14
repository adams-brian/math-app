import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import { DataStoreContext } from '../dataStore';

const Users = () => {
  const [username, setUsername] = useState<string>('');
  const { createNewUser, userList } = useContext(DataStoreContext);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    createNewUser(username);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }

  return (
    <div className="user-list">
      { userList.map(u => (<Link className="user-list__user link-button" key={u[1]} to={`user/${u[1]}/home`}>{u[0]}</Link>)) }
      <form className="user-list__form" onSubmit={handleSubmit}>
        <input className="user-list__username" type="text" name="username" onChange={handleInputChange} value={username} placeholder="New User" required />
        <button className="user-list__create" type="submit">Create</button>
      </form>
    </div>
  )
};

export default Users;
