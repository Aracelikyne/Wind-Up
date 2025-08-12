import { loadHeaderFooter, highlightActiveLink } from '../utils.js';

async function initializePage() {
  await loadHeaderFooter();
  highlightActiveLink();

}

initializePage();
