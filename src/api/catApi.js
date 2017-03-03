class CatApi {
	static updateCat(cat) {
		const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({cat: cat})
		})
	}
	static createCat(cat) {
		const request = new Request('http://localhost:5000/api/v1/cats',
			{
				method: 'POST',
				headers: new Headers({
					'Content-Type': 'application/json'
				}),
				body: JSON.stringify({cat:cat})
			});

		return fetch(request).then(response => {
			return response.json();
		}).catch(error => {
			return error;
		})
	}
	static deleteCat(cat) {
		const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`, {
			method: 'DELETE'
		});

		return fetch(request).then(response => {
			return response.json();
		}).catch(error => {
			return error;
		})
	}
	static getAllCats() {
		return fetch('http://localhost:5000/api/v1/cats').then(response => {
			return response.json();
		}).catch(error => {
			return error;
		})
		/*return [
		  {
		   id: 1, 
		   name: "Moe", 
		   weight: "heavy", 
		   temperament: "protective", 
		   hobby_ids: [1, 2]
		  },
		  {
		   id: 2, 
		   name: "Mini", 
		   weight: "heavy", 
		   temperament: "sweet", 
		   hobby_ids: [1]
		  }
		];*/
	}
}

export default CatApi;