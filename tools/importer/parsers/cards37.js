export default function parse(element, { document }) {
  const rows = [];

  // Add header row for the block type
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Cards';
  rows.push(headerRow);

  // Select all news list items
  const newsItems = element.querySelectorAll('.news-list-item');

  newsItems.forEach((item) => {
    const imageContainer = item.querySelector('.news-list-col-photo img');
    const image = document.createElement('img');
    image.src = imageContainer ? imageContainer.src : '';
    image.alt = imageContainer ? imageContainer.alt : '';

    const contentContainer = item.querySelector('.news-list-col-content');

    const titleElement = contentContainer.querySelector('.news-list-header a span');
    const title = document.createElement('h3');
    title.textContent = titleElement ? titleElement.textContent : '';

    const descriptionElement = contentContainer.querySelector('.news-list-content p');
    const description = document.createElement('p');
    description.innerHTML = descriptionElement ? descriptionElement.innerHTML : '';

    const footerElement = contentContainer.querySelector('.news-list-footer');
    const dateElement = footerElement.querySelector('.news-list-subheader-list-item:first-child');
    const authorElement = footerElement.querySelector('.news-list-subheader-list-item a');
    const solutionElement = footerElement.querySelector('.news-list-footer-list-item a');

    const footer = document.createElement('div');
    const date = document.createElement('p');
    date.textContent = dateElement ? dateElement.textContent : '';

    const author = document.createElement('p');
    if (authorElement) {
      const authorLink = document.createElement('a');
      authorLink.href = authorElement.href;
      authorLink.textContent = authorElement.textContent;
      author.appendChild(authorLink);
    }

    const solution = document.createElement('p');
    if (solutionElement) {
      const solutionLink = document.createElement('a');
      solutionLink.href = solutionElement.href;
      solutionLink.textContent = solutionElement.textContent;
      solution.appendChild(solutionLink);
    }

    footer.appendChild(date);
    if (authorElement) footer.appendChild(author);
    if (solutionElement) footer.appendChild(solution);

    const cardContent = [title, description, footer];
    const row = [image, cardContent];
    rows.push(row);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}