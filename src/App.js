import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function App() {
  const [barcode, setBarcode] = useState("");
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    const newScanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    setScanner(newScanner);
    return () => {
      newScanner.clear();
    };
  }, []);

  const startScanner = () => {
    if (scanner) {
      scanner.render(
        (decodedText) => {
          setBarcode(decodedText);
          openGS1Search(decodedText);
          scanner.clear();
        },
        (error) => console.error(error)
      );
    }
  };

  const openGS1Search = (gtin) => {
    const gs1URL = `https://www.gs1.org/services/verified-by-gs1?gtin=${gtin}`;
    window.open(gs1URL, "_blank");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Scan Barcode</h2>
      <button 
        onClick={startScanner} 
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        Start Scanner
      </button>
      <div id="reader" className="mb-4"></div>
      <input
        type="text"
        id="barcodeSearch"
        value={barcode}
        readOnly
        className="border p-2 w-full max-w-md text-center"
      />
    </div>
  );
}