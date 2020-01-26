export function authenticateUser(name,password) {
	return new Promise(resolve => {
		const xhr = new XMLHttpRequest();
		xhr.open("POST", "/authenticate-user", true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onload = function () {
			if (xhr.status != 200) {
				alert(`Error ${xhr.status}: ${xhr.statusText}`);
			}
		};
		xhr.send(JSON.stringify({
			status: true,
			nickname : name ,
			password : password
		}));

		xhr.onload = function () {
				resolve(JSON.parse(xhr.responseText));
		};
	});
}