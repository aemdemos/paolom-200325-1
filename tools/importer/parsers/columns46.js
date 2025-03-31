export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extracting content for the first column dynamically
  const firstColumnContent = [];
  const listItems = element.querySelectorAll('ul li');
  listItems.forEach((li) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = li.textContent.trim();
    firstColumnContent.push(paragraph);
  });

  const liveLink = element.querySelector('a[href*="word-edit.officeapps.live.com"]');
  if (liveLink) {
    const link = document.createElement('a');
    link.href = liveLink.href;
    link.textContent = liveLink.textContent.trim();
    firstColumnContent.push(link);
  }

  const firstColumn = document.createElement('div');
  firstColumn.append(...firstColumnContent);

  // Extracting content for the second column dynamically
  const secondColumnContent = [];
  const images = element.querySelectorAll('img');
  images.forEach((img) => {
    const imageContainer = document.createElement('div');
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    imageContainer.appendChild(image);
    secondColumnContent.push(imageContainer);
  });

  const previewLink = element.querySelector('a[href*="word-edit.officeapps.live.com"]');
  if (previewLink) {
    const previewParagraph = document.createElement('p');
    const link = document.createElement('a');
    link.href = previewLink.href;
    link.textContent = previewLink.textContent.trim();
    previewParagraph.appendChild(link);
    secondColumnContent.push(previewParagraph);
  }

  const secondColumn = document.createElement('div');
  secondColumn.append(...secondColumnContent);

  // Creating the table cells
  const cells = [
    headerRow,
    [firstColumn, secondColumn],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);

  return block;
}