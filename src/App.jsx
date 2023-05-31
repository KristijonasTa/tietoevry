import { useState } from 'react';
import './App.scss';
import Button from './components/Button';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  const [totalProjectTime, setTotalProjectTime] = useState(0);
  const [busyHoursPerDay, setBusyHoursPerDay] = useState(0);
  const [deadLine, setDeadline] = useState('');
  const [result, setResult] = useState('');

  const handleTotalProjectTime = (event) => {
    const value = Number(event.target.value);
    if (value >= 0) {
      setTotalProjectTime(value);
    }
  };

  const handleBusyHoursPerDay = (event) => {
    const value = Number(event.target.value);
    if (value >= 0 && value <= 16) {
      setBusyHoursPerDay(value);
    }
  };

  const handleDeadLine = (event) => {
    setDeadline(event.target.value);
  };

  const calculateHoursPerDay = () => {
    const selectedDate = new Date(deadLine);
    const currentDate = new Date();

    // Calculating milliseconds to days
    const daysLeft = Math.ceil((selectedDate - currentDate) / (1000 * 3600 * 24));

    // Subtracting busy hours and sleep hours
    const availableHoursPerDay = 24 - busyHoursPerDay - 8;
    const totalAvailableHours = availableHoursPerDay * daysLeft;

    if (totalProjectTime <= totalAvailableHours) {
      const hoursPerDay = Math.floor(totalProjectTime / daysLeft);
      const minutesPerDay = Math.round(((totalProjectTime / daysLeft) % 1) * 60);
      setResult(
        `You need to spend ${hoursPerDay} hours and ${minutesPerDay} minutes per day to finish the project on time.`
      );
    } else {
      const missingHours = totalProjectTime - totalAvailableHours;
      const missingHoursInt = Math.floor(missingHours);
      const missingMinutes = Math.round((missingHours % 1) * 60);
      setResult(
        `You need ${missingHoursInt} hours and ${missingMinutes} minutes more to finish the project by the deadline: ${deadLine}.`
      );
    }
  };

  return (
    <div className="main">
      <Header />
      <main className="page">
        <div className="inputs">
          <label htmlFor="length" className="label">
            Total project time
            <br />
            <input type="number" value={totalProjectTime} onChange={handleTotalProjectTime} />
          </label>
          <br />
          <br />
          <label htmlFor="busy" className="label">
            Busy hours
            <br />
            <input type="number" value={busyHoursPerDay} onChange={handleBusyHoursPerDay} />
          </label>
          <br />
          <br />
          <label htmlFor="tillWhen" className="label">
            Deadline
            <br />
            <input type="date" value={deadLine} onChange={handleDeadLine} />
          </label>
        </div>
        <Button className="calculate" title="Calculate" onClick={calculateHoursPerDay} />
        <br />

        <div>
          <p className="result">{result}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
