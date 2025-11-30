import React from 'react';
import { CATEGORIES, getInterpretiveRange } from '../utils/scoring';

const ComparisonReport = ({ tScoresHome, tScoresClassroom }) => {
    // Map category IDs to Portuguese names
    const categoryNamesPT = {
        SOC: 'Participação Social',
        VIS: 'Visão',
        HEA: 'Audição',
        TOU: 'Tato',
        BOD: 'Consciência Corporal',
        BAL: 'Equilíbrio e Movimento',
        PLA: 'Planejamento e Ideias',
        TOT: 'Sistemas Sensoriais Totais'
    };

    // Calculate differences
    const comparisons = CATEGORIES.map(cat => {
        const homeScore = tScoresHome[cat.id];
        const classScore = tScoresClassroom[cat.id];

        // Only compare if both scores exist
        if (!homeScore || !classScore) return null;

        const diff = Math.abs(homeScore - classScore);
        const significant = diff >= 10; // Arbitrary threshold for significance, can be adjusted

        return {
            ...cat,
            homeScore,
            classScore,
            diff,
            significant,
            namePT: categoryNamesPT[cat.id]
        };
    }).filter(Boolean);

    if (comparisons.length === 0) return null;

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                Comparativo: Casa vs. Escola
            </h2>

            <p className="text-gray-600 mb-6">
                Esta tabela compara os escores T obtidos nos ambientes de Casa e Escola.
                Diferenças significativas (maiores que 10 pontos) podem indicar que o processamento sensorial da criança
                varia dependendo do contexto ambiental.
            </p>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Escore Casa</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Escore Escola</th>
                            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Diferença</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {comparisons.map(item => {
                            const homeRange = getInterpretiveRange(item.homeScore);
                            const classRange = getInterpretiveRange(item.classScore);

                            return (
                                <tr key={item.id} className={item.significant ? 'bg-yellow-50' : ''}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {item.namePT} ({item.id})
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        <span className="px-2 py-1 rounded-full text-white font-bold" style={{ backgroundColor: homeRange.color }}>
                                            {item.homeScore}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                                        <span className="px-2 py-1 rounded-full text-white font-bold" style={{ backgroundColor: classRange.color }}>
                                            {item.classScore}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                                        {item.diff} {item.significant && <span className="ml-2 text-amber-600 font-bold">⚠️</span>}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ComparisonReport;
