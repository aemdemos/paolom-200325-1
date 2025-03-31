export default function parse(element, { document }) {
    // Create the header row with the EXACT required structure
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';

    const headerRow = [headerCell];

    // Extract and organize content dynamically
    const paragraphs = Array.from(element.querySelectorAll('div')).filter(div => div.textContent.trim());
    const imageElement = element.querySelector('img');
    const linkElement = element.querySelector('a');
    const creditsElement = element.querySelector('em');

    // Create rows dynamically based on extracted content
    const contentRows = [];

    // Combine paragraphs into a single cell for the first content row
    const textCell = paragraphs.map(paragraph => {
        const p = document.createElement('p');
        p.innerHTML = paragraph.innerHTML.trim();
        return p;
    });
    contentRows.push([textCell]);

    // Create a row for media elements with each element as its own cell
    const mediaRow = [];

    if (imageElement) {
        const img = document.createElement('img');
        img.src = imageElement.src;
        img.alt = imageElement.alt || '';
        img.style.width = imageElement.style.width;
        img.style.height = imageElement.style.height;
        mediaRow.push(img);
    }

    if (linkElement) {
        const a = document.createElement('a');
        a.href = linkElement.href;
        a.textContent = linkElement.textContent;
        mediaRow.push(a);
    }

    if (creditsElement) {
        const em = document.createElement('em');
        em.textContent = creditsElement.textContent;
        mediaRow.push(em);
    }

    contentRows.push(mediaRow);

    // Ensure no empty rows and filter out invalid entries
    const tableData = [headerRow, ...contentRows.filter(row => row.length > 0)];

    // Create the table block using WebImporter.DOMUtils.createTable()
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new table block
    element.replaceWith(table);
}