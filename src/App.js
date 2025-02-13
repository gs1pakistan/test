import React, { useState } from "react";
import BarcodeScannerComponent from "react-webcam-barcode-scanner";

const App = () => {
  const [data, setData] = useState("No barcode scanned");
  const [scanning, setScanning] = useState(false); // State to manage scanning

  const handleStartScan = () => {
    setScanning(true);
  };

  const handleStopScan = () => {
    setScanning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Barcode Scanner</h1>

      {/* Camera capture */}
      {scanning && (
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <BarcodeScannerComponent
            onUpdate={(err, result) => {
              if (result) {
                setData(result.text); // Update with the barcode data
                handleStopScan(); // Stop scanning once a barcode is detected
              }
            }}
          />
        </div>
      )}

      {/* Button to start scanning */}
      {!scanning && (
        <button
          onClick={handleStartScan}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg"
        >
          Start Scanning
        </button>
      )}

      {/* Display the scanned barcode */}
      <p className="mt-4 text-lg">Scanned Code: <span className="font-semibold">{data}</span></p>
    </div>
  );
};

export default App;
