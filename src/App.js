import { useState, useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function App() {
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    
    scanner.render(
      (decodedText) => {
        setBarcode(decodedText);
        openGS1Search(decodedText);
      },
      (error) => console.error("Scanning error:", error)
    );

    return () => {
      scanner.clear();
    };
  }, []);

  const openGS1Search = (gtin) => {
    const gs1URL = `https://www.gs1.org/services/verified-by-gs1?gtin=${gtin}`;
    window.open(gs1URL, "_blank");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-bold mb-4">Scan Barcode</h2>
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