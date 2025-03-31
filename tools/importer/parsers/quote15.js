export default function parse(element, { document }) {
  const headerRow = ['Quote'];

  const quoteText = Array.from(element.querySelectorAll('p')).map((p) => p.textContent.trim()).filter((text) => text.length > 0).join(' ');
  const quoteRow = [quoteText];

  const cells = [headerRow, quoteRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}