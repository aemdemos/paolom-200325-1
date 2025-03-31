export default function parse(element, { document }) {
    // Ensure the iframe element is dynamically extracted
    const iframe = element.querySelector('iframe');

    // Handle cases where iframe or its src attribute might be missing
    const videoURL = iframe ? iframe.src : '';

    // Create the header row for the table dynamically, matching the example
    const headerCell = document.createElement('strong');
    headerCell.textContent = 'Embed';

    // Create the content row dynamically and handle cases where videoURL might be empty
    const linkCell = document.createElement('a');
    if (videoURL) {
        linkCell.href = videoURL;
        linkCell.textContent = videoURL;
    } else {
        linkCell.textContent = 'No video URL found';
    }

    // Create the table using the helper function
    const cells = [
        [headerCell],
        [linkCell]
    ];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly created block table
    element.replaceWith(blockTable);
}