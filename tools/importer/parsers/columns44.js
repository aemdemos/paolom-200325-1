export default function parse(element, { document }) {
  // Create the header row
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';

  // Extract paragraphs (text content)
  const paragraphs = Array.from(element.querySelectorAll('span, strong, em')).map((elem) => {
    return elem.cloneNode(true);
  });

  // Extract images
  const images = Array.from(element.querySelectorAll('img')).map((img) => {
    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    return image;
  });

  // Extract links
  const links = Array.from(element.querySelectorAll('a')).map((anchor) => {
    const link = document.createElement('a');
    link.href = anchor.href;
    link.textContent = anchor.textContent;
    return link;
  });

  // Group related content logically into rows
  const rows = [];
  let maxElements = Math.max(paragraphs.length, images.length, links.length);

  for (let i = 0; i < maxElements; i++) {
    const row = [];
    row.push(paragraphs[i] ? paragraphs[i] : '');
    row.push(images[i] ? images[i] : '');
    row.push(links[i] ? links[i] : '');
    rows.push(row);
  }

  // Create the table structure
  const tableData = [
    [headerCell], // Header row
    ...rows // Content rows logically grouped side-by-side
  ];

  // Generate the block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}