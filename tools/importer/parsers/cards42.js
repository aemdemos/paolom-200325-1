export default function parse(element, { document }) {
    const rows = [
        // Header row with block name
        [document.createElement('strong')],
    ];

    rows[0][0].textContent = 'Cards';

    const cards = element.querySelectorAll('h3 + p, p + img');

    cards.forEach((card) => {
        const headerElement = card.previousElementSibling.querySelector('strong');
        const header = headerElement ? document.createElement('h3') : null;
        if (headerElement && header) {
            header.textContent = headerElement.textContent;
        }
        const descriptionElement = card.querySelector('p');
        const description = descriptionElement ? document.createElement('p') : null;
        if (descriptionElement && description) {
            description.innerHTML = descriptionElement.innerHTML;
        }
        const image = card.querySelector('img');

        rows.push([
            image,
            [header, description].filter(Boolean)
        ]);
    });

    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
}