export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract paragraphs
  const paragraphs = Array.from(element.querySelectorAll('p')).map((p) => p.cloneNode(true));

  // Extract image with link
  const imageLinks = Array.from(element.querySelectorAll('a > img')).map((img) => {
    const link = img.closest('a');
    return link.cloneNode(true);
  });

  // Extract heading
  const headings = Array.from(element.querySelectorAll('h3')).map((h) => h.cloneNode(true));

  // Create header row dynamically
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Prepare content rows
  const contentRow1 = [
    [paragraphs[0], paragraphs[1]], // First two paragraphs in the first cell
    imageLinks.length > 0 ? imageLinks[0] : document.createTextNode('No image available') // Handle missing images
  ];
  const contentRow2 = [
    headings.length > 0 ? headings[0] : document.createTextNode('No heading available'), // Handle missing heading
    paragraphs.slice(2).map((p) => p) // Remaining paragraphs in second cell
  ];

  const cells = [
    headerRow,
    contentRow1,
    contentRow2
  ];

  // Create table and replace
  const table = createTable(cells, document);
  element.replaceWith(table);
}
