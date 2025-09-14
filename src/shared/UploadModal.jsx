import { useState } from "react";

const UploadModal = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = () => {
    if (!file) return;
    setUploading(true);
    setProgress(0);

    
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgress(percent);
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          alert(`✅ ${file.name} uploaded successfully (mocked)!`);
          onClose();
        }, 500);
      }
    }, 200); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Upload Contract</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        {uploading ? (
          <div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600">Uploading... {progress}%</p>
          </div>
        ) : (
          <button
            onClick={handleUpload}
            disabled={!file}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:bg-gray-400"
          >
            Upload
          </button>
        )}

        <button
          onClick={onClose}
          className="ml-3 px-4 py-2 bg-gray-300 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UploadModal;
