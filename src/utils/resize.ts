function toBlob(canvas: HTMLCanvasElement) {
    return new Promise<Blob>((resolve, reject) =>
        canvas.toBlob((blob) => {
            if (blob) resolve(blob);
            else reject('Could not convert canvas to blob');
        }, 'image/jpeg')
    );
}

export default function resizeImage(
    originalImage: Blob,
    maxWidth: number,
    maxHeight: number
) {
    return new Promise<Blob>((resolve, reject) => {
        const img = new Image();
        img.onload = async function () {
            let width = img.width;
            let height = img.height;

            if (width >= height && width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
            } else if (height > maxHeight) {
                width *= maxHeight / height;
                height = maxHeight;
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject('Error during resizing of image');
            }
            ctx.drawImage(img, 0, 0, width, height);

            toBlob(canvas).then(resolve).catch(reject);
        };
        img.src = URL.createObjectURL(originalImage);
    });
}
