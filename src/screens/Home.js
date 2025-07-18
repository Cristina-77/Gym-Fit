import styles from '../css/Home.module.css';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import myImage from '../images/home.jpg'; 
function Home() {
   const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const data = await fetch('http://localhost:5162/api/login/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then(async res => {
      const text = await res.text();
      if (!res.ok) throw new Error(text || 'Login failed');
      return text ? JSON.parse(text) : {};
    });

    
    if (data.isAdmin) {
      navigate('/adminMain');
    } else {
      localStorage.setItem('clientId', data.id); 
      navigate('/clientMain');
    }
  } catch (error) {
    console.error("Login error:", error);
    alert('Server error: ' + error.message);
  }
};


  return (
    
    <div className={styles.container}>
      <div className={styles.leftSide}>
        <img src={myImage} alt="Left visual" />
      </div>

      <div className={styles.rightSide}>

        <form onSubmit={handleLogin} className={styles.form}>
          <h1 className={styles.title}>Welcome!</h1>
          <input  type="text" id="email" name="email" placeholder="E-mail"  value={email} onChange={(e) => setEmail(e.target.value)} required  className={styles.input}/><br /><br />
          <input  type="password" id="password" name="password" placeholder="Password"  value={password} onChange={(e) => setPassword(e.target.value)} required  className={styles.input}/><br /><br />
          <Link to="/create" className={styles.link}>Create an account</Link>
          <br />
          <button type="submit" className={styles.input}>Log in</button>
        </form>
      </div>
    </div>    
  );
}

export default Home;
