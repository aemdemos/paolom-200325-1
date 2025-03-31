export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Table (no header)';

  const dataRows = [
    ['Micky Mouse'],
    ['Daisy'],
    ['Donald Duck'],
    ['Pluto'],
    ['Goofy'],
    ['Ariel'],
  ];

  const cells = [headerRow, ...dataRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}