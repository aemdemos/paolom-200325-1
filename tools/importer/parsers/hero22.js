export default function parse(element, { document }) {
  // Step 1: Extract relevant content from the input element

  // Header creation
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Hero';
  const headerRow = [headerCell];

  // Extract title
  const titleElement = element.querySelector('h3 > strong');
  const titleContent = titleElement ? titleElement.textContent.trim() : '';

  // Extract image
  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Extract concise description
  const descriptionParagraphs = Array.from(element.querySelectorAll('p'));
  const relevantDescription = descriptionParagraphs
    .slice(0, 2) // Limit to top 2 paragraphs for conciseness
    .map((desc) => desc.textContent.trim().replace(/\s+/g, ' '))
    .join(' ');

  const description = document.createElement('p');
  description.textContent = relevantDescription;

  // Extract call-to-action links
  const callToActionLinks = Array.from(element.querySelectorAll('a')).map((link) => {
    const cta = document.createElement('a');
    cta.href = link.href;
    cta.textContent = link.textContent.trim();
    return cta;
  });

  // Create structured cells for the table
  const cells = [
    headerRow, // Header row
    [
      [
        image ? image : '',
        (() => {
          const title = document.createElement('h1');
          title.textContent = titleContent;
          return title;
        })(),
        description,
        ...callToActionLinks.map((cta) => {
          const wrapper = document.createElement('p');
          wrapper.append(cta);
          return wrapper;
        })
      ].filter(Boolean),
    ],
  ];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}