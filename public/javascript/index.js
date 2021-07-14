const searchBar = document.querySelector('.search-bar');
const suggestionBox = document.querySelector('.suggestion-box');
const suggestItem = document.querySelector('.suggest-item');
const searchForm = document.getElementById('search-form');

function fetchSuggestions() {
  return new Promise((resolve, reject) => {
    url = '/';
    data = { keyword: `${searchBar.value}` };

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((response) => {
        resolve(response);
      });
  });
}
