export default function parse(element, { document }) {
  // Create the header row with the block name
  const headerCell = document.createElement('strong');
  headerCell.textContent = 'Columns';
  const headerRow = [headerCell];

  // Initialize content cells array for logical grouping as columns
  const groupedContent = [];

  // Extract paragraphs and links dynamically, grouping them logically
  const paragraphs = element.querySelectorAll('p');
  const textContentGroup = document.createElement('div');
  paragraphs.forEach((p) => {
    const link = p.querySelector('a');
    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent;
      textContentGroup.appendChild(linkElement);
    } else if (p.textContent.trim()) {
      textContentGroup.appendChild(p);
    }
  });
  groupedContent.push(textContentGroup);

  // Extract images dynamically and group them logically
  const images = element.querySelectorAll('img');
  const imageGroup = document.createElement('div');
  images.forEach((img) => {
    const imgElement = document.createElement('img');
    imgElement.src = img.src;
    imgElement.alt = img.alt;
    imageGroup.appendChild(imgElement);
  });
  groupedContent.push(imageGroup);

  // Extract iframe dynamically and group it logically
  const iframe = element.querySelector('iframe');
  if (iframe) {
    const iframeGroup = document.createElement('div');
    const iframeElement = document.createElement('iframe');
    iframeElement.src = iframe.src;
    iframeElement.title = iframe.title;
    iframeElement.allow = iframe.allow;
    iframeElement.width = iframe.width;
    iframeElement.height = iframe.height;
    iframeGroup.appendChild(iframeElement);
    groupedContent.push(iframeGroup);
  }

  // Ensure the structure matches the example
  const rows = [headerRow, groupedContent];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}