const albumContainer = document.getElementById("album-container");
let dataArr = [];
fetch("https://jsonplaceholder.typicode.com/albums")
	.then((response) => response.json())
	.then((data) => (dataArr = [...data]))
	.then(() => {
		console.log(dataArr[0].title);
		for (let i = 0; i < 8; i++) {
			const block = document.createElement("div");
			const text = document.createTextNode(dataArr[i].title);
			block.appendChild(text);
			albumContainer.appendChild(block);
		}
	});
