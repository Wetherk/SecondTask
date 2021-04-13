// global variables

const albumContainer = document.getElementById("album-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const numberParagraph = document.getElementById("pageNumber");
let dataArr = [];
let pageNumber = 1;

// functions

function createSingleBlock(albumName) {
	const icon = document.createElement("img");
	icon.setAttribute("src", "/images/albumIcon.png");
	icon.classList.add("album_img");

	const text = document.createTextNode(albumName);

	const paragraph = document.createElement("p");
	paragraph.classList.add("album_text");
	paragraph.appendChild(text);

	const block = document.createElement("div");
	block.classList.add("album_preview");
	block.appendChild(paragraph);
	block.appendChild(icon);

	albumContainer.appendChild(block);
}

function deleteAlbums() {
	while (albumContainer.firstChild) {
		albumContainer.removeChild(albumContainer.firstChild);
	}
	numberParagraph.removeChild(numberParagraph.firstChild);
}

function renderPageNumber() {
	const numberText = document.createTextNode(pageNumber);
	numberParagraph.appendChild(numberText);
}

function renderAlbums() {
	for (let i = pageNumber * 8; i > pageNumber * 8 - 8; i--) {
		createSingleBlock(dataArr[i].title);
	}
	renderPageNumber();
}

// Navigation buttons

prevBtn.addEventListener("click", () => {
	deleteAlbums();
	pageNumber -= 1;
	renderAlbums();
});

nextBtn.addEventListener("click", () => {
	deleteAlbums();
	pageNumber += 1;
	renderAlbums();
});

// Fetch Info From Server

fetch("https://jsonplaceholder.typicode.com/albums")
	.then((response) => response.json())
	.then((data) => (dataArr = [...data]))
	.then(() => {
		renderAlbums();
	});
