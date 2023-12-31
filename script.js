////////////////////////////////////////////////////////////////////////////////
function loadTop10() { //code to load index.html
  const apiTopAnimeUrl = 'https://api.jikan.moe/v4/top/anime';
  let animeData;

  fetch(apiTopAnimeUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error Status: `+ response.status);
      }
      return response.json();
    })
    .then(function(datas) {
      animeData = datas.data.slice(0, 9); // take first 10 
	  
      displayAnime(animeData); // call displayAnime with fetched data
    })
    .catch(function(error){
      console.error('Fetch error:', error);
    });
}
////////////////////////////////////////////////////////////////////////////////
window.onload = function() {
  loadTop10();
};


////////////////////////////////////////////////////////////////////////////////
function displayAnime(animeData) {//for index.html
  const animeListDiv = document.getElementById('anime-list');

  animeData.forEach(function(anime) {
    const div = document.createElement('div');
    div.classList.add('anime-item');

    div.innerHTML =
      '<img src="' + anime.images.jpg.large_image_url + '" alt="' + anime.title + '">' +
      '<h2>' + anime.title + '</h2>' +
      '<p>Rank: ' + anime.rank + '</p>' +
      '<p>Score: ' + anime.score + '</p>' +
      '<p>Genres:</p>' +
      '<ul>' + generateList(anime.genres) + '</ul>' +
      '<p>Episodes: ' + anime.episodes + '</p>' +
      '<p>synopsis: ' + anime.synopsis + '</p>';

    animeListDiv.appendChild(div);
  });
}

////////////////////////////////////////////////////////////////////////////////
function generateList(genres) {
  let list = '';
  for (let i = 0; i < genres.length; i++) {
    list += '<li>' + genres[i].name + '</li>';
  }
  return list;
}

////////////////////////////////////////////////////////////////////////////////
function searchAnime(Id) {//for search anime api
  let animeId = parseInt(Id);

  if (!isNaN(animeId)) {
    const apiAllAnimeUrl = 'https://api.jikan.moe/v4/anime/' + animeId + '/full';

 fetch(apiAllAnimeUrl)
      .then(function(response) {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 400) {
          throw new Error('Incorrect parameters');
          alert('please enter a number');
        } else {
          alert('id does not exist');
        }
      })
      .then(function(data) {
        console.log(data);
        validateSearchAnime(data);
      })
      .catch(function(error) {
        console.error('Fetch error:', error);
      });
  } else {
    alert('enter a number');
  }
}
///////////////////////////////////////////////////////////////////////
function validateSearchAnime(data){//validates the data fro search make one for other
  if (
    typeof data.data.mal_id === 'number' &&
    typeof data.data.title === 'string' &&
    typeof data.data.type === 'string' &&
    typeof data.data.episodes === 'number' &&
    typeof data.data.score === 'number' &&
    Array.isArray(data.data.genres)
  ) {
    console.log('Validation passed');
	 displayAnimeInfo(data); // Call the displayAnimeInfo method with the validated data
  } else {
    console.log('Validation failed');
  }
}
/////////////////////////////////////////////////////////////////////////
   function displayAnimeInfo(data) {//for search anime api page
      const animeData = data.data;
      const animeListDiv = document.getElementById('anime_list2');
	  const animeItems = document.getElementsByClassName('anime-item');
		  
	 if (animeItems.length > 0) {
	   // Remove existing anime-item if it exists
	  animeItems[0].parentNode.removeChild(animeItems[0]);	  
	} 
      const  div = document.createElement('div');
      div.classList.add('anime-item');
      div.innerHTML =
        '<h2>' + animeData.title + '</h2>' +
        '<p>Type: ' + animeData.type + '</p>' +
        '<p>Episodes: ' + animeData.episodes + '</p>' +
        '<p>Score: ' + animeData.score + '</p>' +
        '<p>Genres:</p>' +
        '<ul>' + generateList(animeData.genres) + '</ul>' +
        '<img src="' + animeData.images.jpg.large_image_url + '" alt="' + animeData.title + '">';

      animeListDiv.appendChild(div);
    }
////////////////////////////////////////////////////////////////////////////////
