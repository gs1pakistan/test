import React, { useState, useEffect } from 'react';

const BarcodeScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [error, setError] = useState('');
  const [stream, setStream] = useState(null);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startScanning = async () => {
    try {
      setError('');
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });
      
      setStream(mediaStream);
      setScanning(true);

      const video = document.createElement('video');
      video.srcObject = mediaStream;
      await video.play();

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const processFrame = async () => {
        if (!scanning) return;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        try {
          if ('BarcodeDetector' in window) {
            const barcodeDetector = new window.BarcodeDetector({
              formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e']
            });
            
            const barcodes = await barcodeDetector.detect(canvas);
            
            if (barcodes.length > 0) {
              const code = barcodes[0].rawValue;
              setScannedCode(code);
              stopScanning();
              handleSearch(code);
              return;
            }
          }
        } catch (err) {
          console.error('Barcode detection error:', err);
        }

        requestAnimationFrame(processFrame);
      };

      processFrame();

    } catch (err) {
      setError('Failed to access camera. Please make sure you have granted camera permissions.');
      console.error('Camera access error:', err);
    }
  };

  const stopScanning = () => {
    setScanning(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleSearch = (code) => {
    const gs1Input = document.querySelector('#gtin');
    if (gs1Input) {
      gs1Input.value = code;
      const event = new Event('input', { bubbles: true });
      gs1Input.dispatchEvent(event);
      
      const form = gs1Input.closest('form');
      if (form) {
        form.submit();
      }
    }
  };

  return (
    <div style={{ 
      width: '100%',
      maxWidth: '500px',
      margin: '0 auto',
      padding: '1rem'
    }}>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ 
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1rem'
        }}>
          <input 
            type="text" 
            value={scannedCode} 
            onChange={(e) => setScannedCode(e.target.value)}
            placeholder="Scanned barcode will appear here"
            style={{
              flex: 1,
              padding: '0.5rem',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={scanning ? stopScanning : startScanning}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: scanning ? '#ef4444' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {scanning ? 'Stop Scanning' : 'Scan Barcode'}
          </button>
        </div>

        {scanning && (
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16/9',
            backgroundColor: '#000',
            borderRadius: '0.5rem',
            overflow: 'hidden'
          }}>
            <video
              id="scanner-video"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
              autoPlay
              playsInline
              muted
            />
          </div>
        )}

        {error && (
          <div style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '4px',
            marginTop: '1rem'
          }}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default BarcodeScanner;