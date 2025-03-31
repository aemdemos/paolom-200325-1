export default function parse(element, { document }) {
  const cells = [];

  // Add header row with block name
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';
  cells.push(headerRow);

  // Initialize content rows
  const contentRow1 = [];
  const contentRow2 = [];

  // Extract first set of content dynamically from the provided HTML
  const firstParagraph = element.querySelector('p');
  const textBlock = document.createElement('div');
  textBlock.innerHTML = firstParagraph ? firstParagraph.outerHTML : '';

  const liveLink = element.querySelector('a[href*="live.com"]');
  const button = document.createElement('a');
  if (liveLink) {
    button.href = liveLink.href;
    button.textContent = liveLink.textContent;
    button.style.cssText = 'display: inline-block; background: blue; color: white; padding: 10px; border-radius: 5px; text-decoration: none;';
  }
  contentRow1.push(textBlock, button);

  // Extract second set of content dynamically from the provided HTML
  const imageElement = element.querySelector('img');
  const img1 = document.createElement('img');
  if (imageElement) {
    img1.src = imageElement.src;
    img1.alt = imageElement.alt;
    img1.style.cssText = 'width: 450px; height: 268px;';
  }

  const previewParagraph = element.querySelector('p + p + p');
  const descriptionBlock = document.createElement('div');
  if (previewParagraph) {
    descriptionBlock.innerHTML = `${previewParagraph.outerHTML}<a href="https://word-edit.officeapps.live.com/">Preview</a>`;
  }
  contentRow2.push(img1, descriptionBlock);

  // Push content rows to cells
  cells.push(contentRow1);
  cells.push(contentRow2);

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}