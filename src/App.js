import React, { useEffect, useState } from "react";
import Quagga from "quagga";

const App = () => {
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    Quagga.init(
      {
        inputStream: {
          name: "Live",
          type: "LiveStream",
          target: document.querySelector("#scanner-container"), // Attach to div
          constraints: {
            width: 640,
            height: 480,
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
    });

    return () => Quagga.stop(); // Cleanup when unmounting
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
