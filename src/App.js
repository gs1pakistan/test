import React, { useEffect, useState } from "react";
import Quagga from "quagga";
import "./App.css"; // Import the CSS file

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
          target: document.querySelector("#scanner-container"), // Attach to div
          constraints: {
            width: 480, // Optimized for mobile
            height: 320,
            facingMode: "environment", // Use back camera
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader", "upc_e_reader"], // GTIN barcode types
        },
        locate: true, // Helps detect barcode accurately
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
      console.log("Detected Barcode:", data.codeResult.code);
      setScannedResult(data.codeResult.code);
      Quagga.stop(); // Stop scanning after a successful scan

      // Add flash effect on scan
      const scannerContainer = document.querySelector("#scanner-container");
      scannerContainer.classList.add("flash");
      setTimeout(() => scannerContainer.classList.remove("flash"), 500);
    });

    return () => Quagga.stop(); // Cleanup when unmounting
  }, []);

  return (
    <div className="app-container">
      <h1>GTIN Barcode Scanner</h1>
      {scannedResult ? (
        <p className="scanned-result">Scanned GTIN Code: {scannedResult}</p>
      ) : (
        <div id="scanner-container">
          <p className="scan-text">Align barcode within the frame</p>
        </div>
      )}
    </div>
  );
};

export default App;
