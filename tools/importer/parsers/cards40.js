export default function parse(element, { document }) {
  // Extract content dynamically from the provided element
  const createCardContent = (paragraph) => {
    const heading = paragraph.querySelector('strong');
    const link = paragraph.querySelector('a');
    const description = paragraph.cloneNode(true);

    // Remove heading and link from the cloned description node
    if (heading) description.removeChild(heading);
    if (link) description.removeChild(link);

    return {
      heading: heading ? heading.textContent.trim() : '',
      description: description.textContent.trim(),
      link: link ? link.href : '',
    };
  };

  const cards = [];
  const paragraphs = Array.from(element.querySelectorAll('p'));

  paragraphs.forEach((paragraph) => {
    const cardContent = createCardContent(paragraph);
    // Ensure cards are only added if they contain meaningful content
    if (cardContent.heading || cardContent.description || cardContent.link) {
      cards.push(cardContent);
    }
  });

  // Prepare structured data for the table
  const tableData = [
    ['Cards'], // Exact header row from the example
    ...cards.map((card) => {
      const headingElement = document.createElement('h3');
      headingElement.textContent = card.heading;

      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = card.description;

      const linkElement = document.createElement('a');
      linkElement.href = card.link;
      linkElement.textContent = card.link;

      return [headingElement, [descriptionElement, linkElement]];
    }),
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}