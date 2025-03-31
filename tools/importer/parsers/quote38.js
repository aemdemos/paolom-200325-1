export default function parse(element, { document }) {
  // Create the header row matching the example exactly
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Quote';
  const headerRow = [headerCell];

  // Extract relevant content for the quote (only notable paragraphs)
  const notableParagraphs = Array.from(element.querySelectorAll('p'))
    .filter((p) => p.textContent.trim() !== '' && !p.querySelector('em')) // Ignore empty and non-relevant paragraphs
    .slice(0, 2); // Limit to the first two relevant paragraphs

  // Combine extracted paragraphs into a single block
  const quoteText = document.createElement('div');
  notableParagraphs.forEach((p) => {
    const cleanParagraph = document.createElement('p');
    cleanParagraph.textContent = p.textContent.replace(/\u00a0/g, ' '); // Normalize content
    quoteText.appendChild(cleanParagraph);
  });

  // Prepare cells for the table
  const cells = [
    headerRow,
    [quoteText],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}