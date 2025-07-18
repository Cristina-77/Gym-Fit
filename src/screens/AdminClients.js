import styles from '../css/AdminClients.module.css';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formMode, setFormMode] = useState('add'); 
  const [formClient, setFormClient] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [selectedClient, setSelectedClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5162/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((error) => console.error(error));
  }, []);

  const openAddModal = () => {
    setFormClient({ id: 0, firstName: '', lastName: '', email: '', password: '' });
    setFormMode('add');
    setIsModalOpen(true);
  };

  const openEditModal = (client) => {
    setFormClient(client);
    setFormMode('edit');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formMode === 'add') {
      const res = await fetch("http://localhost:5162/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formClient),
      });

      if (res.ok) {
        const data = await res.json();
        setClients(prev => [...prev, data]);
        setIsModalOpen(false);
      } else {
        const err = await res.text();
        alert("Eroare: " + err);
      }
    } else {
      const res = await fetch(`http://localhost:5162/api/clients/${formClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formClient),
      });

      if (res.ok) {
        const updated = await res.json();
        setClients(prev =>
          prev.map(c => (c.id === formClient.id ? updated : c))
        );
        setIsModalOpen(false);
        setSelectedClient(null);
      } else {
        const err = await res.text();
        alert("Eroare: " + err);
      }
    }
  };

  const handleDeleteClient = (id) => {
    fetch(`http://localhost:5162/api/clients/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setClients(prev => prev.filter(c => c.id !== id));
        if (selectedClient?.id === id) {
          setSelectedClient(null);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>Manage your gym clients here.</p>
      </div>

      <div className={styles.clientsContainer}>
        {clients.map((client) => (
          <div
            key={client.id}
            className={styles.clientRow}
            onClick={() => setSelectedClient(client)}
          >
            <span className={styles.clientName}>
              {client.firstName} {client.lastName}
            </span>

            <div className={styles.icons}>
              <span
                className={styles.icon}
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(client);
                }}
              >
                ✏️
              </span>
              <span
                className={styles.icon}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClient(client.id);
                }}
              >
                🗑
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedClient && (
        <div className={styles.detailsContainer}>
          <h2>{selectedClient.firstName} {selectedClient.lastName}</h2>
          <p><strong>Email:</strong> {selectedClient.email}</p>
        </div>
      )}

      <button className={styles.floatingButton} onClick={openAddModal}>+</button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{formMode === 'add' ? 'Add New Client' : 'Edit Client'}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="First Name"
                value={formClient.firstName}
                onChange={(e) => setFormClient({ ...formClient, firstName: e.target.value })}
                className={styles.modalInput}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formClient.lastName}
                onChange={(e) => setFormClient({ ...formClient, lastName: e.target.value })}
                className={styles.modalInput}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formClient.email}
                onChange={(e) => setFormClient({ ...formClient, email: e.target.value })}
                className={styles.modalInput}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formClient.password}
                onChange={(e) => setFormClient({ ...formClient, password: e.target.value })}
                className={styles.modalInput}
                required={formMode === 'add'}
              />

              <button type="submit" className={styles.modalButton}>Save</button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className={styles.modalButton}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminClients;
