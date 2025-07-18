import styles from '../css/AdminClasses.module.css';
import { useEffect, useState } from 'react';

function ClientClasses() {
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5162/api/classes")
      .then(res => res.json())
      .then(data => setClasses(data))
      .catch(err => console.error("Error loading classes:", err));
  }, []);

  const openModal = (c) => {
    setSelectedClass(c);
  };

  const closeModal = () => {
    setSelectedClass(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>Browse Through Our Gym Classes</p>
      </div>

      <div className={styles.gridContainer}>
        {classes.map((c) => (
          <div key={c.id} className={styles.gridItem} onClick={() => openModal(c)}>
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
          </div>
        ))}
      </div>

      {selectedClass && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>{selectedClass.name}</h2>
            <img
              src={`http://localhost:5162${selectedClass.imageUrl}`}
              alt={selectedClass.name}
              className={styles.classImage}
              style={{ maxHeight: '250px', objectFit: 'cover' }}
            />
            <p>{selectedClass.description}</p>
            <p><strong>Days:</strong> {selectedClass.days?.join(', ')}</p>
            <p><strong>Time:</strong> {selectedClass.time}</p>
            <p><strong>Duration:</strong> {selectedClass.duration} minutes</p>
            <p><strong>Max Participants:</strong> {selectedClass.maxParticipants}</p>
            <button onClick={closeModal} className={styles.modalButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientClasses;
