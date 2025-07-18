import styles from '../css/ClientMain.module.css';
import React from "react";
import { useNavigate } from 'react-router-dom';
import myImage1 from '../images/galerie1.png'; 
import myImage2 from '../images/galerie2.png'; 
import myImage3 from '../images/galerie3.png'; 
import icon1 from "../images/class.png";
import icon2 from "../images/trainer.png";
import icon3 from "../images/calendar.png";

function ClientMain() {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Classes",
      icon: icon1,
      image: myImage1,
      path: "/clientClasses",
    },
    {
      title: "Trainers",
      icon: icon2,
      image: myImage2,
      path: "/clientTrainers",
    },
    {
      title: "Schedule",
      icon: icon3,
      image: myImage3,
      path: "/clientSchedule",
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to GymFit!</h1>
      <p className={styles.description}>Choose where you want to go:</p>

      <div className={styles.grid}>
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={styles.card}
            onClick={() => navigate(item.path)}
          >
            <img src={item.icon} alt="icon" className={styles.icon} />
            <img src={item.image} alt="preview" className={styles.preview} />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientMain;
