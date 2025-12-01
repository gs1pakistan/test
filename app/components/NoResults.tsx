import { AlertCircle } from 'lucide-react';

interface NoResultsProps {
    gtin: string;
}

export default function NoResults({ gtin }: NoResultsProps) {
    return (
        <div className="no-results">
            <AlertCircle className="no-results-icon" />
            <h3 className="no-results-title">No Results Found</h3>
            <p className="no-results-text">
                No data was found for GTIN: {gtin.padStart(14, '0')}
            </p>
        </div>
    );
}