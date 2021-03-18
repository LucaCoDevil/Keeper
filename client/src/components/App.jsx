import React, { useState } from 'react';
import Header from './Header';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
	const [notes, setNotes] = useState([]);

	function addNote(newNote) {
		
		axios({
			url: '/save',
			method: 'POST',
			data: newNote
		}).then(()=>{
			console.log('successfully sent the data to the server');
		}).catch(() => {
			console.log('failed to send data to the server');
		})

		axios.get('/api').then(response => {
			const data = response.data;
			setNotes((prevNotes) => {
				return [...prevNotes, data];
				//ADD DATA TO NOTES
			});
		}).catch()
	}

	function deleteNote(id) {
		setNotes((prevNotes) => {
			return prevNotes.filter((noteItem, index) => {
				return index !== id;
			});
		});
	}

	return (
		<div>
			<Header />

			<CreateArea onAdd={addNote} />
			<div id="note-container">
				{notes.map((noteItem, index) => {
					console.log(noteItem);
					return (
						<Note
							key={index}
							id={index}
							title={noteItem.title}
							content={noteItem.content}
							onDelete={deleteNote}
						/>
					);
				})}
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default App;
