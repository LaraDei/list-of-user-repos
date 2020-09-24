'use strict';


function displayResults(response) {
  // if there are previous results, remove them
  console.log(response);
  // remove previous error msg.
  $('#js-error-message').empty();
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < response.length ; i++){
    // for each video object in the articles
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<li><h3>${response[i].name}</h3>
      <p><a href="${response[i].url}"</a>${response[i].url}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos(query) { 
  const queryString = query.toLowerCase()
  const url = `https://api.github.com/users/${encodeURIComponent(queryString)}/repos`

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(response => displayResults(response))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
      $('#results-list').empty();
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
  //  $('#results').addClass('hidden');
    const searchTerm = $('#js-search-term').val();
    getRepos(searchTerm);
  });
}

$(watchForm);