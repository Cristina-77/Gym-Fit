import styles from '../css/adminMain.module.css';
import myImage1 from '../images/galerie4.png'; 
import myImage2 from '../images/galerie5.png'; 
import myImage3 from '../images/galerie6.png'; 
import icon1 from "../images/class.png";
import icon2 from "../images/trainer.png";
import icon3 from "../images/client.png";
import { useNavigate } from 'react-router-dom';


function AdminMain() {
const navigate = useNavigate();
const menuItems = [
    {
      title: "Classes",
      icon: icon1,
      image: myImage1,
      path: "/adminClasses",
    },
    {
      title: "Trainers",
      icon: icon2,
      image: myImage2,
      path: "/adminTrainers",
    },
    {
      title: "Clients",
      icon: icon3,
      image: myImage3,
      path: "/adminClients",
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

export default AdminMain;
