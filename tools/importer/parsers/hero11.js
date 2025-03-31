export default function parse(element, { document }) {
  // Extract content from the element
  const listItem = element.querySelector('.article-header-list-item');
  const titleElement = element.querySelector('.article-title');
  const subtitleWrapper = element.querySelector('.article-subtitle');
  const subtitleDiv = element.querySelector('header > div');

  // Validate extracted elements, handle missing data
  const listText = listItem ? listItem.textContent.trim() : '';
  const title = titleElement ? titleElement.textContent.trim() : '';
  const subtitle = subtitleWrapper ? subtitleWrapper.textContent.trim() : '';
  const description = subtitleDiv ? subtitleDiv.textContent.trim() : '';

  // Create block header
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  // Create content cell
  const contentCell = document.createElement('div');

  // Add extracted content into the content cell conditionally
  const elementsToAppend = [];

  if (listText) {
    const listElement = document.createElement('p');
    listElement.textContent = listText;
    elementsToAppend.push(listElement);
  }

  if (title) {
    const titleHeader = document.createElement('h1');
    titleHeader.textContent = title;
    elementsToAppend.push(titleHeader);
  }

  if (description) {
    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description;
    elementsToAppend.push(descriptionElement);
  }

  // Combine extracted elements
  contentCell.append(...elementsToAppend);

  // Create the table
  const cells = [
    headerRow, // Header row
    [contentCell] // Content cell row
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}