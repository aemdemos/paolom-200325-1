export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Create header row with block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Extract and organize content into columns
  const firstColumn = [];
  const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => p.textContent.trim());
  const links = Array.from(element.querySelectorAll('a'));
  const list = document.createElement('ul');

  links.forEach(link => {
    const listItem = document.createElement('li');
    listItem.appendChild(link.cloneNode(true));
    list.appendChild(listItem);
  });

  paragraphs.forEach(paragraph => {
    const clonedParagraph = paragraph.cloneNode(true);
    firstColumn.push(clonedParagraph);
  });
  firstColumn.push(list);

  const secondColumn = [];
  const images = Array.from(element.querySelectorAll('img'));
  images.forEach(image => {
    secondColumn.push(image.cloneNode(true));
  });

  const multimediaElements = Array.from(element.querySelectorAll('video, audio'));
  multimediaElements.forEach(media => {
    const mediaWrapper = document.createElement('div');
    const previewText = document.createElement('p');
    previewText.textContent = 'Preview';
    mediaWrapper.appendChild(media.cloneNode(true));
    mediaWrapper.appendChild(previewText);
    secondColumn.push(mediaWrapper);
  });

  // Add columns as rows
  const rows = [headerRow, [firstColumn, secondColumn]];

  // Create the block table
  const blockTable = createTable(rows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}