import React, { useState, useEffect, useRef } from 'react';
import InputForm from './components/InputForm';
import ProfileSheet from './components/ProfileSheet';
import CategoryDetailModal from './components/CategoryDetailModal';
import SummaryReport from './components/SummaryReport';
import { getTScoreFromRaw } from './utils/scoring';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

function App() {
  const [rawScores, setRawScores] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formType, setFormType] = useState('HOME'); // 'HOME' or 'CLASSROOM'
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toLocaleDateString('pt-BR'),
    birthDate: ''
  });
  const inputRef = useRef(null);
  const profileRef = useRef(null);
  const summaryRef = useRef(null);

  // Initialize with some default values (zeros)
  // The original useEffect for initializing rawScores is kept, but the provided snippet removes it.
  // For this change, I will keep the useEffect as it's not explicitly removed by the instruction,
  // but the provided snippet implies a different initial state handling or removal of this useEffect.
  // Given the instruction is to "add" and "ref", and the snippet shows a different App() structure,
  // I will follow the snippet's structure which implicitly removes the useEffect and `selectedCategory` state.
  // Re-evaluating the instruction: "Import libs, add handleExportPDF, add button, and ref".
  // The provided "Code Edit" snippet is a complete replacement for the App component's initial structure.
  // I will follow the provided "Code Edit" snippet for the App component's structure.

  // The provided snippet removes the useEffect for initial raw scores.
  // It also removes the `selectedCategory` state.
  // I will proceed with these removals as per the provided snippet.

  const handleScoreChange = (category, value) => {
    setRawScores(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  // Calculate T-Scores based on raw scores and selected form type
  const tScores = {};
  // The provided snippet changes the tScores calculation to iterate over Object.keys(rawScores).
  // This implies that rawScores might not be initialized with all CATEGORIES upfront anymore,
  // or that CATEGORIES import is no longer needed for this specific loop.
  // I will follow the provided snippet's tScores calculation.
  Object.keys(rawScores).forEach(cat => {
    const t = getTScoreFromRaw(cat, rawScores[cat], formType);
    if (t) tScores[cat] = t;
  });

  const handleExportPDF = async () => {
    if (!inputRef.current || !profileRef.current || !summaryRef.current) {
      console.error('One or more refs are null');
      return;
    }

    try {
      console.log('Starting PDF export with html-to-image...');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Helper to add image to PDF
      const addToPdf = async (element, isFirstPage = false) => {
        if (!isFirstPage) pdf.addPage();

        const dataUrl = await toPng(element, { cacheBust: true, backgroundColor: '#ffffff' });
        const imgProps = pdf.getImageProperties(dataUrl);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        // Check if image height is greater than page height
        if (imgHeight > pdfHeight) {
          // Scale to fit height if needed, or just let it spill (usually fit width is preferred)
          // For this report, fitting width is standard, but if it's too long, it might be cut off.
          // Given the sections, they should fit on A4.
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);
        } else {
          pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);
        }
      };

      console.log('Capturing Page 1: Input Form');
      await addToPdf(inputRef.current, true);

      console.log('Capturing Page 2: Profile Sheet');
      await addToPdf(profileRef.current);

      console.log('Capturing Page 3: Summary');
      await addToPdf(summaryRef.current);

      const safeName = formData.name ? formData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'relatorio';
      const filename = `SPM_${safeName}.pdf`;

      pdf.save(filename);
      console.log(`PDF saved as ${filename}`);
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('Erro ao exportar PDF. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md transition-colors ${formType === 'HOME' ? 'bg-blue-600' : 'bg-orange-500'}`}>
              SPM
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 leading-tight">Sensory Processing Measure Viewer</h1>
              <p className="text-xs text-gray-500 font-medium">Dayane Crisostomo - Terapeuta Ocupacional</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Form Type Switcher */}
            <div className="bg-gray-100 p-1 rounded-lg flex text-sm font-medium">
              <button
                onClick={() => setFormType('HOME')}
                className={`px-3 py-1.5 rounded-md transition-all ${formType === 'HOME' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Casa
              </button>
              <button
                onClick={() => setFormType('CLASSROOM')}
                className={`px-3 py-1.5 rounded-md transition-all ${formType === 'CLASSROOM' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Escola
              </button>
            </div>

            <button
              onClick={handleExportPDF}
              className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar PDF
            </button>

            <div className="text-sm text-gray-500 hidden lg:block">https://www.dayanecrisostomo.com.br</div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Top Section: Input Form */}
          <section ref={inputRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className={`h-2 w-full ${formType === 'HOME' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className={`w-2 h-2 rounded-full mr-2 ${formType === 'HOME' ? 'bg-blue-500' : 'bg-orange-500'}`}></span>
                Dados Paciente ({formType === 'HOME' ? 'Casa' : 'Escola'})
              </h2>
              <InputForm
                rawScores={rawScores}
                onScoreChange={handleScoreChange}
                formType={formType}
                formData={formData}
                onFormChange={handleFormChange}
              />
            </div>
          </section>

          {/* Bottom Section: Profile Sheet & Summary */}
          <div className="space-y-8">
            <section ref={profileRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 overflow-x-auto">
                <ProfileSheet
                  rawScores={rawScores}
                  tScores={tScores}
                  onCategoryClick={setSelectedCategory}
                  formType={formType}
                />
              </div>
            </section>

            <div ref={summaryRef}>
              <SummaryReport tScores={tScores} />
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedCategory && (
        <CategoryDetailModal
          categoryId={selectedCategory}
          tScore={tScores[selectedCategory]}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}

export default App;
