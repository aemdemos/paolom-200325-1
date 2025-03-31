export default function parse(element, { document }) {
  const rows = [];

  // Add the header row for the Cards block
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  // Find all card elements within the provided element
  const cards = element.querySelectorAll('.ctx-link');

  cards.forEach(card => {
    const imageContainer = card.querySelector('.ctx-link-image img');
    const titleContainer = card.querySelector('.ctx-link-title p');

    // Extract the image
    const image = imageContainer ? document.createElement('img') : null;
    if (image) {
      image.src = imageContainer.src;
      image.alt = imageContainer.alt || '';
    }

    // Extract the title
    const title = titleContainer ? document.createElement('strong') : null;
    if (title) {
      title.textContent = titleContainer.textContent.trim();
    }

    // Combine image and title into the table row
    rows.push([
      image,
      [title]
    ]);
  });

  // Create the table using the WebImporter.DOMUtils.createTable helper
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}