export default function parse(element, { document }) {
  const cards = [];

  // Create and add the header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  cards.push(headerRow);

  // Extract sections and links
  const sections = element.querySelectorAll('.ctx-section');

  sections.forEach((section) => {
    const links = section.querySelectorAll('.ctx-link');
    links.forEach((link) => {
      const imageElement = link.querySelector('.ctx-link-image img');
      const titleElement = link.querySelector('.ctx-link-title p');

      // Ensure data exists before processing
      if (imageElement && titleElement) {
        const image = document.createElement('img');
        image.src = imageElement.src;
        image.alt = titleElement.textContent.trim();
        image.loading = 'lazy';

        const title = document.createElement('strong');
        title.textContent = titleElement.textContent.trim();

        cards.push([image, title]);
      }
    });
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cards, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}