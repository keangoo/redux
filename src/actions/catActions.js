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

export function loadcatsSuccess(cats) {
	return {type: types.LOAD_CATS_SUCCESS, cats};
}