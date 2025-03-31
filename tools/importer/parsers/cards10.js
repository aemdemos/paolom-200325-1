export default function parse(element, { document }) {
  // Extract block name dynamically
  const blockName = document.createElement('strong');
  blockName.textContent = 'Cards'; // Ensures the header matches the example completely

  // Extract the image dynamically
  const imageElement = element.querySelector('.article-thumbnail img');
  const image = document.createElement('img');
  image.src = imageElement?.getAttribute('src') || ''; // Handles missing image gracefully
  image.alt = imageElement?.getAttribute('alt') || ''; // Handles missing alt text gracefully
  image.title = imageElement?.getAttribute('title') || ''; // Handles missing title gracefully

  // Extract the text content dynamically
  const keyElement = element.querySelector('.article-key .hyb');
  const title = document.createElement('strong');
  title.textContent = keyElement?.getAttribute('title') || ''; // Handles missing title gracefully

  const description = document.createElement('p');
  description.textContent = keyElement?.textContent.trim() || ''; // Handles missing or empty content gracefully

  const textContent = [title, description];

  // Create table cells dynamically
  const cells = [
    [blockName],
    [image, textContent],
  ];

  // Create block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}