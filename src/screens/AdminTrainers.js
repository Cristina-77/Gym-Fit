import styles from '../css/AdminTrainers.module.css';
import { useState, useEffect } from "react";

function AdminTrainers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [formMode, setFormMode] = useState('add');
  const [editingTrainerId, setEditingTrainerId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5162/api/classes")
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error("Error loading classes:", err));

    fetch("http://localhost:5162/api/trainers")
      .then(res => res.json())
      .then(data => setTrainers(data))
      .catch(err => console.error("Error loading trainers:", err));
  }, []);

  const openAddModal = () => {
    setFormMode('add');
    setEditingTrainerId(null);
    setFirstName('');
    setLastName('');
    setDescription('');
    setImageFile(null);
    setSelectedClassId('');
    setIsModalOpen(true);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleAddTrainer = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("description", description);
    formData.append("classId", selectedClassId);
    if (imageFile) formData.append("image", imageFile);

    const url = formMode === "edit"
      ? `http://localhost:5162/api/trainers/${editingTrainerId}`
      : `http://localhost:5162/api/trainers`;

    const method = formMode === "edit" ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: formData
      });

      const text = await res.text();
      if (!res.ok) throw new Error(text || "Operation failed");
      const data = text ? JSON.parse(text) : {};

      if (formMode === "edit") {
        setTrainers(prev =>
          prev.map(t => (t.id === editingTrainerId ? data : t))
        );
      } else {
        setTrainers(prev => [...prev, data]);
      }

      setIsModalOpen(false);
      setFirstName('');
      setLastName('');
      setDescription('');
      setImageFile(null);
      setSelectedClassId('');
      setFormMode('add');
      setEditingTrainerId(null);
    } catch (err) {
      console.error("Error:", err);
      alert("Error: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this trainer?")) return;

    try {
      const res = await fetch(`http://localhost:5162/api/trainers/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setTrainers(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Failed to delete trainer.");
    }
  };

  const handleEdit = (trainer) => {
    setFirstName(trainer.firstName);
    setLastName(trainer.lastName);
    setDescription(trainer.description);
    setSelectedClassId(trainer.classId || '');
    setImageFile(null);
    setEditingTrainerId(trainer.id);
    setFormMode("edit");
    setIsModalOpen(true);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>Manage your gym trainers here.</p>
      </div>

      <div className={styles.gridContainer}>
        {trainers.map((trainer) => (
          <div key={trainer.id} className={styles.gridItem}>
            {trainer.imageUrl && (
              <img
                src={`http://localhost:5162${trainer.imageUrl}`}
                alt={`${trainer.firstName} ${trainer.lastName}`}
                className={styles.trainerImage}
              />
            )}
            <div className={styles.trainerContent}>
              <div className={styles.trainerName}>
                {trainer.firstName} {trainer.lastName}
              </div>
              <div className={styles.trainerDescription}>
                {trainer.description}
              </div>
            </div>
            <div className={styles.actions}>
              <button onClick={() => handleEdit(trainer)}>✏️ Edit</button>
              <button onClick={() => handleDelete(trainer.id)}>🗑 Delete</button>
            </div>
          </div>
        ))}
      </div>

      <button className={styles.floatingButton} onClick={openAddModal}>+</button>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{formMode === "edit" ? "Edit Trainer" : "Add New Trainer"}</h2>
            <form onSubmit={handleAddTrainer}>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.modalInput}
              />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={styles.modalInput}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={styles.modalInput}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.modalInput}
              ></textarea>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className={styles.modalInput}
              >
                <option value="">Select Class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
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

export default AdminTrainers;
