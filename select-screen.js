const artistElements = document.querySelectorAll(".artist");
const selectedArtistContainer = document.querySelector(
	".selected-artist-container"
);
const submitButton = document.querySelector("#submit-button");
const backButton = document.querySelector("#back-button");
let selectedArtists = [];

artistElements.forEach((artistElement) => {
	artistElement.addEventListener("click", (event) => {
		const artistName = artistElement.getAttribute("data-name");
		if (!selectedArtists.includes(artistName)) {
			selectedArtists.push(artistName);
			const artistIcon = document.createElement("img");
			artistIcon.src = artistElement.querySelector("img").src;
			artistIcon.classList.add("icon");
			artistIcon.setAttribute("data-artist", artistName);
			selectedArtistContainer.appendChild(artistIcon);
			animateIcon(artistIcon);
		}
	});
});

function animateIcon(icon) {
	$(icon).animate(
		{
			top: "+=40px",
			left: "+=80px",
			opacity: 0
		},
		1000,
		function () {
			$(this).css({ top: "0px", left: "0px", opacity: 1 });
			$(this).appendTo(".folder");
		}
	);
}

submitButton.addEventListener("click", (event) => {
	if (selectedArtists.length > 0) {
		alert(`You have selected: ${selectedArtists.join(", ")}`);
	} else {
		alert("Please select at least one artist");
	}
});

backButton.addEventListener("click", (event) => {
  //e.g backButton.addEventListener("click", () => window.history.back());
});


const clientId = "b2719769761a4422892ed04a4435d64c";
const redirectUri = "http://localhost:3000/callback";

const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}`;

// redirect user to authorizeUrl

// Once the user grants access, they will be redirected back to your redirect URI with an authorization code
// you can use this code to request an access token

const code = "authorization_code_from_redirect_uri";
const tokenUrl = "https://accounts.spotify.com/api/token";

const data = {
  grant_type: "authorization_code",
  code: code,
  redirect_uri: redirectUri,
  client_id: clientId,
  client_secret: "a4e4e73c34a24b13a9c87e6c99f5782a"
};

fetch(tokenUrl, {
  method: "POST",
  body: new URLSearchParams(data)
}).then(response => response.json())
  .then(data => {
    // save the access token for future use
    const accessToken = data.access_token;
  });


