import React from 'react';

const InsertImage = ({ ctxRef, size }) => {
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      resizeImage(file, size.width, size.height).then((blob) => {
        const img = new Image();
        img.onload = () => {
          if (ctxRef.current) {
            ctxRef.current.clearRect(0, 0, size.width, size.height); 
            ctxRef.current.drawImage(img, 0, 0, size.width, size.height);
          }
        };
        img.src = URL.createObjectURL(blob);
      }).catch(err => {
        console.error("Image resizing error", err);
      });
    }
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      image.onload = () => {
        let width = image.width;
        let height = image.height;

       
        if (width <= maxWidth && height <= maxHeight) {
          canvas.toBlob(resolve, file.type);
          return;
        }

       
        let newWidth;
        let newHeight;

        if (width > height) {
          newWidth = maxWidth;
          newHeight = height * (maxWidth / width);
        } else {
          newHeight = maxHeight;
          newWidth = width * (maxHeight / height);
        }

 
        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const context = canvas.getContext('2d');
        context.drawImage(image, 0, 0, newWidth, newHeight);

        canvas.toBlob(resolve, file.type);
      };
      image.onerror = reject;
    });
  };

  return (
    <div>
      <input 
        type="file" 
        id="fileInput" 
        accept="image/*,application/pdf" 
        style={{ display: 'none' }}
        onChange={handleFileChange} 
      />
      <button onClick={() => document.getElementById('fileInput').click()}>
        Upload Image/PDF
      </button>
    </div>
  );
};

export default InsertImage;
