export default function parse(element, { document }) {
  // Create the header row for the table
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';

  // Initialize rows array to hold table rows
  const rows = [];

  // Extract title from the section
  const titleElement = element.querySelector('#page-section-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract sponsor details
  const sponsorImage = element.querySelector('.sponsor-logo');
  const sponsorLink = sponsorImage ? sponsorImage.closest('a') : null;
  const sponsorAlt = sponsorImage ? sponsorImage.getAttribute('alt') : '';
  const sponsorHref = sponsorLink ? sponsorLink.href : '';

  // Create a new text block for title and sponsor info
  const textCell = document.createElement('div');

  if (title) {
    const titleNode = document.createElement('h2');
    titleNode.textContent = title;
    textCell.appendChild(titleNode);
  }

  if (sponsorAlt) {
    const sponsorNode = document.createElement('p');
    sponsorNode.textContent = 'Sponsored By: ';

    const sponsorAnchor = document.createElement('a');
    sponsorAnchor.href = sponsorHref;
    sponsorAnchor.textContent = sponsorAlt;
    sponsorNode.appendChild(sponsorAnchor);

    textCell.appendChild(sponsorNode);
  }

  // Push the row with the extracted sponsor image and text cell
  rows.push([sponsorImage, textCell]);

  // Create the table using the rows
  const tableData = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}