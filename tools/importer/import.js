/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global window, WebImporter, XPathResult */
/* eslint-disable no-console */
import embed__video_1Parser from './parsers/embed__video_1.js';
import cards2Parser from './parsers/cards2.js';
import table__no_header_3Parser from './parsers/table__no_header_3.js';
import cards4Parser from './parsers/cards4.js';
import video6Parser from './parsers/video6.js';
import table__no_header_8Parser from './parsers/table__no_header_8.js';
import columns9Parser from './parsers/columns9.js';
import cards10Parser from './parsers/cards10.js';
import hero11Parser from './parsers/hero11.js';
import cards12Parser from './parsers/cards12.js';
import cards__no_images_13Parser from './parsers/cards__no_images_13.js';
import quote15Parser from './parsers/quote15.js';
import columns16Parser from './parsers/columns16.js';
import tabs17Parser from './parsers/tabs17.js';
import quote18Parser from './parsers/quote18.js';
import columns20Parser from './parsers/columns20.js';
import columns__three_columns_21Parser from './parsers/columns__three_columns_21.js';
import hero22Parser from './parsers/hero22.js';
import carousel23Parser from './parsers/carousel23.js';
import cards__no_images_24Parser from './parsers/cards__no_images_24.js';
import cards25Parser from './parsers/cards25.js';
import table__no_header_26Parser from './parsers/table__no_header_26.js';
import quote27Parser from './parsers/quote27.js';
import columns28Parser from './parsers/columns28.js';
import columns__three_columns_29Parser from './parsers/columns__three_columns_29.js';
import embed__video_31Parser from './parsers/embed__video_31.js';
import embed__video_32Parser from './parsers/embed__video_32.js';
import columns33Parser from './parsers/columns33.js';
import columns34Parser from './parsers/columns34.js';
import columns35Parser from './parsers/columns35.js';
import cards37Parser from './parsers/cards37.js';
import quote38Parser from './parsers/quote38.js';
import columns39Parser from './parsers/columns39.js';
import cards40Parser from './parsers/cards40.js';
import columns41Parser from './parsers/columns41.js';
import cards42Parser from './parsers/cards42.js';
import columns43Parser from './parsers/columns43.js';
import columns44Parser from './parsers/columns44.js';
import cards45Parser from './parsers/cards45.js';
import columns46Parser from './parsers/columns46.js';
import columns47Parser from './parsers/columns47.js';
import carousel48Parser from './parsers/carousel48.js';
import hero49Parser from './parsers/hero49.js';
import hero50Parser from './parsers/hero50.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

WebImporter.Import = {
  isEmpty: (cells) => {
    if (Array.isArray(cells)) {
      return cells.length === 0;
    } else if (typeof cells === 'object' && cells !== null) {
      return Object.keys(cells).length === 0;
    }
    return !cells;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (instances, url) => instances
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath),
};

const parsers = {
  Metadata: metadataParser,
      'Embed (video) 1': embed__video_1Parser,
    'Cards 2': cards2Parser,
    'Table (no header) 3': table__no_header_3Parser,
    'Cards 4': cards4Parser,
    'Video 6': video6Parser,
    'Table (no header) 8': table__no_header_8Parser,
    'Columns 9': columns9Parser,
    'Cards 10': cards10Parser,
    'Hero 11': hero11Parser,
    'Cards 12': cards12Parser,
    'Cards (no images) 13': cards__no_images_13Parser,
    'Quote 15': quote15Parser,
    'Columns 16': columns16Parser,
    'Tabs 17': tabs17Parser,
    'Quote 18': quote18Parser,
    'Columns 20': columns20Parser,
    'Columns (three columns) 21': columns__three_columns_21Parser,
    'Hero 22': hero22Parser,
    'Carousel 23': carousel23Parser,
    'Cards (no images) 24': cards__no_images_24Parser,
    'Cards 25': cards25Parser,
    'Table (no header) 26': table__no_header_26Parser,
    'Quote 27': quote27Parser,
    'Columns 28': columns28Parser,
    'Columns (three columns) 29': columns__three_columns_29Parser,
    'Embed (video) 31': embed__video_31Parser,
    'Embed (video) 32': embed__video_32Parser,
    'Columns 33': columns33Parser,
    'Columns 34': columns34Parser,
    'Columns 35': columns35Parser,
    'Cards 37': cards37Parser,
    'Quote 38': quote38Parser,
    'Columns 39': columns39Parser,
    'Cards 40': cards40Parser,
    'Columns 41': columns41Parser,
    'Cards 42': cards42Parser,
    'Columns 43': columns43Parser,
    'Columns 44': columns44Parser,
    'Cards 45': cards45Parser,
    'Columns 46': columns46Parser,
    'Columns 47': columns47Parser,
    'Carousel 48': carousel48Parser,
    'Hero 49': hero49Parser,
    'Hero 50': hero50Parser,
};

const pageElements = [
  {
    name: 'Metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory: { fragments = [], blocks = [] }, ...source }) {
  const { document, params: { originalURL } } = source;

  // get dom elements for each block on the current page
  const blockElements = blocks.map((block) => {
    const foundInstance = block.instances.find((instance) => instance.url === originalURL);
    if (foundInstance) {
      /* eslint-disable no-param-reassign */
      block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
    }
    return block;
  });

  // remove fragment elements from the current page
  fragments.flatMap((frg) => frg.instances)
    .filter((instance) => instance.url === originalURL)
    .map((instance) => WebImporter.Import.getElementByXPath(document, instance.xpath))
    .forEach((element) => {
      element.remove();
    });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = cluster ? `${name} ${cluster}` : name;
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    let items = null;
    try {
      items = parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
    // remove empty items
    if (Array.isArray(items)) {
      items = items.filter((item) => item);
    }
    if (!WebImporter.Import.isEmpty(items)) {
      // create the block
      const block = WebImporter.Blocks.createBlock(document, {
        name,
        cells: items,
      });
      if (block) {
        // add block to DOM
        main.append(block);
      }
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}?frag=${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}?frag=${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserFn = parsers[`${name} ${cluster}`];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    const sanitizedOriginalURL = new URL(originalURL).href;
    /* eslint-disable no-param-reassign */
    source.params.originalURL = sanitizedOriginalURL;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    // pre-transform rules
    preTransformRules({
      root: document.body,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let main = null;
    let path = null;
    const sourceUrl = new URL(originalURL);
    const sourceParams = new URLSearchParams(sourceUrl.search);
    if (sourceParams.has('frag')) {
      // fragment transformation
      const fragName = sourceParams.get('frag');
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      main = document.body;
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
