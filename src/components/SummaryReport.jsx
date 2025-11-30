import React from 'react';
import { CATEGORIES, getInterpretiveRange } from '../utils/scoring';

const SummaryReport = ({ tScores, title }) => {
    const dysfunction = [];
    const someProblems = [];
    const typical = [];

    // Map category IDs to Portuguese names for the report
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

    CATEGORIES.forEach(cat => {
        const score = tScores[cat.id];
        const range = getInterpretiveRange(score);
        const item = { ...cat, score, label: range.label, namePT: categoryNamesPT[cat.id] };

        if (range.label === 'Definite Dysfunction') dysfunction.push(item);
        else if (range.label === 'Some Problems') someProblems.push(item);
        else typical.push(item);
    });

    return (
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 mt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">{title || 'Resumo Compreensivo do Perfil Sensorial'}</h2>

            <div className="space-y-6">
                <p className="text-gray-600 italic mb-4">
                    Este relatório resume o desempenho sensorial da criança com base nos escores brutos fornecidos.
                    A interpretação é categorizada em três níveis: Disfunção Definida, Alguns Problemas e Típico.
                </p>

                {dysfunction.length > 0 && (
                    <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-r-lg shadow-sm">
                        <h3 className="font-bold text-lg text-red-800 mb-3 flex items-center">
                            <span className="mr-2">⚠️</span> Disfunção Definida (Escores 70-80)
                        </h3>
                        <p className="mb-3 text-red-700">
                            As áreas listadas abaixo apresentam escores na faixa de <strong>Disfunção Definida</strong>.
                            Isso indica que os comportamentos sensoriais nestas áreas são frequentes e provavelmente têm um impacto significativo
                            na participação diária, aprendizado e interações sociais da criança. Recomenda-se uma avaliação aprofundada e intervenção terapêutica focada.
                        </p>
                        <ul className="list-disc list-inside text-red-800 font-medium space-y-1 ml-2">
                            {dysfunction.map(item => (
                                <li key={item.id}>
                                    <span className="font-bold">{item.namePT} ({item.id})</span> — T-Score: {item.score}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {someProblems.length > 0 && (
                    <div className="p-6 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg shadow-sm">
                        <h3 className="font-bold text-lg text-amber-800 mb-3 flex items-center">
                            <span className="mr-2">⚠️</span> Alguns Problemas (Escores 60-69)
                        </h3>
                        <p className="mb-3 text-amber-700">
                            As áreas a seguir caem na faixa de <strong>Alguns Problemas</strong>.
                            Isso sugere que a criança pode estar em risco de dificuldades de processamento sensorial.
                            Embora não tão severos quanto a faixa de disfunção, esses comportamentos devem ser monitorados de perto
                            para evitar que interfiram no desempenho funcional. Estratégias preventivas podem ser benéficas.
                        </p>
                        <ul className="list-disc list-inside text-amber-800 font-medium space-y-1 ml-2">
                            {someProblems.map(item => (
                                <li key={item.id}>
                                    <span className="font-bold">{item.namePT} ({item.id})</span> — T-Score: {item.score}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {typical.length > 0 && (
                    <div className="p-6 bg-green-50 border-l-4 border-green-500 rounded-r-lg shadow-sm">
                        <h3 className="font-bold text-lg text-green-800 mb-3 flex items-center">
                            <span className="mr-2">✅</span> Desempenho Típico (Escores 40-59)
                        </h3>
                        <p className="mb-3 text-green-700">
                            As áreas abaixo estão dentro da faixa de <strong>Desempenho Típico</strong>.
                            Isso indica que a criança processa informações sensoriais nestes domínios de maneira comparável à maioria das crianças de sua idade,
                            sem evidências de dificuldades significativas que impactem a função.
                        </p>
                        <p className="text-green-800 font-medium ml-2">
                            Áreas Típicas: {typical.map(i => i.namePT).join(', ')}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryReport;
