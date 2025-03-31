export default function parse(element, { document }) {
  // Extract relevant content dynamically from the input element
  const headerList = element.querySelector('.article-header-list');
  const headerText = headerList ? headerList.textContent.trim() : '';

  const titleElement = element.querySelector('.article-title');
  const titleText = titleElement ? titleElement.textContent.trim() : '';

  const descriptionElement = element.querySelector('.article-subtitle + p');
  const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';

  // Build the new structured table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Video';

  const contentRow = [document.createElement('div')];
  const contentDiv = contentRow[0];

  // Append extracted content dynamically
  if (headerText) {
    const headerParagraph = document.createElement('p');
    headerParagraph.textContent = headerText;
    contentDiv.appendChild(headerParagraph);
  }

  if (titleText) {
    const title = document.createElement('h3');
    title.textContent = titleText;
    contentDiv.appendChild(title);
  }

  if (descriptionText) {
    const description = document.createElement('p');
    description.textContent = descriptionText;
    contentDiv.appendChild(description);
  }

  const cells = [headerRow, [contentDiv]];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}