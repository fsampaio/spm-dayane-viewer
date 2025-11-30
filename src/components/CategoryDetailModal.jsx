import React from 'react';
import { getCategoryDescription, getInterpretiveRange } from '../utils/scoring';

const CategoryDetailModal = ({ categoryId, tScore, onClose }) => {
    if (!categoryId) return null;

    const description = getCategoryDescription(categoryId);
    const range = getInterpretiveRange(tScore);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-fade-in-up">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">{categoryId} Details</h3>

                <div className="mb-6">
                    <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Score Interpretation</div>
                    <div className="flex items-center space-x-2">
                        <span className="text-4xl font-bold" style={{ color: range.color }}>{tScore}</span>
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100" style={{ color: range.color }}>
                            {range.label}
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-1">Description</div>
                    <p className="text-gray-700 leading-relaxed">{description}</p>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CategoryDetailModal;
