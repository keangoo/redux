class CatApi {
	static getAllCats() {
		/*return fetch('http://localhost:5000/api/v1/cats').then(response => {
			return response.json();
		}).catch(error => {
			return error;
		})*/
		return [
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
		];
	}
}

export default CatApi;