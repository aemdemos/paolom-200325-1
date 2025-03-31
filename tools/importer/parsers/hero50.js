export default function parse(element, { document }) {
  // Check if image exists and dynamically extract it
  const imageElem = element.querySelector('img');
  let image = null;
  if (imageElem) {
    image = document.createElement('img');
    image.src = imageElem.src;
    image.alt = imageElem.alt || '';
  }

  // Extract headline dynamically and ensure it's not empty
  const headlineElem = element.querySelector('h3');
  let headline = null;
  if (headlineElem && headlineElem.textContent.trim()) {
    headline = document.createElement('h1');
    headline.textContent = headlineElem.textContent.trim();
  }

  // Prepare table data, ensuring proper structure and dynamic content
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  const contentRow = [];
  if (image) contentRow.push(image);
  if (headline) contentRow.push(headline);

  const cells = [headerRow, contentRow];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}