import styles from '../css/Create.module.css';
import React, { useState } from "react";
import myImage from '../images/home.jpg'; 
import { useNavigate } from 'react-router-dom';
function Create() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const navigate = useNavigate();
  

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5162/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstname,
        lastName: lastname,
        email,
        password,
      }),
    });
    if (response.ok) {
      const savedClient = await response.json();
      localStorage.setItem("clientId", savedClient.id);
      navigate('/'); 
    } else {
      const error = await response.text();
      alert('Eroare: ' + error);
    }
  } catch (error) {
    console.error(error);
    alert('Eroare server: ' + error.message);
  }
};
  return (
       <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={myImage} alt="Left visual" />
      </div>

      <div className={styles.rightSide}>


        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Create an account</h1>
            <input type="text" id="lastname" name="lastname" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} required  className={styles.input}/><br /><br />
            <input type="text" id="firstname" name="firstname" placeholder="First Name" value={firstname} onChange={(e) => setFirstname(e.target.value)} required  className={styles.input}/><br /><br />
            <input type="text" id="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required  className={styles.input}/><br /><br />
            <input type="password" id="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required  className={styles.input}/><br /><br />
            <input type="password" id="repeat-password" name="repeat-password" placeholder="Repeat Password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} required  className={styles.input}/><br /><br />
             
            <br />
            <button type="submit" className={styles.input}>Create Account</button>
        </form>
    </div>
    </div>
  );
}

export default Create;