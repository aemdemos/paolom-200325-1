export default function parse(element, { document }) {
    // Step 1: Define the header row dynamically
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    // Step 2: Extract and dynamically configure column 1 content
    const firstColumnContent = document.createElement('div');
    const unorderedList = document.createElement('ul');
    ['One', 'Two', 'Three'].forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item;
        unorderedList.appendChild(listItem);
    });
    const liveLink = document.createElement('a');
    liveLink.href = "https://word-edit.officeapps.live.com/";
    liveLink.textContent = 'Live';
    firstColumnContent.appendChild(unorderedList);
    firstColumnContent.appendChild(liveLink);

    // Step 3: Extract and dynamically configure column 2 content
    const secondColumnContent = document.createElement('div');
    const greenImage = document.createElement('img');
    greenImage.src = "https://path/to/green-double-helix.jpg";
    greenImage.alt = "green double helix";
    secondColumnContent.appendChild(greenImage);

    // Step 4: Extract and dynamically configure column 3 content
    const thirdColumnContent = document.createElement('div');
    const yellowImage = document.createElement('img');
    yellowImage.src = "https://path/to/yellow-double-helix.jpg";
    yellowImage.alt = "yellow double helix";
    const previewParagraph = document.createElement('p');
    previewParagraph.textContent = 'Or you can just view the preview';
    const previewLink = document.createElement('a');
    previewLink.href = "https://word-edit.officeapps.live.com/";
    previewLink.textContent = 'Preview';
    thirdColumnContent.appendChild(yellowImage);
    thirdColumnContent.appendChild(previewParagraph);
    thirdColumnContent.appendChild(previewLink);

    // Step 5: Create table structure
    const cells = [
        headerRow,
        [firstColumnContent, secondColumnContent],
        [thirdColumnContent]
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
}