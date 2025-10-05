import React, { useState, useCallback } from 'react';
import axios from 'axios';

// SVG Icon Component for reusability
const Icon = ({ path, className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path}></path>
  </svg>
);

// Helper function to handle Base64 download
const downloadBase64File = (base64Data, filename) => {
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${base64Data}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default function InteractiveTrainer() {
  // State remains the same
  const [files, setFiles] = useState({ koi_file: null, toi_file: null, k2_file: null });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handlers remain the same (using useCallback to prevent unnecessary re-renders)
  const handleFileChange = useCallback((e) => setFiles({ ...files, [e.target.name]: e.target.files[0] }), [files]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!files.koi_file && !files.toi_file && !files.k2_file) {
      setError('Please provide at least one mission dataset.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    Object.keys(files).forEach(key => {
      if(files[key]) formData.append(key, files[key]);
    });

    try {
      // NOTE: Update the URL to your actual backend endpoint if it changes
      const response = await axios.post('http://127.0.0.1:5000/upload_and_analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || err.message || 'An unknown error occurred during analysis.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [files]);

  // Reusable component for file input row
  const FileInput = ({ name, label, fileName }) => (
    <div className="flex justify-between items-center">
      <p className="text-gray-300">{label}</p>
      <div className="flex items-center gap-4">
        {fileName && (
          <span className="flex items-center text-green-400">
            <Icon path="M5 13l4 4L19 7" className="w-5 h-5 mr-1" />
            Uploaded
          </span>
        )}
        <label htmlFor={name} className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors">
          <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" className="w-5 h-5 mr-2" />
          {fileName ? "Change" : "Upload"}
        </label>
        <input type="file" name={name} id={name} onChange={handleFileChange} className="hidden" accept=".csv" />
      </div>
    </div>
  );

  return (
    // Outer container: uses min-h to establish a baseline for h-full to work
    <div className="bg-black bg-opacity-30 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-gray-700 min-h-[400px]">
      
      {/* Primary Content Grid: 4/12 (Input) and 8/12 (Results) split */}
      <div className="grid md:grid-cols-12 gap-10 h-full"> 
        
        {/* LEFT PANEL: Input Data (md:col-span-4) */}
        <div className="md:col-span-4 space-y-6"> 
          <h2 className="text-lg font-semibold border-b border-gray-600 pb-2">INPUT DATA</h2>
          
          <FileInput name="koi_file" label="Kepler (KOI) Data" fileName={files.koi_file?.name} />
          <FileInput name="toi_file" label="TESS (TOI) Data" fileName={files.toi_file?.name} />
          <FileInput name="k2_file" label="K2 Mission Data" fileName={files.k2_file?.name} />
          
          <button 
            onClick={handleSubmit} 
            disabled={isLoading || (!files.koi_file && !files.toi_file && !files.k2_file)} 
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors disabled:bg-gray-800 disabled:text-gray-500"
          >
            {isLoading ? 'Analyzing...' : 'Run Prediction'}
          </button>
        </div>
        
        {/* RIGHT PANEL: Analysis Results (md:col-span-8) */}
        <div className="md:col-span-8">
          {/* Error, Awaiting, and Loading States (use h-full to stretch) */}
          {error && (
            <div className="h-full flex flex-col items-center justify-center bg-red-900 bg-opacity-50 rounded-lg p-6 border border-red-700">
              <Icon path="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" className="w-16 h-16 text-red-400" />
              <h3 className="text-xl font-bold mt-4">Analysis Failed</h3>
              <p className="text-red-300">{error}</p>
            </div>
          )}
          {!result && !error && !isLoading && (
            <div className="h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg p-6 border border-gray-700">
              <Icon path="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" className="w-16 h-16 text-gray-500" />
              <h3 className="text-xl font-bold mt-4 text-gray-400">Awaiting Analysis</h3>
              <p className="text-gray-500">Upload datasets and run prediction to see results.</p>
            </div>
          )}
          {isLoading && (
             <div className="h-full flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 rounded-lg p-6">
               <Icon path="M13 10V3L4 14h7v7l9-11h-7z" className="w-16 h-16 text-blue-400 animate-pulse" />
               <h3 className="text-xl font-bold mt-4 text-blue-300">Analyzing the Cosmos...</h3>
               <p className="text-gray-400">Training models and generating insights.</p>
             </div>
          )}

          {/* Result State - Performance Metrics */}
          {result && (
            <div className="space-y-6">
              {/* Row 1: System Status & Model Performance */}
              <div className="grid grid-cols-2 gap-6">
                {/* System Status */}
                <div className="bg-green-900 bg-opacity-50 border border-green-700 rounded-lg p-4 text-center">
                  <h3 className="font-bold text-lg text-green-300">SYSTEM STATUS</h3>
                  <p className="text-3xl font-bold text-green-100">{result.status || 'Success'}: Model Trained</p> 
                </div>
                {/* Model Performance */}
                <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-lg text-gray-300 mb-2">MODEL PERFORMANCE</h3>
                  <div className="flex justify-around">
                      <div><span className="block text-gray-400">AUC</span><span className="font-bold text-lg">{result.meta_model_evaluation?.auc || 'N/A'}</span></div>
                      <div><span className="block text-gray-400">Precision</span><span className="font-bold text-lg">{result.meta_model_evaluation?.precision || 'N/A'}</span></div>
                      <div><span className="block text-gray-400">Recall</span><span className="font-bold text-lg">{result.meta_model_evaluation?.recall || 'N/A'}</span></div>
                  </div>
                </div>
              </div>

              {/* End of md:col-span-8. We close this div here because the Model Insights 
                  need to span the full width of the overall component. 
              */}
            </div>
          )}
        </div>
      </div>

      {/* NEW SECTION: Model Insights (Full Width) */}
      {result && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-center">Model Insights</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Confusion Matrix */}
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-2 text-center">Confusion Matrix</h3>
              <img className="rounded-md w-full max-w-sm" src={`data:image/png;base64,${result.cm_image}`} alt="Confusion Matrix" />
              <button 
                onClick={() => downloadBase64File(result.cm_image, 'ExoStacker_ConfusionMatrix.png')}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors text-sm"
              >
                <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" className="w-5 h-5 mr-2" />
                Download Plot
              </button>
            </div>

            {/* SHAP Summary Plot */}
            <div className="bg-gray-800 bg-opacity-50 p-4 rounded-lg border border-gray-700 flex flex-col items-center">
              <h3 className="font-bold text-lg mb-2 text-center">SHAP Feature Impact</h3>
              {/* SHAP plots are often wide, making them full-width inside the column */}
              <img className="rounded-md w-full" src={`data:image/png;base64,${result.shap_image}`} alt="SHAP Summary Plot" />
              <button 
                onClick={() => downloadBase64File(result.shap_image, 'ExoStacker_SHAP_Plot.png')}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors text-sm"
              >
                <Icon path="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" className="w-5 h-5 mr-2" />
                Download Plot
              </button>
            </div>
          </div>
        </div>
      )}
      {/* End of Model Insights Section */}

    </div>
  );
}