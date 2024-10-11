import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";


interface IQrReader {
  valueScanned: string,
  setValueScanned: React.Dispatch<React.SetStateAction<string>>
}

const QrReader = (props: IQrReader) => {

  const { valueScanned, setValueScanned } = props

  // QR States
  const scanner = useRef<QrScanner>();
  const videoEl = useRef<HTMLVideoElement>(null);
  const qrBoxEl = useRef<HTMLDivElement>(null);
  const [qrOn, setQrOn] = useState<boolean>(true);

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    const value = JSON.parse(result.data)
    setValueScanned(value.name);
  };

  // Fail
  const onScanFail = (err: string | Error) => {
    console.log("Errorrrr: ", err);
  };

  useEffect(() => {
    if (videoEl?.current && !scanner.current) {
      scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
        onDecodeError: onScanFail,
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        overlay: qrBoxEl?.current || undefined,
      });

      scanner?.current
        ?.start()
        .then(() => setQrOn(true))
        .catch((err) => {
          if (err) setQrOn(false);
        });
    }

    return () => {
      if (!videoEl?.current) {
        scanner?.current?.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!qrOn)
      alert(
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
      );
  }, [qrOn]);

  return (
    <div>
      {valueScanned && (
        <p
          style={{
            top: 0,
            left: 0,
            color: "black",
            fontWeight: 600
          }}
        >
          Scanned: {valueScanned}
        </p>
      )}
      <video
        ref={videoEl}
        style={{
          borderRadius: '10px',
        }}
        width="320" height="300"
        controls
      ></video>
    </div>
  );
};

export default QrReader;
