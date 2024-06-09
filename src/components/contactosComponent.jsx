import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../api/apiService';
import { useParams } from 'react-router-dom';
import '../css/home.css';
import { BsJournal, BsFillBrushFill, BsFillTrash3Fill } from "react-icons/bs";

const ContactosComponent = () => {
    const { id } = useParams();
    const [contacts, setContacts] = useState([]);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [modalVisibleEdit, setModalVisibleEdit] = useState(false);
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });
    const [selectedContact, setSelectedContact] = useState(null);
    const navigate = useNavigate();

    const openModal2 = () => {
        setModalVisible2(true);
    };
    const closeModal2 = () => {
        setModalVisible2(false);
    };
    const openModalEdit = (contact) => {
        setSelectedContact(contact);
        setContact(contact);
        setModalVisibleEdit(true);
    };
    const closeModalEdit = () => {
        setModalVisibleEdit(false);
    };
    const handleSubmit2 = () => {
        apiService.createContact(id, contact).then((response) => {
          console.log('Contact created:', response.data);
          closeModal2();
          apiService.getContacts(id).then((response) => {
            setContacts(response.data);
          });
        }).catch((error) => {
          console.error('Error creating contact:', error);
        });
    };
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        setContact((prevContact) => ({
          ...prevContact,
          [name]: value,
        }));
    };
    const handleDelete = (contactId) => {
        apiService.deleteContact(contactId).then(() => {
            apiService.getContacts(id).then((response) => {
                setContacts(response.data);
              });
        }).catch((error) => {
          console.error('Error deleting contact:', error);
        });
    };
    const handleEditSubmit = () => {
        apiService.updateContact(selectedContact._id, contact).then((response) => {
          console.log('Contact updated:', response.data);
          closeModalEdit();
          apiService.getContacts(id).then((response) => {
            setContacts(response.data);
          });
        }).catch((error) => {
          console.error('Error updating contact:', error);
        });
    };
    useEffect(() => {
        apiService.getContacts(id).then((response) => {
          setContacts(response.data);
        });
      }, [id]);

    return(
        <div className='home-container'>
            <div className='hmno'>
                <h1>Contactos del usuario</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Teléfono</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact) => (
                      <tr key={contact._id}>
                        <td>{contact.name} </td>
                        <td>{contact.phone}</td>
                        <td>
                          <button className='button' onClick={() => openModalEdit(contact)}><BsFillBrushFill />Edit</button>
                          <button className='button' onClick={() => handleDelete(contact._id)}><BsFillTrash3Fill />Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>

            <div className="boton">
                <button className = 'button' onClick={() => navigate('/')}>Regresar</button>
                <button className = 'button' onClick={openModal2}>Agregar Nuevo Contacto</button>
            </div>

            {modalVisible2 && (
                <div className="modal">
                  <div className="formularioUsuario" id="formularioContacto">
            
                    <div className="title">
                      <p>Agregar Nuevo Contacto</p>
                    </div>
            
                    <div className="formulario_usuario" id="contacts_name">
                      <label className="formulario__label">Nombre: </label>
                      <div className="formulario_usuario-input">
                        <input
                          type="text"
                          className="formulario__input"
                          placeholder="Nombre"
                          name="name"
                          value={contact.name}
                          onChange={handleChange2}
                        />
                      </div>
                    </div>
            
                    <div className="formulario_usuario" id="contacto_email">
                      <label className="formulario__label">Correo: </label>
                      <div className="formulario_usuario-input">
                        <input
                          type="text"
                          className="formulario__input"
                          placeholder="Correo"
                          name="email"
                          value={contact.email}
                          onChange={handleChange2}
                        />
                      </div>
                    </div>
            
                    <div className="formulario_usuario" id="contacto_phone">
                      <label className="formulario__label">Teléfono: </label>
                      <div className="formulario_usuario-input">
                        <input
                          type="text"
                          className="formulario__input"
                          placeholder="Teléfono"
                          name="phone"
                          value={contact.phone}
                          onChange={handleChange2}
                        />
                      </div>
                    </div>
            
                    <div className="botones">
                      <button type="button" className="formulario__btn1" onClick={closeModal2}>Cancelar</button>
                      <button type="button" className="formulario__btn2" onClick={handleSubmit2}>Aceptar</button>
                    </div>
                  </div>
                </div>
            )}

            {modalVisibleEdit && (
                <div className="modal">
                  <div className="formularioUsuario" id="formularioContacto">
                    <div className="title">
                      <p>Editar Contacto</p>
                    </div>
                    <div className="formulario_usuario" id="contacts_name">
                      <label className="formulario__label">Nombre: </label>
                      <div className="formulario_usuario-input">
                        <input
                          type="text"
                          className="formulario__input"
                          placeholder="Nombre"
                          name="name"
                          value={contact.name}
                          onChange={handleChange2}
                        />
                      </div>
                    </div>
                    <div className="formulario_usuario" id="contacto_email">
                      <label className="formulario__label">Correo: </label>
                      <div className="formulario_usuario-input">
                        <input
                          type="text"
                          className="formulario__input"
                          placeholder="Correo"
                          name="email"
                          value={contact.email}
                          onChange={handleChange2}
                        />
                      </div>
                    </div>
                    <div className="formulario_usuario" id="contacto_phone">
                      <label className="formulario__label">Teléfono: </label>
                      <div className="formulario_usuario-input">
                        <input
                          type="text"
                          className="formulario__input"
                          placeholder="Teléfono"
                          name="phone"
                          value={contact.phone}
                          onChange={handleChange2}
                        />
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

export default ContactosComponent;
