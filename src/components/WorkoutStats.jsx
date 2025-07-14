const WorkoutStats = ({ distance, time, network }) => (
  <div style={{ marginTop: '1rem' }}>
    <p>Distance: {distance} km</p>
    <p>Time: {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, '0')}</p>
    <p>Network: {network}</p>
  </div>
);

export default WorkoutStats;