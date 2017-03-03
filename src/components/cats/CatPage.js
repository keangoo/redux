import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import * as catActions from '../../actions/catActions';
import CatList from './CatList';
import HobbyList from './hobbies/HobbyList';

class CatPage extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			isEditing: false,
			cat: this.props.cat,
			catHobbies: this.props.catHobbies,
			checkBoxHobbies: this.props.checkBoxHobbies,
			saving: false
		};
		this.updateCatState = this.updateCatState.bind(this);
		this.updateCatHobbies = this.updateCatHobbies.bind(this);
		this.saveCat = this.saveCat.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.deleteCat = this.deleteCat.bind(this);
	}
	deleteCat(event) {
		this.props.actions.deleteCat(this.state.cat);
	}
	updateCatState(event) {
		const field = event.target.name;
		const cat = this.state.cat;
		cat[field] = event.target.value;
		return this.setState({cat: cat});
	}
	updateCatHobbies(event) {
		const cat = this.state.cat;
		const hobbyId = event.target.value;
		const hobby = this.state.checkBoxHobbies.filter(hobby => hobby.id == hobbyId)[0];
		const checked = !hobby.checked;
		hobby['checked'] = !hobby.checked;
		if (checked) {
			cat.hobby_ids.push(hobby.id);
		} else {
			cat.hobby_ids.splice(cat.hobby_ids.indexOf(hobby.id));
		}

		this.setState({cat:cat});
	}
	saveCat(event) {
		event.preventDefault();
		this.props.actions.updateCat(this.state.cat);
	}
	toggleEdit() {
		this.setState({isEditing: !this.state.isEditing});
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.cat.id != nextProps.cat.id) {
			this.setState({cat: nextProps.cat});
		}
		if (this.props.checkBoxHobbies.length < nextProps.checkBoxHobbies.length) {
			this.setState({catHobbies: nextProps.catHobbies, checkBoxHobbies: nextProps.checkBoxHobbies});
		}
	}
	render() {
		const cats = this.props.cats;
		if (this.state.isEditing) {
			return(
				<div>
					<h1>edit cat</h1>
					<CatForm
						cat={this.state.cat}
						hobbies={this.state.checkBoxHobbies}
						onSave={this.saveCat}
						onChange={this.updateCatState}
						onHobbyChange={this.updateCatHobbies} />
				</div>
			);
		}
		return(
			<div className="col-md-8 cold-md-offset-2">
				<h1>{this.props.cat.name}</h1>
				<p>breed: {this.props.cat.breed}</p>
				<p>weight: {this.props.cat.weight}</p>
				<p>temperament: {this.props.cat.temperament}</p>
				<HobbyList hobbies={this.props.catHobbies} />
				<button className="btn btn-default" onClick={this.toggleEdit}>Edit</button>
				<button
					onClick={this.deleteCat}
					className="btn btn-default">
					delete
				</button>
			</div>
			);
	}
}

CatPage.propTypes ={
	cats: PropTypes.array.isRequired,
	catHobbies: PropTypes.array.isRequired,
	checkBoxHobbies: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
}

function collectCatHobbies(hobbies, cat) {
	let selected = hobbies.map(hobby => {
		if (cat.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length > 0) {
			return hobby;
		}
	})
	return selected.filter(el => el != undefined);
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(catActions, dispatch);
	};
}

function mapStateToProps(state, ownProps) {
	const stateHobbies = Object.assign([], state.hobbies);
	let checkBoxHobbies = [];
	let catHobbies = [];
	let cat = {name: '', breed: '', weight: '', temperament: '', hobby_ids: []};
	let catHobbies = [];
	const catId = ownProps.params.id;
	if (catId && state.cats.length > 0 && state.hobbies.length > 0) {
		cat = getCatById(state.cats, ownProps.params.id);
		if (cat.id && cat.hobby_ids.length>0) {
			checkBoxHobbies = hobbiesForCheckboxes(stateHobbies, cat);
			catHobbies = collectCatHobbies(state.hobbies, cat);
		} else {
			checkBoxHobbies = hobbiesForCheckboxes(stateHobbies);
		}
	}
	return {cat: cat, catHobbies: catHobbies, checkBoxHobbies: checkBoxHobbies};
}

function hobbiesForCheckboxes(hobbies, cat=null) {
	return hobbies.map(hobby => {
		if (cat && cat.hobby_ids.filter(hobbyId => hobbyId == hobby.id).length > 0) {
			hobby['checked'] = true;
		} else {
			hobby['checked'] = false;
		}
		return hobby;
	});
}

export default connect(mapStateToProps, mapDispatchToProps)(CatPage);