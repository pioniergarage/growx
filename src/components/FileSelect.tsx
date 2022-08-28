import React, { ChangeEvent, useRef } from 'react';

interface FileSelectProps {
    children: React.ReactElement;
    onSelect: (files: FileList | null) => void;
}

const FileSelect: React.FC<FileSelectProps> = ({ children, onSelect }) => {
    const uploadRef = useRef<HTMLInputElement>(null);
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        onSelect(e.target.files);
    }
    return (
        <>
            {React.Children.map(children, (child) =>
                React.cloneElement(child, {
                    onClick: () => uploadRef.current?.click(),
                })
            )}
            <input
                ref={uploadRef}
                type="file"
                id="single"
                accept="image/*"
                onChange={handleChange}
                style={{ position: 'absolute', visibility: 'hidden' }}
            />
        </>
    );
};

export default FileSelect;
