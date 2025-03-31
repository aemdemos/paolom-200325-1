export default function parse(element, { document }) {
  // Validate and extract the image
  const thumbnailDiv = element.querySelector('.article-thumbnail');
  const img = thumbnailDiv ? thumbnailDiv.querySelector('img') : null;
  let imageElement;
  if (img) {
    imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt || '';
    imageElement.title = img.title || '';
  } else {
    imageElement = document.createElement('div');
    imageElement.textContent = 'Image missing';
  }

  // Validate and extract the headline text
  const articleKeyDiv = element.querySelector('.article-key');
  const headlineLink = articleKeyDiv ? articleKeyDiv.querySelector('.why') : null;
  let headlineElement;
  if (headlineLink) {
    headlineElement = document.createElement('h1');
    headlineElement.textContent = headlineLink.textContent;
  } else {
    headlineElement = document.createElement('div');
    headlineElement.textContent = 'Headline missing';
  }

  // Create the table structure
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Hero';

  const contentRow = [document.createElement('div')];
  contentRow[0].append(imageElement, headlineElement);

  // Create the table block
  const tableData = [headerRow, contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}