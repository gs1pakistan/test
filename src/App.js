import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const App = () => {
  const [scannedResult, setScannedResult] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      false
    );

    scanner.render(
      (result) => {
        setScannedResult(result);
        scanner.clear();
      },
      (error) => {
        console.warn("QR Scan Error: ", error);
      }
    );

    return () => scanner.clear();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Barcode Scanner</h1>
      {scannedResult ? (
        <p className="text-green-600 text-lg font-bold">Scanned Code: {scannedResult}</p>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
};

export default App;
