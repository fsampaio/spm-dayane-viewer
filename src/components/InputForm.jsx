import React from 'react';
import { CATEGORIES } from '../utils/scoring';

const InputForm = ({ rawScores, onScoreChange, formType, formData, onFormChange, hidePatientData = false }) => {
    const handleChange = (id, value) => {
        onScoreChange(id, parseInt(value) || 0);
    };

    // Helper to format date as DD/MM/YYYY
    const formatDateString = (value) => {
        const numbers = value.replace(/\D/g, '');
        if (numbers.length <= 2) return numbers;
        if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
        return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4, 8)}`;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'date' || name === 'birthDate') {
            newValue = formatDateString(value);
        }

        onFormChange({
            ...formData,
            [name]: newValue
        });
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
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6">
            {!hidePatientData && (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6 pb-6 border-b border-gray-100">
                    <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-600 mb-1">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Nome da Criança"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Data da Avaliação</label>
                        <input
                            type="text"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            maxLength={10}
                            placeholder="DD/MM/AAAA"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Data de Nascimento</label>
                        <input
                            type="text"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            maxLength={10}
                            placeholder="DD/MM/AAAA"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Idade</label>
                        <input
                            type="text"
                            value={calculateAge()}
                            readOnly
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                            placeholder="Calculada automaticamente"
                        />
                    </div>
                </div>
            )}

            <h2 className="text-lg font-bold mb-4 text-gray-800">Escores Brutos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                {CATEGORIES.map((category) => (
                    <div key={category.id} className="flex flex-col">
                        <label htmlFor={category.id} className="text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">
                            {category.id}
                        </label>
                        <div className="relative">
                            <input
                                type="number"
                                id={category.id}
                                value={rawScores[category.id] || ''}
                                onChange={(e) => handleChange(category.id, e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center font-bold text-lg"
                                placeholder="0"
                            />
                            <div className="text-[10px] text-gray-400 text-center mt-1">
                                Max: {category.id === 'TOT' ? 300 : category.items * 4}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InputForm;
