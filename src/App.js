import React, { useEffect, useState } from "react";
import Quagga from "quagga";

const App = () => {
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          constraints: {
            width: 640,
            height: 480,
            facingMode: "environment", // Use the back camera
          },
        },
        decoder: {
          readers: ["ean_reader", "upc_reader", "upc_e_reader"], // GTIN-supported formats
        },
      },
      (err) => {
        if (err) {
          console.error("Error initializing Quagga:", err);
          return;
        }
        Quagga.start();
      }
    );

    Quagga.onDetected((data) => {
      setScannedResult(data.codeResult.code);
      Quagga.stop(); // Stop scanning after detecting the barcode
    });

    return () => Quagga.stop();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">GTIN Barcode Scanner</h1>
      {scannedResult ? (
        <p className="text-green-600 text-lg font-bold">
          Scanned GTIN Code: {scannedResult}
        </p>
      ) : (
        <div id="scanner-container" className="w-full h-64 bg-gray-200"></div>
      )}
    </div>
  );
};

export default App;