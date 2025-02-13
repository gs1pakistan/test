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

    const scannerContainer = document.querySelector("#scanner-container");

    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerContainer, // Attach to div
          constraints: {
            facingMode: "environment", // Use back camera
            width: { ideal: 1280 }, // Set ideal resolution for better scanning
            height: { ideal: 720 }, // Set ideal resolution for better scanning
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
      scannerContainer.classList.add("flash");
      setTimeout(() => scannerContainer.classList.remove("flash"), 500);
    });

    // Resize handling for mobile view
    const handleResize = () => {
      Quagga.stop();
      Quagga.init({
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: scannerContainer,
          constraints: {
            facingMode: "environment",
            width: { ideal: window.innerWidth }, // Dynamic resolution based on screen width
            height: { ideal: Math.floor((window.innerWidth * 9) / 16) }, // Dynamic height based on aspect ratio
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader", "upc_e_reader"],
        },
        locate: true,
      }, (err) => {
        if (err) {
          console.error("Quagga Init Error on Resize:", err);
          return;
        }
        Quagga.start();
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      Quagga.stop();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
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
