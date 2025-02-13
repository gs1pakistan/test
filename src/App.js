import React, { useEffect, useState } from 'react';
import Quagga from 'quagga';
import BarcodeParser from './path/to/BarcodeParser';  // Adjust path

const App = () => {
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("Camera not supported on this device.");
      return;
    }

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"),
          constraints: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: "environment",
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader", "upc_e_reader"],
        },
        locate: true,
      },
      (err) => {
        if (err) {
          console.error("Quagga Init Error:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      const barcode = data.codeResult.code;
      console.log("Detected Barcode:", barcode);

      // Use BarcodeParser to extract GS1 data
      const parsedData = BarcodeParser.parse(barcode); // Assuming BarcodeParser has a `parse` method
      console.log("Parsed GS1 Data:", parsedData);

      setScannedResult(parsedData); // Display parsed data

      Quagga.stop(); // Stop scanning after a successful scan
    });

    return () => Quagga.stop(); // Cleanup when unmounting
  }, []);

  return (
    <div className="app-container">
      <h1>GS1 Barcode Scanner</h1>
      {scannedResult ? (
        <p className="scanned-result">Parsed GS1 Data: {JSON.stringify(scannedResult)}</p>
      ) : (
        <div id="scanner-container">
          <p className="scan-text">Align barcode within the frame</p>
        </div>
      )}
    </div>
  );
};

export default App;
