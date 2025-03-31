export default function parse(element, { document }) {
  const cells = [];

  // Add header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards (no images)';
  cells.push(headerRow);

  // Extract content for cards
  const footerAboutContent = element.querySelector('.footer-about-content');
  if (footerAboutContent) {
    const titles = footerAboutContent.querySelectorAll('.footer-about-title');
    const descriptions = footerAboutContent.querySelectorAll('p');

    titles.forEach((title, index) => {
      // Ensure description exists before accessing
      const description = descriptions[index];

      // Create strong element for title
      const cardTitle = document.createElement('strong');
      cardTitle.textContent = title.textContent.trim();

      // Create description div
      const cardDescription = document.createElement('div');
      cardDescription.innerHTML = description ? description.innerHTML.trim() : '';

      // Create a card row
      const row = [document.createElement('div')];
      row[0].append(cardTitle, cardDescription);

      cells.push(row);
    });
  }

  // Create the table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the new block table
  element.replaceWith(blockTable);
}