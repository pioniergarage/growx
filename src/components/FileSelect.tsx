import React, { ChangeEvent, useRef } from 'react';

export default function FileSelect({
    children,
    onSelect,
}: {
    children: React.ReactElement;
    onSelect: (files: FileList | null) => void;
}) {
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
}
