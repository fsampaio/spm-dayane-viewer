import React from 'react';
import { SCORING_GRID_HOME, SCORING_GRID_CLASSROOM, CATEGORIES, getInterpretiveRange } from '../utils/scoring';

const ProfileSheet = ({ rawScores, tScores, onCategoryClick, formType = 'HOME' }) => {
    const rows = Array.from({ length: 41 }, (_, i) => 80 - i); // 80 down to 40
    const SCORING_GRID = formType === 'CLASSROOM' ? SCORING_GRID_CLASSROOM : SCORING_GRID_HOME;

    const isScoreInCell = (userRawScore, cellValue) => {
        if (!userRawScore || !cellValue) return false;
        const score = parseInt(userRawScore);
        if (cellValue.includes('-')) {
            const [min, max] = cellValue.split('-').map(Number);
            return score >= min && score <= max;
        }
        return score === parseInt(cellValue);
    };

    return (
        <div className="bg-white p-4 md:p-8 rounded-xl shadow-lg border border-gray-100 overflow-x-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center md:text-left">
                    {formType === 'HOME' ? 'Formulário Casa - Perfil Tabela' : 'Formulário Escola - Perfil Tabela'}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-xs md:text-sm font-medium">
                    <div className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 mr-1 md:mr-2"></span>Típico</div>
                    <div className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-amber-500 mr-1 md:mr-2"></span>Alguns Problemas</div>
                    <div className="flex items-center"><span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500 mr-1 md:mr-2"></span>Disfunção</div>
                </div>
            </div>

            <div className="min-w-[600px] w-full">
                {/* Header */}
                <div className="grid grid-cols-[repeat(8,1fr)_40px] md:grid-cols-[repeat(8,1fr)_60px] gap-1 md:gap-2 border-b-2 border-gray-800 pb-2 md:pb-4 mb-2 md:mb-4 text-center font-bold text-xs md:text-base">
                    {CATEGORIES.map(cat => (
                        <div
                            key={cat.id}
                            className="cursor-pointer hover:text-blue-600 transition-colors"
                            onClick={() => onCategoryClick(cat.id)}
                            title={cat.name}
                        >
                            {cat.id}
                        </div>
                    ))}
                    <div>T</div>
                </div>

                {/* Rows */}
                {rows.map(t => {
                    const isMajorLine = t % 10 === 0 && t !== 50 && t !== 80; // Bold line every 10, except 50 and 80
                    const isInterpretiveLine = t === 60 || t === 70; // Range boundaries
                    const rowData = SCORING_GRID[t] || {};

                    // Determine background color based on range
                    let rowBgClass = 'hover:bg-gray-50'; // Default hover
                    if (t >= 70 && t <= 80) rowBgClass = 'bg-red-50 hover:bg-red-100';
                    else if (t >= 60 && t <= 69) rowBgClass = 'bg-amber-50 hover:bg-amber-100';
                    else if (t >= 40 && t <= 59) rowBgClass = 'bg-green-50 hover:bg-green-100';

                    return (
                        <div
                            key={t}
                            className={`grid grid-cols-[repeat(8,1fr)_40px] md:grid-cols-[repeat(8,1fr)_60px] gap-1 md:gap-2 text-center text-[10px] md:text-sm items-center py-0.5 md:py-1 ${rowBgClass}
                ${isMajorLine ? 'border-b border-gray-400' : ''}
                ${isInterpretiveLine ? 'border-b-2 border-black' : ''}
              `}
                        >
                            {CATEGORIES.map(cat => {
                                const cellValue = rowData[cat.id];
                                const userRawScore = rawScores[cat.id];
                                const isMatch = isScoreInCell(userRawScore, cellValue);
                                const range = getInterpretiveRange(t); // Color based on T-Score row

                                return (
                                    <div key={cat.id} className="relative h-6 md:h-8 flex items-center justify-center">
                                        {/* The Cell Value (Raw Score Range) */}
                                        <span className={`relative z-20 ${isMatch ? 'font-bold text-black' : 'text-gray-500'}`}>
                                            {cellValue || '-'}
                                        </span>

                                        {/* Circle Highlight if Match */}
                                        {isMatch && (
                                            <div
                                                className="absolute inset-0 m-auto w-6 h-6 md:w-10 md:h-8 rounded-full border-2 flex items-center justify-center z-10 pointer-events-none shadow-sm bg-white bg-opacity-20"
                                                style={{ borderColor: range.color }}
                                            >
                                            </div>
                                        )}
                                    </div>
                                );
                            })}

                            <div className="font-bold text-gray-700">{t}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileSheet;
