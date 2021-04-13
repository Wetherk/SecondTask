// global variables

const albumContainer = document.getElementById("album-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const numberParagraph = document.getElementById("pageNumber");
let dataArr = [];
let pageNumber = 1;

// functions

function createSingleBlock(albumName, albumId) {
	const icon = document.createElement("img");
	icon.setAttribute("src", "/images/albumIcon.png");
	icon.classList.add("album_icon");

	const text = document.createTextNode(albumName);

	const paragraph = document.createElement("p");
	paragraph.classList.add("album_text");
	paragraph.appendChild(text);

	const block = document.createElement("div");
	block.classList.add("album_preview");
	block.setAttribute("id", albumId);
	block.appendChild(paragraph);
	block.appendChild(icon);

	const returnId = function () {
		console.log(this.id);
		localStorage.setItem("clickedId", this.id);
		location.href = "album.html";
	};
	block.onclick = returnId;

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
	if (pageNumber == Math.ceil(dataArr.length / 8)) {
		for (
			let i = pageNumber * 8 - 8;
			i < pageNumber * 8 - (dataArr.length % 8);
			i++
		) {
			createSingleBlock(dataArr[i].title, dataArr[i].id);
		}
		nextBtn.classList.add("hide");
	} else {
		for (let i = pageNumber * 8 - 8; i < pageNumber * 8; i++) {
			createSingleBlock(dataArr[i].title, dataArr[i].id);
		}
		nextBtn.classList.remove("hide");
	}

	if (pageNumber == 1) {
		prevBtn.classList.add("hide");
	} else {
		prevBtn.classList.remove("hide");
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
