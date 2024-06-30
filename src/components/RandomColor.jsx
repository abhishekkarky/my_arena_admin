const colorList = [
    '#F59E0B',
    '#22C55E',
    '#10B981',
    '#14B8A6',
    '#06B6D4',
    '#6D82B0',
    '#FC8086',
];

const getRandomColorFromList = () => {
    return colorList[Math.floor(Math.random() * colorList.length)];
};

module.exports = getRandomColorFromList;