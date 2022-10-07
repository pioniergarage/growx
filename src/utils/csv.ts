type CSVData = string | number;

function createCSV(header: string[], data: CSVData[][], separator = ',') {
    return (
        [
            header.join(separator),
            data.map((row) => row.join(separator)).join('\n'),
        ].join('\n') + '\n'
    );
}

export function downloadCSV(
    header: string[],
    data: CSVData[][],
    filename: string
) {
    const csv = createCSV(header, data);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = filename;
    hiddenElement.click();
}
