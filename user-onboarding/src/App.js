import './App.css';
import { useState } from 'react';
import Form from './components/Form';

function App() {
  const [ users, setUsers ] = useState([]);

  return (
    <div className="App">
      <Form users={users} setUsers={setUsers}/>
      <div className='users'>
        {users.map(user => (
          <div>
            <h2>{user.name}</h2>
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
