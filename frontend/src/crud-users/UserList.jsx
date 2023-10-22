import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css'; // Assurez-vous d'ajouter ce fichier CSS dans le même répertoire que votre composant

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', lastname: '', age: 0 });
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState(''); // Nouvel état pour le champ de titre en mode édition
  const [editLastname, setEditLastname] = useState(''); // Nouvel état pour le champ d'image en mode édition
  const [editAge, setEditAge] = useState(0); // Nouvel état pour le champ d'image en mode édition

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await axios.get('/apiu/users');
    setUsers(response.data);
  };

  const createUser = async () => {
    await axios.post('/apiu/users', newUser);
    fetchUsers();
  };

  const updateUser = async (id, updatedUser) => {
    await axios.put(`/apiu/users/${id}`, updatedUser);
    setEditUser(null);
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await axios.delete(`/apiu/users/${id}`);
    fetchUsers();
  };

  const editUserHandler = (user) => {
    setEditUser(user);
    // Pré-remplissez les champs d'édition avec les données actuelles du user
    setEditName(user.name);
    setEditLastname(user.lastname);
    setEditAge(user.age);
  };

  return (
    <div className="user-list">
      <h1>Users</h1>
      <div className="user-form">
        <input
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          placeholder="Prénom"
        />
        <input
          value={newUser.lastname}
          onChange={(e) => setNewUser({ ...newUser, lastname: e.target.value })}
          placeholder="Nom"
        />
        <input
            value={newUser.age}
            onChange={(e) => setNewUser({ ...newUser, age: e.target.value })}
            placeholder="Age"
        />
        <button onClick={createUser}>Créer</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editUser === user ? (
                  <input
                    type='text'
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUser === user ? (
                  <input
                    type='text'
                    required
                    value={editLastname}
                    onChange={(e) => setEditLastname(e.target.value)}
                  />
                ) : (
                  user.lastname
                )}
              </td>
              <td>
                {editUser === user ? (
                  <input
                    type='number'
                    required
                    value={editAge}
                    onChange={(e) => setEditAge(e.target.value)}
                  />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {editUser === user ? (
                  <button onClick={() => updateUser(user.id, { name: editName, lastname: editLastname, age: editAge })}>Enregistrer</button>
                ) : (
                  <>
                    <button onClick={() => editUserHandler(user)}>Modifier</button>
                    <button onClick={() => deleteUser(user.id)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
