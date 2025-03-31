export default function parse(element, { document }) {
  const blockName = document.createElement('strong');
  blockName.textContent = 'Cards';

  const rows = [[blockName]]; // Header row

  const imageElement = element.querySelector('.article-thumbnail img');
  const textContentList = element.querySelectorAll('.article-key-list .article-key-item');

  // Ensure dynamic extraction of image attributes
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
    image.title = imageElement.title;
  }

  // Handle edge cases for textContent
  const textContent = document.createElement('div');
  if (textContentList.length > 0) {
    textContent.append(...textContentList);
  } else {
    textContent.textContent = 'No content available';
  }

  rows.push([image, textContent]);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}