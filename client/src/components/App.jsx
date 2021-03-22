import React, { useState, useEffect } from 'react';
import Header from './Header';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';

function App() {
	const [notes, setNotes] = useState([]);

	function getData() {
		
		axios.get('/api').then(response => {
			const data = response.data;
			setNotes(data);
		}).catch((err) => {
			alert(err)
		})
	}

	function addNote(newNote) {
		
		axios({
			url: '/save',
			method: 'POST',
			data: newNote
		}).catch((err) => {
			alert(err);
		})
		getData();
	}

	useEffect(() => {
		getData();
	}, [])

	function deleteNote(data, id) {
		setNotes((prevNotes) => {
			return prevNotes.filter((noteItem, index) => {
				return index !== id;
			});
			});
		axios({
			url: "/delete",
			method: "POST",
			data: data
		}).catch((err) => {
			alert(err);
			getData()
		})
		
	}

	return (
		<div>
			<Header />

			<CreateArea onAdd={addNote} />
			<div id="note-container">
				{notes.map((noteItem, index) => {
					return (
						<Note
							key={index}
							id={index}
							data={ noteItem}
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
