import React, { useRef, useState, useEffect } from 'react';

const PostureCamera = ({ movement }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [running, setRunning] = useState(false);

  const startCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Camera API not available in this browser.');
      return;
    }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      setStream(s);
      if (videoRef.current) videoRef.current.srcObject = s;
      setRunning(true);
    } catch (err) {
      console.error('getUserMedia error', err);
      alert('Could not access camera: ' + err.message);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((t) => t.stop());
      setStream(null);
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setRunning(false);
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    };
  }, [stream]);

  return (
    <div>
      <h2>Camera Check — {movement || 'Movement'}</h2>
      <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxWidth: 640 }} />
      <div style={{ marginTop: 8 }}>
        {!running ? (
          <button onClick={startCamera}>Start Camera</button>
        ) : (
          <button onClick={stopCamera}>Stop Camera</button>
        )}
      </div>
      <p>
        This is a basic camera preview. Implement pose detection logic here to analyze posture.
      </p>
    </div>
  );
};

export default PostureCamera;