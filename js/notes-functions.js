'use strict'

// Read existing data from local storage
const getSavedData = () => {
	const notesJSON = localStorage.getItem('notes');
	
	try {
		return notesJSON ? JSON.parse(notesJSON) : [];
	} catch (e) {
		return [];
	}
	
}

// Save data to local storage
const saveData = (notes) => {
	localStorage.setItem('notes', JSON.stringify(notes));
}

// Remove data from the list
const removeNote = (id) => {
	notes.filter((note, i) => {
		if (note.id.includes(id)) {
			notes.splice(i, 1);
		}
	});
}

// Generate the DOM structure for the data
const generateDataDOM = (note) => {
	const noteEl = document.createElement('a');
	const textEl = document.createElement('p');
	const statusEl = document.createElement('p');
	
	// Set up the link to the edit page
	noteEl.setAttribute('href', `/edit.html#${note.id}`);
	noteEl.classList.add('class', 'list-item');
	
	// Set up the note title text
	if (note.title.length > 0) {
		textEl.textContent = note.title;
	} else {
		textEl.textContent = 'Unnamed note';
	}
	
	textEl.classList.add('class', 'list-item__title');

	noteEl.appendChild(textEl);
	
	// Set up the status message
	statusEl.textContent = generateLastEdited(note.updatedAt);
	statusEl.classList.add('class', 'list-item__subtitle');
	noteEl.appendChild(statusEl);
	
	return noteEl;
}

//Sort notes by one of three ways
const sortNotes = (notes, sortBy) => {
	if (sortBy === 'byEdited') {
		return notes.sort((a, b) => {
			if (a.updatedAt > b.updatedAt) {
				return -1;
			} else if (a.updatedAt < b.updatedAt) {
				return 1;
			} else {
				return 0;
			}
		});
	} else if (sortBy === 'byCreated') {
		return notes.sort((a, b) => {
			if (a.createdAt > b.createdAt) {
				return -1;
			} else if (a.createdAt < b.createdAt) {
				return 1;
			} else {
				return 0;
			}
		});
	} else if (sortBy === 'byAlpha') {
		return notes.sort((a, b) => {
			if (a.title.toLowerCase() > b.title.toLowerCase()) {
				return 1;
			} else if (a.title.toLowerCase() < b.title.toLowerCase()) {
				return -1;
			} else {
				return 0;
			}
		});
	} else {
		return notes;
	}
}

//Render application data
const renderNotes = (notes, filters) => {
	notes = sortNotes(notes, filters.sortBy);
	const notesElement = document.querySelector('#notes');
	const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
	
	notesElement.innerHTML = '';
	
	if (filteredNotes.length > 0) {
		filteredNotes.forEach((note) => {
			const noteEl = generateDataDOM(note);
			notesElement.appendChild(noteEl);
		});
	} else {
		const message = document.createElement('p');
		message.textContent = 'No notes to display';
		notesElement.appendChild(message);
		message.classList.add('class', 'empty-message');
	}
}

// Generate last edited message
const generateLastEdited = (timeStamp) => `Last edited ${moment(timeStamp).fromNow()}`;