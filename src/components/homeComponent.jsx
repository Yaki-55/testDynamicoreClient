import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';
import '../css/home.css';
import { BsJournal, BsEye, BsEyeSlash, BsFillBrushFill, BsFillTrash3Fill } from "react-icons/bs";

const HomeComponent = () => {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModalEdit = (user) => {
    setSelectedUser(user);
    setUser(user);
    setModalVisibleEdit(true);
  };

  const closeModalEdit = () => {
    setModalVisibleEdit(false);
  };

  const handleEditSubmit = () => {
    apiService.updateUser(selectedUser._id, user).then((response) => {
      console.log('User updated:', response.data);
      closeModalEdit();
      apiService.getUsers().then((response) => {
        setUsers(response.data);
      });
    }).catch((error) => {
      console.error('Error updating user:', error);
    });
  };

  const handleDelete = (userId) => {
    apiService.deleteUser(userId).then(() => {
      setUsers(users.filter(user => user._id !== userId));
    }).catch((error) => {
      console.error('Error deleting user:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    apiService.createUser(user).then((response) => {
      console.log('User created:', response.data);
      closeModal();
      apiService.getUsers().then((response) => {
        setUsers(response.data);
      });
    }).catch((error) => {
      console.error('Error creating user:', error);
    });
  };

  const handleUserClick = (userId) => {
    navigate(`/contactos/${userId}`);
  };

  useEffect(() => {
    apiService.getUsers().then((response) => {
      setUsers(response.data);
    });
  }, []);

  return (
    <div className='home-container'>
      <div className='hmno'>
        <h1>Usuarios</h1>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td onClick={() => handleUserClick(user._id)}>{user.name}</td>
                <td>
                  <button className='button' onClick={() => handleUserClick(user._id)}><BsJournal />Contacts</button>
                  <button className='button' onClick={() => openModalEdit(user)}><BsFillBrushFill />Edit</button>
                  <button className='button' onClick={() => handleDelete(user._id)}><BsFillTrash3Fill />Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="boton">
        <button className='button' onClick={openModal}>Agregar Nuevo Usuario</button>
      </div>

      {modalVisible && (
        <div className="modal">
          <div className="formularioUsuario" id="formularioUsuario">

            <div className="title">
              <p>Agregar Nuevo Usuario</p>
            </div>

            <div className="formulario_usuario" id="usuario_name">
              <label className="formulario__label">Nombre: </label>
              <div className="formulario_usuario-input">
                <input
                  type="text"
                  className="formulario__input"
                  placeholder="Nombre"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formulario_usuario" id="usuario_email">
              <label className="formulario__label">Correo: </label>
              <div className="formulario_usuario-input">
                <input
                  type="text"
                  className="formulario__input"
                  placeholder="Correo"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="formulario_usuario" id="usuario_password">
              <label className="formulario__label">Contraseña: </label>
              <div className="formulario_usuario-input">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="formulario__input"
                  placeholder="Contraseña"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <button onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>

            <div className="botones">
              <button type="button" className="formulario__btn1" onClick={closeModal}>Cancelar</button>
              <button type="button" className="formulario__btn2" onClick={handleSubmit}>Aceptar</button>
            </div>

          </div>
        </div>
      )}

      {modalVisibleEdit && (
        <div className="modal">
          <div className="formularioUsuario" id="formularioUsuario">
            <div className="title">
              <p>Editar Usuario</p>
            </div>
            <div className="formulario_usuario" id="usuario_name">
              <label className="formulario__label">Nombre: </label>
              <div className="formulario_usuario-input">
                <input
                  type="text"
                  className="formulario__input"
                  placeholder="Nombre"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="formulario_usuario" id="usuario_email">
              <label className="formulario__label">Correo: </label>
              <div className="formulario_usuario-input">
                <input
                  type="text"
                  className="formulario__input"
                  placeholder="Correo"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="formulario_usuario" id="usuario_password">
              <label className="formulario__label">Contraseña: </label>
              <div className="formulario_usuario-input">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  className="formulario__input"
                  placeholder="Contraseña"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
                <button onClick={() => setPasswordVisible(!passwordVisible)}>
                  {passwordVisible ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>
            <div className="botones">
              <button type="button" className="formulario__btn1" onClick={closeModalEdit}>Cancelar</button>
              <button type="button" className="formulario__btn2" onClick={handleEditSubmit}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeComponent;