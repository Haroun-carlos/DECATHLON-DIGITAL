import React from 'react';
import { ExternalLink } from "lucide-react";

const InstructionDisplay = ({ recommendation, onStartCamera }) => {
  if (!recommendation) return null;

  return (
    <div className="max-w-2xl mx-auto mt-6 p-6 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl border border-gray-200 font-[Segoe_UI]">
      
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-900 border-b pb-3 mb-4">
        Instructions for: <span className="text-blue-600">{recommendation.movement}</span>
      </h2>

      {/* Illustration */}
      {recommendation.illustrationUrl && (
        <img
          src={recommendation.illustrationUrl}
          alt="illustration"
          className="w-full rounded-xl shadow-md mb-5"
        />
      )}

      {/* Instructions */}
      <ul className="list-disc list-inside space-y-3 text-gray-700 leading-relaxed">
        {recommendation.instructions?.map((ins, i) => (
          <li key={i}>
            <span className="font-semibold text-gray-900">{ins.title}:</span>{" "}
            {ins.detail}
          </li>
        ))}
      </ul>

      {/* Products */}
      {recommendation.products?.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
            Suggested Products
          </h3>

          <ul className="space-y-2">
            {recommendation.products.map((p, i) => (
              <li key={i}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 hover:underline transition"
                >
                  <ExternalLink size={16} />
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Button */}
      <button
        onClick={onStartCamera}
        className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold text-lg rounded-xl shadow-md 
                  hover:bg-blue-700 active:scale-95 transition-all duration-200"
      >
        Start Camera Check
      </button>
    </div>
  );
};

export default InstructionDisplay;
