import React, { useState, useRef } from 'react';
import { Download, Share2, RotateCcw } from 'lucide-react';

const CertificateGeneratorPreview = () => {
  const [userName, setUserName] = useState('');
  const [courseName, setCourseName] = useState('Plastic Awareness Course');
  const [completionDate, setCompletionDate] = useState(
    new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  );
  const [showCertificate, setShowCertificate] = useState(false);
  const certificateRef = useRef();

  const handleGenerateCertificate = () => {
    if (!userName.trim()) {
      alert('Please enter your name');
      return;
    }
    setShowCertificate(true);
  };

  const handleDownload = () => {
    // For web demo - would use html2canvas or similar in production
    alert('In the React Native app, this will save the certificate to your gallery! 💾');
  };

  const handleShare = () => {
    alert('In the React Native app, this will open share options! 📤');
  };

  const handleReset = () => {
    setShowCertificate(false);
    setUserName('');
  };

  const certificateId = `ECO-${Date.now().toString().slice(-8)}`;

  if (!showCertificate) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="text-7xl mb-4">🎓</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Generate Your Certificate
            </h1>
            <p className="text-gray-600 text-lg">
              Congratulations on completing the course!
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-green-500 focus:outline-none"
                  placeholder="Enter your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-green-500 focus:outline-none"
                  placeholder="Enter course name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Completion Date
                </label>
                <input
                  type="text"
                  className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 text-gray-800 focus:border-green-500 focus:outline-none"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                />
              </div>

              <button
                onClick={handleGenerateCertificate}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                🎖️ Generate Certificate
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
            <h3 className="text-lg font-bold text-blue-900 mb-3">✨ Preview Features:</h3>
            <ul className="space-y-2 text-blue-800">
              <li>• Professional certificate design</li>
              <li>• Download as high-quality image</li>
              <li>• Share on social media</li>
              <li>• Save to device gallery</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Certificate */}
        <div ref={certificateRef} className="bg-white p-8 mb-6 shadow-2xl">
          <div className="border-8 border-yellow-600 rounded-lg p-2">
            <div className="border-2 border-yellow-600 p-12 bg-gradient-to-br from-amber-50 to-yellow-50">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🏆</div>
                <h1 className="text-5xl font-black text-gray-800 tracking-widest mb-2">
                  CERTIFICATE
                </h1>
                <p className="text-lg font-semibold text-gray-600 tracking-wider">
                  OF COMPLETION
                </p>
              </div>

              {/* Decorative Line */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex-1 h-0.5 bg-yellow-600"></div>
                <span className="text-3xl mx-6">⭐</span>
                <div className="flex-1 h-0.5 bg-yellow-600"></div>
              </div>

              {/* Content */}
              <div className="text-center space-y-6 mb-12">
                <p className="text-gray-600 italic text-lg">
                  This is to certify that
                </p>
                <div>
                  <h2 className="text-5xl font-black text-gray-800 mb-2">
                    {userName}
                  </h2>
                  <div className="w-4/5 h-0.5 bg-yellow-600 mx-auto"></div>
                </div>

                <p className="text-gray-600 text-base">
                  has successfully completed
                </p>

                <h3 className="text-3xl font-bold text-green-600">
                  {courseName}
                </h3>

                <div className="inline-block bg-green-50 border-2 border-green-500 rounded-full px-8 py-3">
                  <p className="text-sm font-semibold text-green-800">
                    🌿 Excellence in Environmental Education 🌿
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="grid grid-cols-3 gap-4 items-end mt-16">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-4 font-semibold">
                    Date of Completion
                  </p>
                  <p className="text-sm font-bold text-gray-800 mb-2">
                    {completionDate}
                  </p>
                  <div className="w-32 h-px bg-gray-400 mx-auto"></div>
                </div>

                <div className="flex justify-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-yellow-700 rounded-full flex items-center justify-center border-4 border-yellow-800 shadow-lg">
                    <span className="text-4xl">🌍</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-4 font-semibold">
                    Authorized Signature
                  </p>
                  <p className="text-base font-bold text-gray-800 mb-2 italic">
                    Environmental Academy
                  </p>
                  <div className="w-32 h-px bg-gray-400 mx-auto"></div>
                </div>
              </div>

              {/* Certificate ID */}
              <p className="text-center text-xs text-gray-400 mt-8 tracking-wider">
                Certificate ID: {certificateId}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mb-6">
          <button
            onClick={handleDownload}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Save to Gallery
          </button>

          <button
            onClick={handleShare}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share Certificate
          </button>

          <button
            onClick={handleReset}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Create New Certificate
          </button>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6 text-center">
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-lg font-semibold text-green-800">
            Congratulations! Your certificate is ready
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateGeneratorPreview;