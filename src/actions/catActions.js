import catApi from '../api/catApi';
import * as types from './actionTypes';

export function loadCats() {
	return function(dispatch) {
		return catApi.getAllCats().then(cats => {
			dispatch(loadCatsSuccess(cats));
		}).catch(error => {
			throw(error);
		});
	};
}

export function updateCat() {
	return function(dispatch) {
		return catApi.updateCat(cat).then(responseCat => {
			dispatch(updateCatSuccess(responseCat));
		}).catch(error => {
			throw(error);
		})
	};
}

export function createCat(cat) {
	return function(dispatch) {
		return catApi.createCat(cat).then(responseCat => {
			dispatch(createCatSuccess(responseCat));
			return responseCat;
		}).catch(error => {
			throw error;
		});
	}
}

export function deleteCat(cat) {
	return function(dispatch) {
		return catApi.deleteCat(cat).then(() => {
			console.log(`Deleted ${cat.id}`);
			dispatch(deleteCatSuccess(cat));
			return;
		}).catch(error => {
			throw (error);
		})
	}
}

export function loadcatsSuccess(cats) {
	return {type: types.LOAD_CATS_SUCCESS, cats};
}

export function updateCatSuccess(cat) {
	return {type: types.UPDATE_CAT_SUCCESS, cat};
}

export function createCatSuccess(cat) {
	return {type: types.CREATE_CAT_SUCCESS, cat};
}

export function deleteCatSuccess(cat) {
	return {type: types.DELETE_CAT_SUCCESS, cat};
}