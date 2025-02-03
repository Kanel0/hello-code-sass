import { Mosaic } from 'react-loading-indicators';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
      <Mosaic color="#111a1d" size="medium" text="" textColor="" />
      </div>
    </div>
  );
}
