import React, { useState, FormEvent, ChangeEvent, useContext } from 'react';
import { Link } from "react-router-dom";
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
    <div className="flex flex-col gap-3 items-center md:gap-5">
      { userList.map(u => (<Link className="btn btn-app btn-md md:btn-lg" key={u[1]} to={`user/${u[1]}/home`}>{u[0]}</Link>)) }
      <form className="flex flex-col gap-3 items-center justify-center mt-2.5 md:flex-row md:gap-4 md:mt-6" onSubmit={handleSubmit}>
        <input className="px-2.5 py-1 rounded-xl shadow-md text-xl md:px-6 md:py-4 md:rounded-3xl md:text-4xl focus:outline-none focus:shadow-focus" type="text" name="username" onChange={handleInputChange} value={username} placeholder="New User" required />
        <button className="bg-correct btn btn-md md:btn-lg text-white active:bg-gray-300" type="submit">Create</button>
      </form>
    </div>
  )
};

export default Users;
