import React, { useState, MouseEvent, FormEvent, ChangeEvent } from 'react';
import './index.css';
import { v4 as uuidv4 } from 'uuid';

interface UsersProps {
    userList: [string, string][],
    setCurrentUser: React.Dispatch<React.SetStateAction<string | undefined>>,
    createNewUser: (name: string) => void
}

export default (props: UsersProps) => {

  const [username, setUsername] = useState<string>('');

  const userClicked = (e: MouseEvent) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    props.setCurrentUser(e.currentTarget.id);
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
      { props.userList.map(u => (<div className="user" key={u[1]} id={u[1]} onClick={userClicked}>{u[0]}</div>)) }
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input type="text" name="username" onChange={handleInputChange} value={username} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
};
