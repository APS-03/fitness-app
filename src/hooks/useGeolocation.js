import { useState, useRef } from 'react';
import { useEffect } from 'react';

const haversine = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(lat1 * Math.PI / 180) *
            Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const useGeolocation = () => {
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [prevCoords, setPrevCoords] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const canvasRef = useRef(null);

  const startWorkout = () => {
    setStartTime(Date.now());
    navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        if (prevCoords) {
          const dist = haversine(prevCoords.latitude, prevCoords.longitude, latitude, longitude);
          setDistance(prev => parseFloat((prev + dist).toFixed(2)));
          drawPath(latitude, longitude);
        }
        setPrevCoords({ latitude, longitude });
      },
      (err) => alert("Error: " + err.message),
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );
  };

  const drawPath = (lat, lon) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const x = canvas.width / 2 + (lon % 1) * 1000;
    const y = canvas.height / 2 - (lat % 1) * 1000;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    let timer;
    if (startTime) {
      timer = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime]);

  return { distance, time, startWorkout, canvasRef };
};

export default useGeolocation;
