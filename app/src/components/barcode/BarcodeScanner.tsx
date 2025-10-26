import { useEffect, useRef, useState } from 'react';
import Quagga from '@ericblade/quagga2';
import type { ScanResult } from '../../types';

interface BarcodeScannerProps {
  onScan: (result: ScanResult) => void;
  onError?: (error: Error) => void;
  isActive: boolean;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({
  onScan,
  onError,
  isActive,
}) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isActive || !scannerRef.current) {
      if (isInitialized) {
        Quagga.stop();
        setIsInitialized(false);
      }
      return;
    }

    const initScanner = async () => {
      try {
        await Quagga.init(
          {
            inputStream: {
              name: 'Live',
              type: 'LiveStream',
              target: scannerRef.current!,
              constraints: {
                facingMode: 'environment',
                aspectRatio: { min: 1, max: 2 },
              },
            },
            decoder: {
              readers: [
                'ean_reader',
                'ean_8_reader',
                'upc_reader',
                'upc_e_reader',
              ],
            },
            locate: true,
            locator: {
              patchSize: 'medium',
              halfSample: true,
            },
            numOfWorkers: navigator.hardwareConcurrency || 4,
            frequency: 10,
          },
          (err) => {
            if (err) {
              console.error('Quagga init error:', err);
              onError?.(err);
              return;
            }

            Quagga.start();
            setIsInitialized(true);
          }
        );

        Quagga.onDetected((result) => {
          if (result.codeResult.code) {
            const scanResult: ScanResult = {
              barcode: result.codeResult.code,
              format: result.codeResult.format,
              timestamp: Date.now(),
            };

            // Vibrate if available
            if ('vibrate' in navigator) {
              navigator.vibrate(200);
            }

            onScan(scanResult);
          }
        });
      } catch (err) {
        console.error('Scanner initialization error:', err);
        onError?.(err as Error);
      }
    };

    initScanner();

    return () => {
      if (isInitialized) {
        Quagga.stop();
        setIsInitialized(false);
      }
    };
  }, [isActive, onScan, onError]);

  if (!isActive) {
    return null;
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div
        ref={scannerRef}
        className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"
      />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-4 border-2 border-green-500 rounded-lg">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-green-500 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-green-500 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-green-500 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-green-500 rounded-br-lg" />
        </div>
      </div>
      <div className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
        Position the barcode within the frame
      </div>
    </div>
  );
};
