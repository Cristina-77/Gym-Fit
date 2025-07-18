import React, { useState, useEffect } from "react";
import styles from "../css/ClientSchedule.module.css";

function ClientSchedule() {
  const [weeklySchedule, setWeeklySchedule] = useState([]);
  const [myClasses, setMyClasses] = useState([]);
  const clientId = localStorage.getItem("clientId");

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    console.log("Fetching schedule...");

    fetch("http://localhost:5162/api/classes/schedule")
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        try {
          const json = JSON.parse(text);
          return json;
        } catch {
          throw new Error("Invalid JSON: " + text);
        }
      })
      .then((data) => {
        console.log("Schedule loaded:", data);
        setWeeklySchedule(data);
      })
      .catch((err) => {
        console.error("Error loading schedule:", err.message);
      });

    fetch(`http://localhost:5162/api/classregistration/client/${clientId}/classes`)
      .then(async (res) => {
        const text = await res.text();
        if (!res.ok) throw new Error(text);
        try {
          const json = JSON.parse(text);
          return json;
        } catch {
          throw new Error("Invalid JSON: " + text);
        }
      })
      .then((data) => {
        setMyClasses(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error("Error loading my classes:", err.message);
      });
  }, [clientId]);

  // Grupare clase pe zile
  const scheduleByDay = days.reduce((acc, day) => {
    acc[day] = weeklySchedule.filter((cls) => cls.days?.includes(day));
    return acc;
  }, {});

  // Abonare
  const handleSubscribe = async (cls) => {
    if (myClasses.some((c) => c.id === cls.id)) return;

    if (cls.participantsCount >= cls.maxParticipants) {
      alert("This class is full.");
      return;
    }


    try {
      const res = await fetch(`http://localhost:5162/api/classregistration`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: parseInt(clientId), classId: cls.id }),
      });

      if (!res.ok) throw new Error("Failed to subscribe");

      setMyClasses((prev) => [...prev, cls]);
    } catch (err) {
      console.error("Subscription error:", err.message);
      alert("Subscription failed");
    }
  };

  // Dezabonare
  const handleUnsubscribe = async (classId) => {
    try {
      const res = await fetch(
        `http://localhost:5162/api/classregistration/${clientId}/${classId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed to unsubscribe");

      setMyClasses((prev) => prev.filter((c) => c.id !== classId));
    } catch (err) {
      console.error("Unsubscription error:", err.message);
      alert("Unsubscription failed");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Weekly Schedule</h1>
        <p className={styles.description}>
          Click on a class to subscribe or unsubscribe from it.
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.gridContainer}>
          {days.map((day) => (
            <div key={day} className={styles.dayColumn}>
              <h3>{day}</h3>
              {(scheduleByDay[day] || []).map((cls) => (
                <div
                  key={cls.id}
                  className={styles.classCard}
                  onClick={() => handleSubscribe(cls)}
                  style={{
                    backgroundColor: myClasses.some((c) => c.id === cls.id)
                      ? "#b2f0dfff"
                      : "#d1e7dd",
                    cursor: "pointer",
                    
                  }}
                >
                  <strong>{cls.name}</strong>
                  <p>{cls.time}</p>
                </div>
              ))}
            </div>
          ))}

          <div className={styles.myClassesColumn}>
            <h3>My Classes</h3>
            {myClasses.map((cls) => (
              <div
                key={cls.id}
                className={styles.classCard}
                onClick={() => handleUnsubscribe(cls.id)}
                style={{ backgroundColor: "#ffe5e5", cursor: "pointer" }}
              >
                <strong>{cls.name}</strong>
                <p>{(cls.days?.join(", ") || "Unknown day")} - {cls.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientSchedule;
