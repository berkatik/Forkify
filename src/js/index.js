// Global app controller
import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';
import Recipe from './models/Recipe';
/** Global state of our app
 * - Search object
 * - Current recipe object 
 * - Shopping list
 * - Liked recipes
 */
const state = {};

/**
 * Search Controller
 */
const controlSearch = async () => {
    // #1. Get query from view
    const query = searchView.getInput();  // TODO:
    console.log(query);
    

    if (query) {
        // #2. New search object and add to state
        state.search = new Search(query);

        // #3. Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);
        // #4. Search for recipes
        await state.search.getResults();

        // #5. Render result on UI
        clearLoader();
        
        searchView.renderResult(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});


elements.searchResPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const gotoPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResult(state.search.result, gotoPage);
    }
})

/**
 * Recipe Controller
 */

// const r = new Recipe(46956);
// r.getRecipe();