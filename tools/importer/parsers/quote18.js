export default function parse(element, { document }) {
  // Create the header row for the block type
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Safely extract the content from the provided HTML element
  const titleElement = element.querySelector('h3.article-title');
  const descriptionElement = element.querySelector('div');

  const title = titleElement ? titleElement.textContent.trim() : '';
  const description = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Combine the extracted content into a single cell for the second row
  const secondRowContent = `${title}\n\n${description}`.trim();

  // Create the table rows dynamically
  const rows = [
    headerRow,
    [secondRowContent],
  ];

  // Create the block table dynamically
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element safely with the new block table
  element.replaceWith(block);
}