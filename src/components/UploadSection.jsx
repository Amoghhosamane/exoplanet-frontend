import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Download, Upload, Loader, XCircle } from 'lucide-react';

// *** FINAL LIVE RENDER URL ***
const API_BASE_URL = "https://exoplanet-backend-9jvl.onrender.com"; 
// The endpoint matches the one defined in your Python backend (main.py)
const ANALYZE_ENDPOINT = `${API_BASE_URL}/upload`; 

const UploadSection = ({ setAnalysisResult, setIsLoading }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onDrop = async (acceptedFiles) => {
    setErrorMessage('');
    if (acceptedFiles.length === 0) {
      setErrorMessage("Please drop a valid .csv file.");
      return;
    }

    const file = acceptedFiles[0];
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setErrorMessage("File must be a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);
    setAnalysisResult(null);

    try {
      // Corrected fetch call using the live endpoint
      const response = await fetch(ANALYZE_ENDPOINT, { 
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Attempt to parse JSON error response from backend
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result);

    } catch (error) {
      console.error("Upload failed:", error);
      setErrorMessage(`Upload and analysis failed: ${error.message}`);
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const downloadExampleCSV = () => {
    // Mock CSV content for the example file structure
    const csvContent = [
      "ID,Candidate Name,Planet Mass (M_Jup),Orbit Period (days),Detection Method",
      "1,Kepler-186f,0.25,130.3,Transit",
      "2,HD 209458 b,0.69,3.52,Radial Velocity",
      "3,WASP-17b,0.49,3.74,Transit",
      "4,Proxima Centauri b,0.004,11.2,Radial Velocity"
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "example_exoplanet_data.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6 bg-white shadow-xl rounded-xl border border-blue-100 w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-2xl font-bold text-gray-800">1. Upload Exoplanet Data</h2>
        <button
          onClick={downloadExampleCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg hover:bg-green-600 transition duration-150 shadow-md"
        >
          <Download className="w-5 h-5" />
          <span>Download Example CSV</span>
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg flex items-center space-x-2">
            <XCircle className="w-5 h-5" />
            <p className="font-medium text-sm">{errorMessage}</p>
        </div>
      )}

      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center p-12 border-4 border-dashed rounded-xl transition duration-300 cursor-pointer ${
          isDragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 text-blue-500 mb-3" />
        {isDragActive ? (
          <p className="text-lg font-semibold text-blue-600">Drop the CSV file here...</p>
        ) : (
          <p className="text-center text-gray-600">
            Drag 'n' drop your **exoplanet CSV file** here, or click to select file.
            <br />
            <span className="text-sm text-gray-400">(Only `.csv` files are accepted for analysis)</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadSection;
