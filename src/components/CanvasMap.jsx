const CanvasMap = ({ canvasRef }) => (
  <canvas
    ref={canvasRef}
    width={window.innerWidth - 40}
    height={300}
    style={{ border: '1px solid #ccc', width: '100%', height: '300px' }}
  ></canvas>
);

export default CanvasMap;