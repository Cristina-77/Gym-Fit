import styles from '../css/AdminTrainers.module.css';
import { useEffect, useState } from 'react';

function ClientTrainers() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5162/api/trainers")
      .then(res => res.json())
      .then(data => setTrainers(data))
      .catch(err => console.error("Error loading trainers:", err));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.description}>Meet Our Trainers</p>
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
              <div className={styles.trainerDescription}>
                <strong>Class:</strong> {trainer.class?.name || '—'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientTrainers;
