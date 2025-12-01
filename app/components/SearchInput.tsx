import { Search, Loader2, Camera } from 'lucide-react';
import './Searchinput.css';


interface SearchInputProps {
    gtin: string;
    setGtin: (value: string) => void;
    loading: boolean;
    onSubmit: (e: React.FormEvent) => void;
    onStartScanner: () => void;
}

export default function SearchInput({
    gtin,
    setGtin,
    loading,
    onSubmit,
    onStartScanner,
}: SearchInputProps) {
    return (
        <div className="si-card">
            <div className="si-input-wrapper">
                <input
                    type="text"
                    value={gtin}
                    onChange={(e) => setGtin(e.target.value.replace(/\D/g, '').slice(0, 14))}
                    placeholder="Enter GTIN (e.g., 9506000140445)"
                    className="si-input"
                    maxLength={14}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            onSubmit(e as any);
                        }
                    }}
                />
                <span className="si-hint">
                    {gtin.length}/14 digits (zeros added automatically)
                </span>
            </div>

            {/* Single div for both buttons */}
            <div className="si-btn-wrapper">
                <button onClick={onStartScanner} className="si-btn si-scan" title="Scan Barcode">
                    <Camera className="si-icon" /> Scan the barcode
                </button>
                <button
                    onClick={onSubmit}
                    disabled={loading || gtin.length === 0}
                    className="si-btn si-search"
                >
                    {loading ? (
                        <>
                            <Loader2 className="si-icon spin" />
                            Searching...
                        </>
                    ) : (
                        <>
                            <Search className="si-icon" />
                            Search the GTIN number
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
