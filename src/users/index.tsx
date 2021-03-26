import React, { useState, MouseEvent, FormEvent, ChangeEvent } from 'react';
import './index.css';

interface Props {
    userList: [string, string][],
    selectUser: (userName: string) => void,
    createNewUser: (name: string) => void
}

const Users = (props: Props) => {

  const [username, setUsername] = useState<string>('');

  const userClicked = (e: MouseEvent) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    props.selectUser(e.currentTarget.id);
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.createNewUser(username);
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.currentTarget.value);
  }

  return (
    <div className="user-list">
      { props.userList.map(u => (<button className="user" key={u[1]} id={u[1]} onClick={userClicked}>{u[0]}</button>)) }
      <form onSubmit={handleSubmit}>
        <input className="username" type="text" name="username" onChange={handleInputChange} value={username} placeholder="New User" required />
        <button className="create-user" type="submit">Create</button>
      </form>
    </div>
  )
};

export default Users;
