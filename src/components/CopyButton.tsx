import React from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
    text: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            title="Copy to clipboard"
        >
            {copied ? (
                <Check className="w-4 h-4 text-green-500" />
            ) : (
                <Copy className="w-4 h-4 text-gray-500" />
            )}
        </button>
    );
}