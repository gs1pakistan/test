import { AlertCircle } from 'lucide-react';

interface ErrorAlertProps {
    title: string;
    message: string;
    hint?: string;
}

export default function ErrorAlert({ title, message, hint }: ErrorAlertProps) {
    return (
        <div className="alert alert-error">
            <AlertCircle className="alert-icon alert-icon-error" />
            <div>
                <h3 className="alert-title">{title}</h3>
                <p className="alert-text">{message}</p>
                {hint && <p className="alert-hint">{hint}</p>}
            </div>
        </div>
    );
}