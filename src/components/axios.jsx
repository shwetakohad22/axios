import React, { useState, useEffect } from "react";
import axios from "axios";

const Axios = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "" });
  const [editUser, setEditUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/users",
        newUser
      );
      setUsers([...users, response.data]);
      setNewUser({ name: "", email: "", phone: "" }); // Reset newUser state
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const editUserDetails = (user) => {
    setIsEditing(true);
    setEditUser({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://jsonplaceholder.typicode.com/users/${editUser.id}`,
        editUser
      );
      setUsers(
        users.map((user) => (user.id === editUser.id ? response.data : user))
      );
      setIsEditing(false);
      setEditUser({ id: "", name: "", email: "", phone: "" });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Add User</h2>
          <form onSubmit={addUser}>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Phone"
                value={newUser.phone}
                onChange={(e) =>
                  setNewUser({ ...newUser, phone: e.target.value })
                }
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add User
            </button>
          </form>
        </div>
        {isEditing && (
          <div className="col-md-6">
            <h2>Edit User</h2>
            <form onSubmit={updateUser}>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Name"
                  value={editUser.name}
                  onChange={(e) =>
                    setEditUser({ ...editUser, name: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={editUser.email}
                  onChange={(e) =>
                    setEditUser({ ...editUser, email: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  placeholder="Phone"
                  value={editUser.phone}
                  onChange={(e) =>
                    setEditUser({ ...editUser, phone: e.target.value })
                  }
                  className="form-control"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update User
              </button>
            </form>
          </div>
        )}
      </div>
      <div className="row mt-5">
        {users.map((user) => (
          <div key={user.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">Username: {user.username}</p>
                <p className="card-text">Email: {user.email}</p>
                <p className="card-text">Phone: {user.phone}</p>
                {user.address && (
                  <p className="card-text">
                    Address: {user.address.street}, {user.address.suite},{" "}
                    {user.address.city}, {user.address.zipcode}
                  </p>
                )}
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn btn-danger me-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => editUserDetails(user)}
                  className="btn btn-primary"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Axios;
