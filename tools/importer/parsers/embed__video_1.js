export default function parse(element, { document }) {
  // Locate video element and its MP4 source
  const videoElement = element.querySelector('video');
  const sourceElement = videoElement ? videoElement.querySelector('source[type="video/mp4"]') : null;
  
  // Dynamically extract the video URL
  const videoUrl = sourceElement ? sourceElement.getAttribute('src') : '';

  // Create header row
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Construct table data dynamically
  const cells = [
    headerRow,
    [videoUrl]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}