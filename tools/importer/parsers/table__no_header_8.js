export default function parse(element, { document }) {
  // Define the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Table (no header)';
  const headerRow = [headerCell.textContent]; // Use plain text for the header row

  // Extract content dynamically from the element
  const anchor = element.querySelector('a');
  const anchorText = anchor ? anchor.textContent.trim() : 'No content';

  // Handle edge case: Empty or missing anchor element
  const dataRows = anchorText ? [[anchorText]] : [['No content available']];

  // Combine header and data rows
  const cells = [headerRow, ...dataRows];

  // Generate the table using the helper function
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(tableBlock);
}