export function changeName(oldName, name) {
	return new Promise(resolve => {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/change-name", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = function () {
			if (xhr.status != 200) {
				alert(`Error ${xhr.status}: ${xhr.statusText}`);
			}
		};

		xhr.send(JSON.stringify({
			newNickname: name,
			oldNickname: oldName
		}));

		xhr.onload = function () {
				resolve(JSON.parse(xhr.responseText));
		};
	})
}

