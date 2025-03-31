export default function parse(element, { document }) {
  // Helper function to generate a strong element
  const createStrongElement = (text) => {
    const strong = document.createElement('strong');
    strong.textContent = text;
    return strong;
  };

  // Extract the paragraphs
  const paragraphs = Array.from(element.querySelectorAll('p'));

  // Create the header row
  const headerRow = [createStrongElement('Cards (no images)')];

  // Create content rows
  const contentRows = paragraphs.map((p) => {
    const strongText = p.querySelector('strong');
    const link = p.querySelector('a');

    const content = document.createElement('div');

    // Add strong text if available
    if (strongText) {
      const heading = createStrongElement(strongText.textContent);
      content.appendChild(heading);

      // Remove the strong text node from the paragraph
      strongText.remove();
    }

    // Add remaining paragraph text, cleaned up
    const paragraphText = p.textContent.trim();
    if (paragraphText) {
      const description = document.createElement('p');
      description.textContent = paragraphText;
      content.appendChild(description);
    }

    // Add link if available, ensuring alignment at the bottom of the content cell and avoiding duplication
    if (link) {
      const callToAction = document.createElement('a');
      callToAction.href = link.href;
      callToAction.textContent = link.textContent;

      const linkContainer = document.createElement('div');
      linkContainer.style.marginTop = '10px'; // Ensure link is visually separated
      linkContainer.appendChild(callToAction);

      content.appendChild(linkContainer);
    }

    return [content];
  });

  // Combine header and content rows
  const tableRows = [headerRow, ...contentRows];

  // Create the table block
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}