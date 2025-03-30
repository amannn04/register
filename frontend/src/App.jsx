import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ FirstName: '', LastName: '', username: '', Age: '', Address: '', UserPassword: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/users', formData)
      .then(() => window.location.reload())
      .catch(err => console.error(err));
  };

  return (
    <div className="container">
      <h2>User List</h2>
      <ul className="user-list">
        {users.map(user => (
          <li key={user.UserId} className="user-item">{user.FirstName} {user.LastName} ({user.username})</li>
        ))}
      </ul>
      <h2>Add User</h2>
      <form className="user-form" onSubmit={handleSubmit}>
        <input name="FirstName" placeholder="First Name" onChange={handleChange} required />
        <input name="LastName" placeholder="Last Name" onChange={handleChange} required />
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="Age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="Address" placeholder="Address" onChange={handleChange} required />
        <input name="UserPassword" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;

