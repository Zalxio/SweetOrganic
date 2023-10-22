import { useState, useEffect } from 'react'
import axios from 'axios'

function getUser() {
  const [users, setUsers] = useState([]); // products is an array of objects

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('/apiu/users/');
      setUsers(response.data);
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="App">
        <h1>Users</h1>
        <div className="products">
          {users.map((user) => (
            <div className="product" key={user.id}>
              <p>{user.name}</p>
              <p>{user.lastname}</p>
              <p>{user.age}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default getUser
