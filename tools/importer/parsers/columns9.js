export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    // Extract the thumbnail image element
    const thumbnailDiv = element.querySelector('.article-thumbnail');
    const thumbnailImg = thumbnailDiv ? thumbnailDiv.querySelector('img') : null;

    // Extract the key list items
    const keyDiv = element.querySelector('.article-key');
    const keyListItems = keyDiv ? keyDiv.querySelectorAll('li.article-key-item a') : [];

    const keyLinks = Array.from(keyListItems).map(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent;
        return anchor;
    });

    // Extract the sharing buttons
    const shareButtonsDiv = keyDiv ? keyDiv.querySelector('.sharethis-inline-share-buttons') : null;
    const shareButtons = shareButtonsDiv ? Array.from(shareButtonsDiv.querySelectorAll('img')).map(img => {
        const buttonImg = document.createElement('img');
        buttonImg.src = img.src;
        buttonImg.alt = img.alt;
        return buttonImg;
    }) : [];

    // Construct the table data
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Columns';
    const headerRow = [headerCell];

    const contentRow = [
        thumbnailImg,
        [...keyLinks, ...shareButtons]
    ];

    const cells = [
        headerRow,
        contentRow
    ];

    const table = createTable(cells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}