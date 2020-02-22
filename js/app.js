// wow js object
new WOW().init();

// the main variables
// api key
let api = "07882d3bfddaeedc0df6afc56c3fac7d";
// api key for omdbapi
let omdbapi = "b77b8f3e";
// search input
let search = document.querySelector('input[type="text"]');
// the main images url
let imageUrl  = "https://image.tmdb.org/t/p/w500";
// movies container
let movies_container = document.querySelector('.movies-container');
// the title
let title = document.querySelector('.title');
// modal container 
let modal = document.querySelector('.modal');
// close button
let closeBtn = document.querySelector('.close');


// set evet listener on the input feild
search.addEventListener('keydown', (event) => {

	// condition if the clicked button is enter
	if (event.keyCode == 13) {
		
		// clear the content of single-row container 
		document.querySelector('.single-row').innerHTML = "";
		
		// the main url
		let url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${search.value}`;

		// fetch the movie information   
		fetch(url)
		.then((data) => { 
			// convert movie information to json 
			return data.json();

		}).then((result) => {
			// working with final result
			// check if the input value return any result
			if (result.results != 0) {

				title.innerText = "Searching Result";
				title.style = "padding: 50px 0;";
				movies_container.innerHTML = result.results.map((item) => {
					
					// if the movie have poster => image 
					if (item.poster_path) {
						return `
							<div class="col">
								<div class="zoom">
									<img src="${imageUrl + item.poster_path}" alt="movie-image" title="${item.title}" onclick="selectedItem('${item.id}')" class="wow zoomIn">
								</div>
							</div>
							`;
					}

				}).join('');

			} else { // when the input value return no result
				title.innerText = "No Result!";
				title.style = "padding-top: 50px;";
				// to remove the content of movies container 
				movies_container.innerHTML = "";
			}

			// wait 2 second to fetch all the resutl then locate the page to the final result
			setTimeout(() => {
				// click the link with click method
				document.querySelector('a').click();
			}, 1000);

		});

	}

});

// this function to set the item when the user click on the movie thumbnail
function selectedItem(id) {

	// fetch the full data of the movie using it's id to get the imdb api id 
	// so with imdb api id we can get a better details about the movie
	
	fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${api}`)
	.then((data) => {

		return data.json();

	}).then((result) => {

		// store the movie imdb id 
		let theMovieId = result.imdb_id;

		// fetching the movie details with omdbapi
		fetch(`http://www.omdbapi.com/?i=${theMovieId}&apikey=${omdbapi}`)
		.then((data) => {
			return data.json();
		}).then((result) => {
			
			// show modal container 
			modal.style = 'display: block;';
			
			// add the final content to single-row 
			document.querySelector('.single-row').innerHTML = `

				<div class="col">
					<div class="zoom">
						<img src="${result.Poster}" alt="movie-image">
					</div>
				</div>
				<div class="col">
					<h1>${result.Title}</h1>
					<p>Release: ${result.Released}</p>
					<p>Runtime: ${result.Runtime}</p>
					<p>type: ${result.Genre}</p>
					<p>Language: ${result.Language}</p>
					<p>Actors: ${result.Actors}</p>
					<p>Director: ${result.Director}</p>
					<p>Writer: ${result.Writer}</p>
					<p>Discriptoin: ${result.Plot}</p>
				</div>
				
			`

		});

	});


}

// set event listener to the close button
closeBtn.onclick = function () {
	modal.style = 'display: none;';
}