import React, { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from "react-router-dom";
import './index.css';

interface Props {
    userList: [string, string][]
    createNewUser: (name: string) => void
}

const Users = (props: Props) => {
  const [username, setUsername] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.createNewUser(username);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }

  return (
    <div className="user-list">
      { props.userList.map(u => (<Link className="user link-button" key={u[1]} to={`user/${u[1]}/home`}>{u[0]}</Link>)) }
      <form onSubmit={handleSubmit}>
        <input className="username" type="text" name="username" onChange={handleInputChange} value={username} placeholder="New User" required />
        <button className="create-user" type="submit">Create</button>
      </form>
    </div>
  )
};

export default Users;
