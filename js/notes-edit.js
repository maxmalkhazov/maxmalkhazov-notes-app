'use strict'

const titleElement = document.querySelector('#note-title');
const bodyElement = document.querySelector('#note-body');
const updatedAt = document.querySelector('#note-updated-at');
const removeElement = document.querySelector('#remove-note');
const noteID = location.hash.substring(1);
let notes = getSavedData();
let note = notes.find((note) => note.id === noteID);

if (!note) {
	location.assign("/index.html");
}

titleElement.value = note.title;
bodyElement.value = note.body;
updatedAt.textContent = generateLastEdited(note.updatedAt);

titleElement.addEventListener('input', (e) => {
	note.title = e.target.value;
	note.updatedAt = moment().valueOf();
	updatedAt.textContent = generateLastEdited(note.updatedAt);
	saveData(notes);
});

bodyElement.addEventListener('input', (e) => {
	note.body = e.target.value;
	note.updatedAt = moment().valueOf();
	updatedAt.textContent = generateLastEdited(note.updatedAt);
	saveData(notes);
});

removeElement.addEventListener('click', () => {
	removeNote(note.id);
	saveData(notes);
	location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
	if (e.key === 'notes') {
		notes = JSON.parse(e.newValue);
		let note = notes.find((note) => note.id === noteID);

	if (!note) {
		location.assign("/index.html");
	}

	titleElement.value = note.title;
	bodyElement.value = note.body;
	updatedAt.textContent = generateLastEdited(note.updatedAt);
	}
})