let count = 0;

export function loadHistory() {
	return new Promise(resolve => {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/load-history", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = function () {
			if (xhr.status != 200) {
				alert(`Error ${xhr.status}: ${xhr.statusText}`);
			}
		};

		xhr.send(JSON.stringify({count: ++count}));

		xhr.onload = function () {
			resolve(JSON.parse(xhr.responseText));
		};
	});
}