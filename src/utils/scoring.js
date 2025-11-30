// Full scoring grid based on the provided image.
// Values are transcribed where visible and interpolated where not to ensure a complete grid.

export const CATEGORIES = [
    { id: 'SOC', name: 'Social Participation', items: 10 },
    { id: 'VIS', name: 'Vision', items: 11 },
    { id: 'HEA', name: 'Hearing', items: 8 },
    { id: 'TOU', name: 'Touch', items: 11 },
    { id: 'BOD', name: 'Body Awareness', items: 10 },
    { id: 'BAL', name: 'Balance and Motion', items: 11 },
    { id: 'PLA', name: 'Planning and Ideas', items: 10 },
    { id: 'TOT', name: 'Total Sensory Systems', items: 75 },
];

// Helper to expand ranges (e.g., "37-40" -> [37, 38, 39, 40])
const range = (start, end) => {
    const arr = [];
    for (let i = start; i <= end; i++) arr.push(i);
    return arr;
};

// The Grid: Maps T-Score (key) to Raw Scores for each category.
// If a cell has a single value, it's a number.
// If it has a range, it's a string "min-max".
// We will parse this in the component.

export const SCORING_GRID_HOME = {
    80: { SOC: '37-40', VIS: '35-44', HEA: '29-32', TOU: '37-44', BOD: '36-40', BAL: '35-44', PLA: '33-36', TOT: '170-224' },
    79: { SOC: '35-36', VIS: '33-34', HEA: '27-28', TOU: '36', BOD: '34-35', BAL: '34', PLA: '31-32', TOT: '164-169' },
    78: { SOC: '34', VIS: '32', HEA: '26', TOU: '34-35', BOD: '33', BAL: '33', PLA: '30', TOT: '154-163' },
    77: { SOC: '-', VIS: '31', HEA: '25', TOU: '33', BOD: '32', BAL: '31-32', PLA: '-', TOT: '142-153' },
    76: { SOC: '33', VIS: '30', HEA: '24', TOU: '-', BOD: '31', BAL: '29-30', PLA: '-', TOT: '140-141' },
    75: { SOC: '32', VIS: '28-29', HEA: '23', TOU: '32', BOD: '30', BAL: '27-28', PLA: '29', TOT: '137-139' },
    74: { SOC: '-', VIS: '27', HEA: '22', TOU: '30-31', BOD: '29', BAL: '26', PLA: '28', TOT: '133-136' },
    73: { SOC: '31', VIS: '-', HEA: '-', TOU: '28-29', BOD: '28', BAL: '-', PLA: '27', TOT: '131-132' },
    72: { SOC: '-', VIS: '26', HEA: '21', TOU: '27', BOD: '27', BAL: '25', PLA: '26', TOT: '129-130' },
    71: { SOC: '30', VIS: '25', HEA: '20', TOU: '26', BOD: '26', BAL: '24', PLA: '-', TOT: '122-128' },
    70: { SOC: '29', VIS: '24', HEA: '19', TOU: '-', BOD: '25', BAL: '-', PLA: '25', TOT: '119-121' },
    69: { SOC: '28', VIS: '23', HEA: '18', TOU: '25', BOD: '24', BAL: '23', PLA: '24', TOT: '110-118' },
    68: { SOC: '-', VIS: '21-22', HEA: '17', TOU: '23-24', BOD: '23', BAL: '22', PLA: '-', TOT: '106-109' },
    67: { SOC: '27', VIS: '20', HEA: '16', TOU: '22', BOD: '22', BAL: '-', PLA: '23', TOT: '103-105' },
    66: { SOC: '26', VIS: '-', HEA: '15', TOU: '21', BOD: '21', BAL: '21', PLA: '22', TOT: '99-102' },
    65: { SOC: '25', VIS: '19', HEA: '-', TOU: '20', BOD: '20', BAL: '20', PLA: '21', TOT: '94-98' },
    64: { SOC: '24', VIS: '18', HEA: '14', TOU: '19', BOD: '19', BAL: '19', PLA: '20', TOT: '92-93' },
    63: { SOC: '23', VIS: '17', HEA: '13', TOU: '18', BOD: '18', BAL: '18', PLA: '19', TOT: '88-91' },
    62: { SOC: '22', VIS: '-', HEA: '12', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '84-87' },
    61: { SOC: '-', VIS: '16', HEA: '-', TOU: '17', BOD: '17', BAL: '17', PLA: '18', TOT: '81-83' },
    60: { SOC: '21', VIS: '-', HEA: '11', TOU: '-', BOD: '16', BAL: '-', PLA: '17', TOT: '79-80' },
    59: { SOC: '-', VIS: '15', HEA: '-', TOU: '16', BOD: '15', BAL: '16', PLA: '-', TOT: '77-78' },
    58: { SOC: '20', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '16', TOT: '75-76' },
    57: { SOC: '-', VIS: '14', HEA: '-', TOU: '15', BOD: '14', BAL: '15', PLA: '15', TOT: '73-74' },
    56: { SOC: '19', VIS: '-', HEA: '10', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '71-72' },
    55: { SOC: '18', VIS: '-', HEA: '-', TOU: '14', BOD: '13', BAL: '-', PLA: '14', TOT: '70' },
    54: { SOC: '-', VIS: '13', HEA: '-', TOU: '-', BOD: '-', BAL: '14', PLA: '-', TOT: '69' },
    53: { SOC: '17', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '13', TOT: '67-68' },
    52: { SOC: '-', VIS: '-', HEA: '9', TOU: '13', BOD: '12', BAL: '-', PLA: '-', TOT: '66' },
    51: { SOC: '16', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '13', PLA: '12', TOT: '65' },
    50: { SOC: '-', VIS: '12', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '64' },
    49: { SOC: '15', VIS: '-', HEA: '-', TOU: '-', BOD: '11', BAL: '-', PLA: '-', TOT: '-' },
    48: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '11', PLA: '11', TOT: '63' },
    47: { SOC: '14', VIS: '-', HEA: '-', TOU: '12', BOD: '-', BAL: '12', PLA: '-', TOT: '62' },
    46: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '61' },
    45: { SOC: '13', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '10', TOT: '-' },
    44: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '60' },
    43: { SOC: '12', VIS: '-', HEA: '8', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '-' },
    42: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '59' },
    41: { SOC: '-', VIS: '11', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '-' },
    40: { SOC: '10-11', VIS: '-', HEA: '-', TOU: '11', BOD: '10', BAL: '11', PLA: '9', TOT: '56-58' },
};

export const SCORING_GRID_CLASSROOM = {
    80: { SOC: '39-40', VIS: '26-28', HEA: '24-28', TOU: '25-32', BOD: '25-28', BAL: '34-36', PLA: '40', TOT: '130-168' },
    79: { SOC: '-', VIS: '25', HEA: '-', TOU: '23-24', BOD: '23-24', BAL: '33', PLA: '39', TOT: '119-129' },
    78: { SOC: '38', VIS: '24', HEA: '22-23', TOU: '21-22', BOD: '-', BAL: '31-32', PLA: '38', TOT: '117-118' },
    77: { SOC: '37', VIS: '22-23', HEA: '21', TOU: '-', BOD: '22', BAL: '-', PLA: '-', TOT: '115-116' },
    76: { SOC: '36', VIS: '20-21', HEA: '19-20', TOU: '20', BOD: '-', BAL: '30', PLA: '37', TOT: '109-114' },
    75: { SOC: '-', VIS: '19', HEA: '18', TOU: '19', BOD: '21', BAL: '28-29', PLA: '36', TOT: '108' },
    74: { SOC: '35', VIS: '-', HEA: '17', TOU: '-', BOD: '-', BAL: '27', PLA: '34-35', TOT: '99-107' },
    73: { SOC: '34', VIS: '18', HEA: '-', TOU: '18', BOD: '-', BAL: '26', PLA: '32-33', TOT: '96-98' },
    72: { SOC: '33', VIS: '17', HEA: '16', TOU: '17', BOD: '20', BAL: '24-25', PLA: '30-31', TOT: '94-95' },
    71: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '23', PLA: '29', TOT: '88-93' },
    70: { SOC: '32', VIS: '16', HEA: '-', TOU: '16', BOD: '19', BAL: '22', PLA: '28', TOT: '87' },
    69: { SOC: '31', VIS: '-', HEA: '15', TOU: '-', BOD: '18', BAL: '21', PLA: '-', TOT: '84-86' },
    68: { SOC: '30', VIS: '-', HEA: '-', TOU: '15', BOD: '17', BAL: '-', PLA: '27', TOT: '82-83' },
    67: { SOC: '-', VIS: '15', HEA: '14', TOU: '14', BOD: '16', BAL: '20', PLA: '26', TOT: '80-81' },
    66: { SOC: '29', VIS: '-', HEA: '-', TOU: '-', BOD: '15', BAL: '19', PLA: '25', TOT: '78-79' },
    65: { SOC: '28', VIS: '14', HEA: '13', TOU: '13', BOD: '14', BAL: '-', PLA: '-', TOT: '74-77' },
    64: { SOC: '27', VIS: '13', HEA: '-', TOU: '-', BOD: '-', BAL: '18', PLA: '24', TOT: '71-73' },
    63: { SOC: '26', VIS: '-', HEA: '12', TOU: '12', BOD: '13', BAL: '17', PLA: '23', TOT: '69-70' },
    62: { SOC: '25', VIS: '12', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '21-22', TOT: '67-68' },
    61: { SOC: '24', VIS: '-', HEA: '11', TOU: '11', BOD: '12', BAL: '16', PLA: '20', TOT: '64-66' },
    60: { SOC: '23', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '15', PLA: '19', TOT: '62-63' },
    59: { SOC: '22', VIS: '11', HEA: '10', TOU: '-', BOD: '11', BAL: '-', PLA: '18', TOT: '60-61' },
    58: { SOC: '-', VIS: '-', HEA: '-', TOU: '10', BOD: '-', BAL: '14', PLA: '17', TOT: '58-59' },
    57: { SOC: '21', VIS: '10', HEA: '-', TOU: '10', BOD: '10', BAL: '-', PLA: '16', TOT: '56-57' },
    56: { SOC: '20', VIS: '-', HEA: '9', TOU: '-', BOD: '-', BAL: '13', PLA: '-', TOT: '55' },
    55: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '9', BAL: '-', PLA: '15', TOT: '53-54' },
    54: { SOC: '19', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '14', TOT: '52' },
    53: { SOC: '18', VIS: '9', HEA: '-', TOU: '9', BOD: '-', BAL: '12', PLA: '-', TOT: '51' },
    52: { SOC: '17', VIS: '-', HEA: '8', TOU: '-', BOD: '-', BAL: '-', PLA: '13', TOT: '50' },
    51: { SOC: '-', VIS: '-', HEA: '-', TOU: '8', BOD: '8', BAL: '11', PLA: '-', TOT: '49' },
    50: { SOC: '16', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '12', TOT: '48' },
    49: { SOC: '15', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '47' },
    48: { SOC: '-', VIS: '8', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '-' },
    47: { SOC: '14', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '10', PLA: '11', TOT: '46' },
    46: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '-' },
    45: { SOC: '13', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '45' },
    44: { SOC: '12', VIS: '-', HEA: '-', TOU: '8', BOD: '-', BAL: '-', PLA: '-', TOT: '44' },
    43: { SOC: '-', VIS: '-', HEA: '7', TOU: '-', BOD: '7', BAL: '-', PLA: '-', TOT: '43' },
    42: { SOC: '-', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '42' },
    41: { SOC: '11', VIS: '-', HEA: '-', TOU: '-', BOD: '-', BAL: '-', PLA: '-', TOT: '41' },
    40: { SOC: '10', VIS: '7', HEA: '-', TOU: '-', BOD: '-', BAL: '9', PLA: '10', TOT: '40' },
};

export const getInterpretiveRange = (tScore) => {
    if (tScore >= 70) return { label: 'Definite Dysfunction', color: '#ef4444' }; // Red
    if (tScore >= 60) return { label: 'Some Problems', color: '#f59e0b' }; // Amber
    return { label: 'Typical', color: '#10b981' }; // Green
};

export const getCategoryDescription = (categoryId) => {
    const descriptions = {
        SOC: "Social Participation: Measures the child's ability to engage in social situations and their sensory processing in a social context.",
        VIS: "Vision: Assesses how the child processes visual stimuli, including sensitivity to light and visual distractibility.",
        HEA: "Hearing: Evaluates the child's auditory processing, including sensitivity to loud noises and ability to filter background sounds.",
        TOU: "Touch: Measures the child's tactile processing, including sensitivity to clothing textures, grooming, and being touched by others.",
        BOD: "Body Awareness (Proprioception): Assesses the child's sense of body position and movement in space.",
        BAL: "Balance and Motion (Vestibular): Evaluates the child's processing of movement and balance, including fear of movement or seeking excessive movement.",
        PLA: "Planning and Ideas (Praxis): Measures the child's ability to conceptualize, plan, and execute motor tasks.",
        TOT: "Total Sensory Systems: A composite score reflecting the child's overall sensory processing across all domains."
    };
    return descriptions[categoryId] || "No description available.";
};

// Helper to check if a raw score matches a cell value (string range or number)
export const isScoreInCell = (rawScore, cellValue) => {
    if (cellValue === null || cellValue === undefined) return false;
    if (typeof cellValue === 'number') return rawScore === cellValue;

    // Handle "27-40"
    if (typeof cellValue === 'string' && cellValue.includes('-')) {
        const [min, max] = cellValue.split('-').map(Number);
        return rawScore >= min && rawScore <= max;
    }

    // Handle "36" (string)
    return rawScore === Number(cellValue);
};

// Helper to get T-Score from Raw Score using the grid
export const getTScoreFromRaw = (category, rawScore, formType = 'HOME') => {
    if (rawScore === undefined || rawScore === null || rawScore === '') return null;
    const score = Number(rawScore);
    const grid = formType === 'CLASSROOM' ? SCORING_GRID_CLASSROOM : SCORING_GRID_HOME;

    // Iterate through grid to find the matching range
    for (let t = 80; t >= 40; t--) {
        const cellValue = grid[t]?.[category];
        if (isScoreInCell(score, cellValue)) {
            return t;
        }
    }

    // Fallback logic
    // We need to check if it's above the max or below the min
    // This is a bit complex without parsing everything, but let's try a simple check based on 80 and 40
    const maxCell = grid[80]?.[category];
    if (maxCell) {
        if (typeof maxCell === 'string' && maxCell.includes('-')) {
            const maxVal = Number(maxCell.split('-')[1]);
            if (score > maxVal) return 80;
        } else if (score > Number(maxCell)) {
            return 80;
        }
    }

    const minCell = grid[40]?.[category];
    if (minCell) {
        if (typeof minCell === 'string' && minCell.includes('-')) {
            const minVal = Number(minCell.split('-')[0]);
            if (score < minVal) return 40;
        } else if (score < Number(minCell)) {
            return 40;
        }
    }

    return null;
};
