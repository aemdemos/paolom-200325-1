export default function parse(element, { document }) {
  // Validate critical review items:
  // 1. Extract relevant content dynamically, instead of hardcoding.
  // 2. Avoid markdown formatting; create proper HTML elements.
  // 3. Ensure headers and table structure match the example.
  // 4. Handle edge cases for empty or missing elements.

  // Header row for the block, matches example header "Quote"
  const blockNameHeader = document.createElement('strong');
  blockNameHeader.textContent = 'Quote';

  // Dynamically extract text content from the article title
  const titleElement = element.querySelector('.article-title');
  const content = titleElement ? titleElement.textContent.trim() : 'No title available';

  // Create the table structure dynamically
  const tableData = [
    [blockNameHeader], // Header row: Block name
    [content],         // Quote content row: Extracted dynamically
  ];

  // Create the block table from the structured data
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(blockTable);
}