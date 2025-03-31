export default function parse(element, { document }) {
  // Helper function to create table rows from content
  const createRow = (imageSrc, title, description, cta = null) => {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = title || '';

    const contentElements = [];

    if (title) {
      const heading = document.createElement('h2');
      heading.textContent = title;
      contentElements.push(heading);
    }

    if (description) {
      const paragraph = document.createElement('p');
      paragraph.textContent = description;
      contentElements.push(paragraph);
    }

    if (cta) {
      const link = document.createElement('a');
      link.href = cta.href;
      link.textContent = cta.text;
      contentElements.push(link);
    }

    return [img, contentElements];
  };

  // Extract relevant sections from the original element
  const thumbnailDiv = element.querySelector('.article-thumbnail img');
  const imageSrc = thumbnailDiv?.src || '';
  const imageAlt = thumbnailDiv?.alt || '';

  const articleKeyList = element.querySelector('.article-key .article-key-list');
  const articleLinks = Array.from(articleKeyList?.querySelectorAll('a') || []).map((link) => ({
    href: link.href,
    text: link.textContent,
  }));

  // Prepare table header
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Carousel';
  const tableHeader = [headerCell];

  // Prepare table rows
  const tableRows = [];

  if (imageSrc) {
    tableRows.push(createRow(imageSrc, imageAlt, null, articleLinks.length > 0 ? articleLinks[0] : null));
  } else {
    console.warn('No image found in the provided element.');
  }

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([tableHeader, ...tableRows], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}