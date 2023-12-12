import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';

const TestQr = () => {
  function getInfoFromQR(qrData) {
    qrData = 'sdt, tên, email';
    return qrData;
  }

  const [scannedInfo, setScannedInfo] = useState('');
  const qrData = 'A58vJZ0SJd\ndsjadiosah\ndsjdij';
  function handleScan(qrData) {
    const info = getInfoFromQR(qrData);
    setScannedInfo(info);
  }

  function downloadQRCode() {
    const canvas = document.getElementById('qr-code-img');

    // Get the base64 representation of the QR code from the image element
    const base64Image = canvas.toDataURL('image/png');

    // Convert the base64 image to a Blob
    const byteCharacters = atob(base64Image.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Use FileSaver.js to save the blob as a file
    saveAs(blob, 'ma-qr.png');
  }

  return (
    <div className='mt-10'>
      {/* Render QR code directly in an img tag */}
      <QRCode value={qrData} id="qr-code-img" />

      <div>
        {scannedInfo ? (
          <p>Thông tin vé: {scannedInfo}</p>
        ) : (
          <p>Quét mã QR để hiển thị thông tin vé</p>
        )}
      </div>

      <button onClick={downloadQRCode}>Tải xuống mã QR</button>
    </div>
  );
};

export default TestQr;
