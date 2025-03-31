export default function parse(element, { document }) {
  // Extract the header row based on the example format
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Tabs';

  // Initialize rows array
  const rows = [];

  // Extract content dynamically from the provided HTML structure
  // Locate the navbar links and construct tab rows dynamically
  const navItems = element.querySelectorAll('.navbar-nav .nav-item a');

  navItems.forEach((navItem) => {
    const label = navItem.textContent.trim();
    const href = navItem.getAttribute('href');

    if (label && href) {
      const labelElement = document.createElement('div');
      labelElement.textContent = label;

      const contentElement = document.createElement('div');
      contentElement.textContent = `Content linked to ${href}`; // Placeholder content

      rows.push([labelElement, contentElement]);
    }
  });

  // Create the block table using extracted data
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}