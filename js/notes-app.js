'use strict'

let notes = getSavedData();

const filters = {
	searchText: '',
	sortBy: ''
}

renderNotes(notes, filters);

document.querySelector('#create-note').addEventListener('click', () => {
	const id = uuidv4();
	const timeStamp = moment().valueOf();
	notes.push({
		id: id,
		title: '',
		body: '',
		createdAt: timeStamp,
		updatedAt: timeStamp
	});
	saveData(notes);
	location.assign(`/edit.html#${id}`);
});

document.querySelector('#search-text').addEventListener('input', (e) => {
	filters.searchText = e.target.value;
	renderNotes(notes, filters);
});

document.querySelector('#filterby').addEventListener('change', (e) => {
	filters.sortBy = e.target.value;
	renderNotes(notes, filters);
});

window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		notes = JSON.parse(e.newValue);
		renderNotes(notes, filters);
		
	}
});
