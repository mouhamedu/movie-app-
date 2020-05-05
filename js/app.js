// wow js object
new WOW().init();

// the main variables
// api key for the movie db
let api = "your api key";
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
		let url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${search.value}&language=en-US&include_adult=false`;

		// fetch the movie information   
		fetch(url)
		.then((data) => { 
			// convert movie information to json 
			return data.json();

		}).then((result) => {
			console.log(result.results[4]);
			// working with final result
			// check if the input value return any result
			if (result.results != 0) {

				// clear the text in the title
				title.innerText = "Searching Result";
				title.style = "padding: 50px 0;";
				movies_container.innerHTML = result.results.map((item) => {
					// if the movie have poster => image add it to the movies container
					if (item.poster_path) {

						// remove any single or double qoutes in the discription and the title of the movie
						let regEx = /['"]+/gm;
						let disc_without_qoutes = item.overview.replace(regEx, "");
						let title_without_qoutes = item.title.replace(regEx, "");
						// return the details about the movie
						return `
							<div class="col">
								<div class="zoom">
									<img src="${imageUrl + item.poster_path}" alt="movie-image" title="${item.title}" onclick='selectedItem("${imageUrl + item.poster_path}", "${title_without_qoutes}", "${item.release_date}", "${disc_without_qoutes}")' class="wow zoomIn">
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

			// wait 2 second to fetch all the resutl then redirect to the final result
			setTimeout(() => {
				// click the link with click method
				document.querySelector('a').click();
			}, 2000);

		});

	}

});

// this function to set the item when the user click on the movie thumbnail
function selectedItem(thumbnail, title, release, discription) {

	// to show the modal 
	modal.style.display = 'block';
	// to push the data inside the single row
	document.querySelector('.single-row').innerHTML = `

		<div class="col">
			<div class="zoom">
				<img src="${thumbnail}" alt="movie-image">
			</div>
		</div>
		<div class="col">
			<h1>${title}</h1>
			<p>Release: ${release}</p>
			<p>Discription: ${discription}</>
		</div>
				
	`;

}

// set event listener to the close button
closeBtn.onclick = function () {
	modal.style = 'display: none;';
}
