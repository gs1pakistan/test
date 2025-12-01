import { useRef, useEffect } from 'react';
import { Camera, X, Loader2 } from 'lucide-react';

interface BarcodeScannerProps {
    showScanner: boolean;
    scannerReady: boolean;
    onClose: () => void;
    onScan: (data: string) => void;
    onError: (error: string) => void;
}

export default function BarcodeScanner({ 
    showScanner, 
    scannerReady, 
    onClose, 
    onScan,
    onError 
}: BarcodeScannerProps) {
    const scannerRef = useRef<HTMLDivElement>(null);
    const html5QrCodeRef = useRef<any>(null);

    useEffect(() => {
        if (!showScanner) return;

        const initScanner = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 100));

                if (!scannerRef.current) {
                    throw new Error('Scanner container not found');
                }

                const { Html5Qrcode } = await import('html5-qrcode');
                html5QrCodeRef.current = new Html5Qrcode("barcode-scanner");

                const config = {
                    fps: 10,
                    qrbox: { width: 300, height: 150 },
                    aspectRatio: 1.777778,
                    disableFlip: false,
                    formatsToSupport: [0, 8, 9, 12, 13, 5, 4],
                    videoConstraints: {
                        facingMode: "environment",
                        advanced: [{ focusMode: "continuous" }]
                    }
                };

                await html5QrCodeRef.current.start(
                    { facingMode: "environment" },
                    config,
                    (decodedText: string) => {
                        console.log('Scanned:', decodedText);
                        onScan(decodedText);
                    },
                    () => { }
                );

            } catch (err: any) {
                console.error('Scanner error:', err);
                onError(`Unable to start scanner: ${err.message}`);
            }
        };

        initScanner();

        return () => {
            const cleanup = async () => {
                try {
                    if (html5QrCodeRef.current) {
                        const isScanning = html5QrCodeRef.current.getState() === 2;
                        if (isScanning) {
                            await html5QrCodeRef.current.stop();
                        }
                        html5QrCodeRef.current.clear();
                        html5QrCodeRef.current = null;
                    }
                } catch (err) {
                    console.error('Error stopping scanner:', err);
                }
            };
            cleanup();
        };
    }, [showScanner, onScan, onError]);

    if (!showScanner) return null;

    return (
        <div className="scanner-overlay">
            <div className="scanner-container">
                <div className="scanner-header">
                    <div>
                        <h3 className="scanner-title">
                            <Camera className="btn-icon" />
                            Scan Barcode
                        </h3>
                        <p className="scanner-subtitle">
                            {scannerReady ? 'Position barcode within the green frame' : 'Starting camera...'}
                        </p>
                    </div>
                    <button onClick={onClose} className="scanner-close-btn">
                        <X className="btn-icon" />
                    </button>
                </div>
                <div className="scanner-body">
                    <div id="barcode-scanner" ref={scannerRef} className="scanner-viewport" />
                    {!scannerReady && (
                        <div className="scanner-loading">
                            <Loader2 className="animate-spin" style={{ width: '3rem', height: '3rem', color: '#10b981' }} />
                        </div>
                    )}
                </div>
                <div className="scanner-footer">
                    <p className="scanner-footer-text">
                        Supports: EAN-13, EAN-8, UPC-A, UPC-E, Code 128, Code 39
                    </p>
                </div>
            </div>
        </div>
    );
}