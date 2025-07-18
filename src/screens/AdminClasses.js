import styles from '../css/AdminClasses.module.css';
import React, { useState, useEffect  } from "react";
import icon from "../images/plus.png";
import { useNavigate } from 'react-router-dom';

function AdminClasses() {
const [isModalOpen, setIsModalOpen] = useState(false);
const [newClassName, setNewClassName] = useState("");
const [imageFile, setImageFile] = useState(null);
const [schedule, setSchedule] = useState([]);
const [duration, setDuration] = useState("");
const [maxParticipants, setMaxParticipants] = useState("");
const [days, setDays] = useState([]);
const [time, setTime] = useState("");
const [classes, setClasses] = useState([]);
const [formMode, setFormMode] = useState('add');
const [editingClassId, setEditingClassId] = useState(null); // "add" or "edit"
  const [formClient, setFormClient] = useState({
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

useEffect(() => {
  fetch("http://localhost:5162/api/classes")
    .then(res => res.json())
    .then(data => setClasses(data))
    .catch(err => console.error("Error fetching classes:", err));
}, []);

  const openAddModal = () => {
    setFormClient({ id: 0, firstName: '', lastName: '', email: '', password: '' });
    setFormMode('add');
    setIsModalOpen(true);
  };

const handleImageChange = (e) => {
  setImageFile(e.target.files[0]);
};

const [newClassDescription, setNewClassDescription] = useState("");
const handleAddClass = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", newClassName);
  formData.append("description", newClassDescription);
  if (imageFile) {
    formData.append("image", imageFile);
  }
  formData.append("duration", duration);
  formData.append("maxParticipants", maxParticipants);
  formData.append("days", days.join(","));
  formData.append("time", time);

  const url = formMode === "edit"
    ? `http://localhost:5162/api/classes/${editingClassId}`
    : `http://localhost:5162/api/classes`;

  const method = formMode === "edit" ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      body: formData,
    });

    const text = await res.text();
    if (!res.ok) throw new Error(text || "Operation failed");
    const data = text ? JSON.parse(text) : {};

    if (formMode === "edit") {
      setClasses(prev =>
        prev.map(c => (c.id === editingClassId ? data : c))
      );
    } else {
      setClasses(prev => [...prev, data]);
    }

    setIsModalOpen(false);
    setFormMode("add");
    setEditingClassId(null);
    setNewClassName("");
    setNewClassDescription("");
    setImageFile(null);
    setDuration("");
    setMaxParticipants("");
    setDays([]);
    setTime("");
  } catch (err) {
    console.error("Error:", err);
    alert("Error: " + err.message);
  }
};


const handleDelete = async (id) => {
  const confirm = window.confirm("Are you sure you want to delete this class?");
  if (!confirm) return;

  try {
    const res = await fetch(`http://localhost:5162/api/classes/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Failed to delete");

    setClasses((prev) => prev.filter((c) => c.id !== id));
  } catch (err) {
    console.error("Delete failed:", err);
    alert("Failed to delete class.");
  }
};
const handleEdit = (c) => {
  setNewClassName(c.name);
  setNewClassDescription(c.description);
  setDuration(c.duration);
  setMaxParticipants(c.maxParticipants);
  setDays(c.days || []);
  setTime(c.time);
  setImageFile(null); 
  setEditingClassId(c.id);     
  setFormMode("edit");    
  setIsModalOpen(true);
};


  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>
          Manage your gym classes here.
        </p>
      </div>

      <div className={styles.gridContainer}>
  {classes.map((c) => (
    <div key={c.id} className={styles.gridItem}>
      {c.imageUrl && (
        <img
          src={`http://localhost:5162${c.imageUrl}`}
          alt={c.name}
          className={styles.classImage}
        />
      )}
       <div className={styles.classContent}>
          <div className={styles.className}>{c.name}</div>
          <div className={styles.classDescription}>{c.description}</div>
       </div>
      <div className={styles.actions}>
        <button onClick={() => handleEdit(c)}>✏️ Edit</button>
        <button onClick={() => handleDelete(c.id)}>🗑 Delete</button>
      </div>
</div>
  ))}
</div>

<button className={styles.floatingButton} onClick={openAddModal}>+</button>

{isModalOpen && (
    <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>Add New Class</h2>
            <form onSubmit={handleAddClass}>
                 <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.modalInput}
                />
              <input
                type="text"
                placeholder="Class Name"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className={styles.modalInput}
              />
              <textarea
                placeholder="Description"
                value={newClassDescription}
                onChange={(e) => setNewClassDescription(e.target.value)}
                className={styles.modalInput}
              ></textarea>
              <input
                type="text"
                placeholder="Duration (e.g., 60 minutes)"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className={styles.modalInput}
              />
              <input
                type="number"
                placeholder="Max Participants"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
                className={styles.modalInput}
              />

              <input
                type="text"
                placeholder="Days (e.g., Monday, Wednesday)"
                value={days}
                onChange={(e) => setDays(e.target.value.split(","))}
                className={styles.modalInput}
              />
              
              <input
                type="text"
                placeholder="Time (e.g., 10:00 AM)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className={styles.modalInput}
              />

              <button type="submit" className={styles.modalButton}>
                Save
              </button>
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

export default AdminClasses;
