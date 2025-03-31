export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Carousel';

  const contentRows = [];

  // Extract image
  const thumbnailDiv = element.querySelector('.article-thumbnail img');
  let imageElement;
  if (thumbnailDiv) {
    imageElement = document.createElement('img');
    imageElement.src = thumbnailDiv.src;
    imageElement.alt = thumbnailDiv.alt || '';
  } else {
    imageElement = document.createElement('p');
    imageElement.textContent = 'No image available';
  }

  // Extract title and description
  const articleKeyDiv = element.querySelector('.article-key');
  let textContent = '';
  if (articleKeyDiv) {
    const link = articleKeyDiv.querySelector('a');
    if (link) {
      textContent = link.textContent;
    }
  }

  const textCellContent = document.createElement('div');
  if (textContent) {
    const titleElement = document.createElement('h2');
    titleElement.textContent = textContent;
    textCellContent.appendChild(titleElement);
  } else {
    textCellContent.textContent = 'No text content available';
  }

  // Add the content row
  contentRows.push([imageElement, textCellContent]);

  // Combine header and content rows
  const tableData = [headerRow, ...contentRows];

  // Create the table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(blockTable);
}