export default function parse(element, { document }) {
    // Helper function to create columns block
    const createColumnsBlock = () => {
        const headerRow = [document.createElement('strong')];
        headerRow[0].textContent = 'Columns';

        // Extract image dynamically
        const image = element.querySelector('.article-thumbnail img');
        const imageCell = document.createElement('img');
        if (image) {
            imageCell.src = image.src;
            imageCell.alt = image.alt;
        } else {
            imageCell.alt = 'Image not available';
        }

        // Extract text dynamically
        const link = element.querySelector('.article-key-list .dat');
        const textCell = document.createElement('span');
        if (link) {
            textCell.textContent = link.textContent;
        } else {
            textCell.textContent = 'Data not available';
        }

        const tableCells = [
            headerRow,
            [imageCell, textCell]
        ];

        return WebImporter.DOMUtils.createTable(tableCells, document);
    };

    const columnsBlock = createColumnsBlock();

    // Replace original element with the new block
    element.replaceWith(columnsBlock);
}