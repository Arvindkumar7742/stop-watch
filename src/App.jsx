import React, { useEffect, useState } from 'react'

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Incrementing by 10ms for better accuracy
      }, 10);
    } else if (!running && time !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running, time]);

  const reset = () => {
    setTime(0);
    setRunning(false);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${hours}:${minutes}:${seconds}:${getMilliseconds}`;
  };
  return (
    <div style={styles.container}>
    <h2>Stopwatch</h2>
    <div style={styles.time}>
      {formatTime(time)}
    </div>
    <div style={styles.buttons}>
      <button onClick={() => setRunning(true)}>Start</button>
      <button onClick={() => setRunning(false)}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  </div>
  )
}

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  time: {
    fontSize: '48px',
    marginBottom: '20px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
};

export default App;
