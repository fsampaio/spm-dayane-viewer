import React, { useState, useRef } from 'react';
import InputForm from './components/InputForm';
import ProfileSheet from './components/ProfileSheet';
import CategoryDetailModal from './components/CategoryDetailModal';
import SummaryReport from './components/SummaryReport';
import ComparisonReport from './components/ComparisonReport';
import { getTScoreFromRaw } from './utils/scoring';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

function App() {
  const [scores, setScores] = useState({ HOME: {}, CLASSROOM: {} });
  const [viewMode, setViewMode] = useState('HOME'); // 'HOME', 'CLASSROOM', 'BOTH'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: new Date().toLocaleDateString('pt-BR'),
    birthDate: ''
  });

  // Refs for PDF Export
  const inputHomeRef = useRef(null);
  const inputClassRef = useRef(null);
  const profileHomeRef = useRef(null);
  const profileClassRef = useRef(null);
  const summaryHomeRef = useRef(null);
  const summaryClassRef = useRef(null);
  const comparisonRef = useRef(null);

  const handleScoreChange = (type, category, value) => {
    setScores(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [category]: value
      }
    }));
  };

  const handleFormChange = (newFormData) => {
    setFormData(newFormData);
  };

  // Calculate T-Scores
  const calculateTScores = (type) => {
    const raw = scores[type];
    const t = {};
    Object.keys(raw).forEach(cat => {
      const val = getTScoreFromRaw(cat, raw[cat], type);
      if (val) t[cat] = val;
    });
    return t;
  };

  const tScoresHome = calculateTScores('HOME');
  const tScoresClassroom = calculateTScores('CLASSROOM');

  const handleExportPDF = async () => {
    try {
      console.log('Starting PDF export...');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const addToPdf = async (element, isFirstPage = false) => {
        if (!element) return;
        if (!isFirstPage) pdf.addPage();

        const dataUrl = await toPng(element, { cacheBust: true, backgroundColor: '#ffffff' });
        const imgProps = pdf.getImageProperties(dataUrl);

        const widthRatio = pdfWidth / imgProps.width;
        const heightRatio = pdfHeight / imgProps.height;
        const ratio = Math.min(widthRatio, heightRatio);

        const finalWidth = imgProps.width * ratio;
        const finalHeight = imgProps.height * ratio;

        const x = (pdfWidth - finalWidth) / 2;
        const y = 0;

        pdf.addImage(dataUrl, 'PNG', x, y, finalWidth, finalHeight);
      };

      let firstPageAdded = false;

      // Helper to add section if it exists
      const addSection = async (ref) => {
        if (ref.current) {
          await addToPdf(ref.current, !firstPageAdded);
          firstPageAdded = true;
        }
      };

      // Order: Input(s) -> Profile(s) -> Summary(s) -> Comparison
      if (viewMode === 'HOME' || viewMode === 'BOTH') await addSection(inputHomeRef);
      if (viewMode === 'CLASSROOM' || viewMode === 'BOTH') await addSection(inputClassRef);

      if (viewMode === 'HOME' || viewMode === 'BOTH') await addSection(profileHomeRef);
      if (viewMode === 'CLASSROOM' || viewMode === 'BOTH') await addSection(profileClassRef);

      if (viewMode === 'HOME' || viewMode === 'BOTH') await addSection(summaryHomeRef);
      if (viewMode === 'CLASSROOM' || viewMode === 'BOTH') await addSection(summaryClassRef);

      if (viewMode === 'BOTH') await addSection(comparisonRef);

      const safeName = formData.name ? formData.name.replace(/[^a-z0-9]/gi, '_').toLowerCase() : 'relatorio';
      const filename = `SPM_${safeName}_${viewMode}.pdf`;

      pdf.save(filename);
      console.log(`PDF saved as ${filename}`);
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('Erro ao exportar PDF. Verifique o console.');
    }
  };

  const parseDate = (dateStr) => {
    if (!dateStr || dateStr.length !== 10) return null;
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) return null;
    return date;
  };

  const calculateAge = () => {
    const birth = parseDate(formData.birthDate);
    const current = parseDate(formData.date);

    if (!birth || !current) return '';

    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();

    if (months < 0 || (months === 0 && current.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }

    if (current.getDate() < birth.getDate()) {
      months--;
      if (months < 0) {
        months += 12;
      }
    }

    return `${years} anos e ${months} meses`;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-auto px-4 h-10 rounded-lg flex items-center justify-center bg-gray-800 text-white font-bold text-lg shadow-md">
              SPM™-2
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800 leading-tight">Sensory Processing Measure Viewer</h1>
              <p className="text-xs text-gray-500 font-medium">Dayane Crisostomo - Terapeuta Ocupacional</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* View Mode Switcher */}
            <div className="bg-gray-100 p-1 rounded-lg flex text-sm font-medium">
              <button onClick={() => setViewMode('HOME')} className={`px-3 py-1.5 rounded-md transition-all ${viewMode === 'HOME' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}>Casa</button>
              <button onClick={() => setViewMode('CLASSROOM')} className={`px-3 py-1.5 rounded-md transition-all ${viewMode === 'CLASSROOM' ? 'bg-white shadow-sm text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}>Escola</button>
              <button onClick={() => setViewMode('BOTH')} className={`px-3 py-1.5 rounded-md transition-all ${viewMode === 'BOTH' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-500 hover:text-gray-700'}`}>Ambos</button>
            </div>

            <button onClick={handleExportPDF} className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Exportar PDF
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">

          {/* Dados Paciente (Always visible, shared) */}
          <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-2 w-full bg-gray-800"></div>
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Dados Paciente</h2>
              {/* We pass a dummy 'onScoreChange' or just use it for data entry. 
                    Actually, InputForm handles scores AND patient data. 
                    We need to separate them or just use one InputForm for data and hide scores?
                    The current InputForm has both.
                    Refactoring InputForm to separate Data and Scores would be cleaner, but for now I'll just use the HOME one for Data if visible, or render a dedicated Data section.
                    Let's use the HOME InputForm for data entry if available, or just sync data across forms.
                    Actually, I'll pass `formData` to all InputForms, so updating one updates all.
                    But visually, we only want ONE "Dados Paciente" block at the top?
                    The user request:
                    "Dados Paciente"
                    "Escores Brutos (Versão Casa)"
                    "Escores Brutos (Versão Escola)"
                    
                    So I should probably modify InputForm to optionally hide the Data section?
                    Or just render the Data section separately in App.jsx and tell InputForm to only show scores?
                    I'll modify InputForm to accept a prop `showPatientData`.
                */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
                  <input type="text" name="name" value={formData.name} onChange={(e) => handleFormChange({ ...formData, name: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="Nome da Criança" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Data</label>
                  <input type="text" name="date" value={formData.date} onChange={(e) => handleFormChange({ ...formData, date: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="DD/MM/AAAA" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nascimento</label>
                  <input type="text" name="birthDate" value={formData.birthDate} onChange={(e) => handleFormChange({ ...formData, birthDate: e.target.value })} className="w-full px-4 py-2 border border-gray-300 rounded-lg" placeholder="DD/MM/AAAA" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Idade</label>
                  <input type="text" value={calculateAge()} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600" placeholder="Calculada automaticamente" />
                </div>
              </div>
            </div>
          </section>

          {/* Input Forms (Scores) */}
          {(viewMode === 'HOME' || viewMode === 'BOTH') && (
            <section ref={inputHomeRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-2 w-full bg-blue-500"></div>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2 bg-blue-500"></span>
                  Escores Brutos (Versão Casa)
                </h2>
                <InputForm
                  rawScores={scores.HOME}
                  onScoreChange={(cat, val) => handleScoreChange('HOME', cat, val)}
                  formType="HOME"
                  formData={formData}
                  onFormChange={handleFormChange}
                  hidePatientData={true}
                />
              </div>
            </section>
          )}

          {(viewMode === 'CLASSROOM' || viewMode === 'BOTH') && (
            <section ref={inputClassRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-2 w-full bg-orange-500"></div>
              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <span className="w-2 h-2 rounded-full mr-2 bg-orange-500"></span>
                  Escores Brutos (Versão Escola)
                </h2>
                <InputForm
                  rawScores={scores.CLASSROOM}
                  onScoreChange={(cat, val) => handleScoreChange('CLASSROOM', cat, val)}
                  formType="CLASSROOM"
                  formData={formData}
                  onFormChange={handleFormChange}
                  hidePatientData={true}
                />
              </div>
            </section>
          )}

          {/* Profile Sheets */}
          {(viewMode === 'HOME' || viewMode === 'BOTH') && (
            <section ref={profileHomeRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 overflow-x-auto">
                <ProfileSheet
                  rawScores={scores.HOME}
                  tScores={tScoresHome}
                  onCategoryClick={setSelectedCategory}
                  formType="HOME"
                />
              </div>
            </section>
          )}

          {(viewMode === 'CLASSROOM' || viewMode === 'BOTH') && (
            <section ref={profileClassRef} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 overflow-x-auto">
                <ProfileSheet
                  rawScores={scores.CLASSROOM}
                  tScores={tScoresClassroom}
                  onCategoryClick={setSelectedCategory}
                  formType="CLASSROOM"
                />
              </div>
            </section>
          )}

          {/* Summaries */}
          {(viewMode === 'HOME' || viewMode === 'BOTH') && (
            <div ref={summaryHomeRef}>
              <SummaryReport tScores={tScoresHome} title="Resumo Compreensivo (Versão Casa)" />
            </div>
          )}

          {(viewMode === 'CLASSROOM' || viewMode === 'BOTH') && (
            <div ref={summaryClassRef}>
              <SummaryReport tScores={tScoresClassroom} title="Resumo Compreensivo (Versão Escola)" />
            </div>
          )}

          {/* Comparison */}
          {viewMode === 'BOTH' && (
            <div ref={comparisonRef}>
              <ComparisonReport tScoresHome={tScoresHome} tScoresClassroom={tScoresClassroom} />
            </div>
          )}

        </div>
      </main>

      {/* Modal */}
      {selectedCategory && (
        <CategoryDetailModal
          categoryId={selectedCategory}
          tScore={viewMode === 'CLASSROOM' ? tScoresClassroom[selectedCategory] : tScoresHome[selectedCategory]} // Simple fallback, ideally modal handles both or we close it on switch
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
}

export default App;
