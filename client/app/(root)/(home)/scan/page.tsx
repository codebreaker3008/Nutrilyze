"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { Video, Image } from "lucide-react";

const VideoCapture = dynamic(
  () => import("@/components/shared/VideoCapture/VideoCapture"),
  {
    ssr: false,
  }
);
const ImageCapture = dynamic(
  () => import("@/components/shared/ImageCapture/ImageCapture"),
  {
    ssr: false,
  }
);

enum Modes {
  VIDEO_CAPTURE = "video",
  IMAGE_CAPTURE = "image",
}

export default function Home() {
  const [mode, setMode] = useState(Modes.VIDEO_CAPTURE);

  const showVideoCapture = () => setMode(Modes.VIDEO_CAPTURE);
  const showImageCapture = () => setMode(Modes.IMAGE_CAPTURE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex space-x-4 justify-center mb-6">
            <button
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out
                ${
                  mode === Modes.VIDEO_CAPTURE
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
              onClick={showVideoCapture}
            >
              <Video
                className={`${
                  mode === Modes.VIDEO_CAPTURE ? "text-white" : "text-blue-600"
                }`}
                size={20}
              />
              <span>Decode Video</span>
            </button>
            <button
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ease-in-out
                ${
                  mode === Modes.IMAGE_CAPTURE
                    ? "bg-green-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }
              `}
              onClick={showImageCapture}
            >
              <Image
                className={`${
                  mode === Modes.IMAGE_CAPTURE ? "text-white" : "text-green-600"
                }`}
                size={20}
              />
              <span>Decode Image</span>
            </button>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 h-full max-h-[80vh]">
            {mode === Modes.VIDEO_CAPTURE ? <VideoCapture /> : <ImageCapture />}
          </div>
        </div>
        <p className="text-center text-gray-600 text-sm">
          Select "Decode Video" to scan QR codes in real-time or "Decode Image"
          to upload and scan an image.
        </p>
      </div>
    </div>
  );
}
