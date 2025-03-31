export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cells.push(headerRow);

  // Extract data dynamically
  const imageElement = element.querySelector('.article-thumbnail img');
  const image = imageElement ? document.createElement('img') : null;
  if (image) {
    image.src = imageElement.src;
    image.alt = imageElement.alt;
    image.title = imageElement.title;
  }

  const titleElement = element.querySelector('.article-key .hyb');
  const title = titleElement ? document.createElement('strong') : null;
  if (title) {
    title.textContent = titleElement.textContent;
  }

  const descriptionElement = element.querySelector('.article-key .hyb');
  const description = document.createElement('p');
  description.textContent = descriptionElement ? descriptionElement.textContent : '';

  // Create content row dynamically
  const contentRow = [image, [title, description]];
  cells.push(contentRow);

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}