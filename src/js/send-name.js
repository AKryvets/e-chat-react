export function sendName(name) {
	const xhr = new XMLHttpRequest();
	let response;
	xhr.open("POST", "/name", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.onload = function () {
		if (xhr.status != 200) {
			alert(`Error ${xhr.status}: ${xhr.statusText}`);
		}
	};

	xhr.send(JSON.stringify({name: name}));

	xhr.onload = function () {
		try{
			response = JSON.parse(xhr.responseText);
		}catch (e) {
			console.log(e);
		}
	};
}