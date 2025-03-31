export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Create the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Extract and organize content into columns
  const contentRows = [];

  // Extract the webinar paragraph
  const webinarParagraph = element.querySelector('p:nth-of-type(1)');
  const webinarCell = document.createElement('div');
  if (webinarParagraph) {
    const webinarClone = webinarParagraph.cloneNode(true);
    webinarCell.appendChild(webinarClone);

    const webinarLink = webinarCell.querySelector('a');
    if (webinarLink) {
      webinarLink.textContent = 'Watch the webinar';
    }
  }
  contentRows.push([webinarCell]);

  // Extract the second paragraph and format content
  const summaryParagraph = element.querySelector('p:nth-of-type(2)');
  const summaryCell = document.createElement('div');
  if (summaryParagraph) {
    const summaryClone = summaryParagraph.cloneNode(true);
    summaryCell.appendChild(summaryClone);
  }
  contentRows.push([summaryCell]);

  // Add the table to the DOM
  const table = createTable([headerRow].concat(contentRows), document);

  // Replace the original element
  element.replaceWith(table);
}