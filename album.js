// global variables
const clickedId = localStorage.getItem("clickedId");
const photoContainer = document.getElementById("photoContainer");
const albumHeader = document.getElementById("albumTitle");
// functions
function renderPhoto(url) {
	const imgContainer = document.createElement("div");
	const img = document.createElement("img");
	img.setAttribute("src", url);
	img.classList.add("img_style");
	img.addEventListener("click", () => {
		location.href = url;
	});

	const deleteBtn = document.createElement("button");
	deleteBtn.innerHTML = "X";
	deleteBtn.classList.add("delete_btn");

	imgContainer.appendChild(img);
	imgContainer.appendChild(deleteBtn);
	imgContainer.classList.add("img_container");

	photoContainer.appendChild(imgContainer);
	photoContainer.classList.add("photo_container");
}

function createHeader() {
	const heading = document.createElement("p");
	const text = document.createTextNode("This is album №" + clickedId);
	heading.appendChild(text);
	heading.classList.add("photo_header_text_style");
	albumHeader.appendChild(heading);
}
// main code
createHeader();

fetch("https://jsonplaceholder.typicode.com/photos")
	.then((response) => response.json())
	.then((data) => (dataArr = [...data]))
	.then(() => {
		for (let i = clickedId * 50 - 50; i < clickedId * 50; i++) {
			renderPhoto(dataArr[i].thumbnailUrl);
		}
	});
