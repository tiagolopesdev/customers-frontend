import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import { Alert } from "@mui/material";


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
  const [messageError, setMessageError] = useState('')

  // Success
  const onScanSuccess = (result: QrScanner.ScanResult) => {
    try {
      const value = JSON.parse(result.data)
      // console.log('Successs ', result)
      setValueScanned(value.name);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.log('Sucess not')
      setMessageError('Qr Code não é válido')
      setValueScanned('');
    }
  };

  // console.log('Value ', valueScanned)

  // Fail
  const onScanFail = (err: string | Error) => {
    setMessageError('')
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

  const managerShowScanned = () => {
    if (messageError !== '') {
      return <Alert severity="error">{messageError}</Alert>
    } else {
      return valueScanned === '' ?
        <Alert severity="info">Nenhum valor lido</Alert> :
        <Alert severity="info">{`Valor obtido: ${valueScanned}`}</Alert>
    }
  }

    return (
      <div>
        {managerShowScanned()}
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
