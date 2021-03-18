import React, { useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

function CreateArea(props) {
	//setting the note title and content
	const [note, setNote] = useState({
		title: '',
		content: '',
	});
	//is active refers to what is displayed in the form
	const [isActive, setIsActive] = useState(false);

	//handling change of inputs sets teh title and content to the value
	function handleChange(event) {
		const { name, value } = event.target;

		setNote((prevNote) => {
			return {
				...prevNote,
				[name]: value,
			};
		});
	}

	// values are saved as a note when add button is clicked
	function submitNote(event) {
		if (note.title === '') {
			alert('title required')
		} else {
			props.onAdd(note);
		
			setNote({
				title: '',
				content: '',
			});
			event.preventDefault();
		}
		
		
	}

	return (
		<div>
			<form className="create-note">
				{/* if the textarea is clicked then isActive set to true and the fields will be rendered */}
				{isActive && (
					<input
						name="title"
						onChange={handleChange}
						value={note.title}
						placeholder="Title"
					/>
				)}

				<textarea
					name="content"
					onClick={() => {
						setIsActive(true);
					}}
					onChange={handleChange}
					value={note.content}
					placeholder="Take a note..."
					rows={isActive ? 3 : 1}
				/>
				{/* uses pre-made components to render the button  */}

				<Zoom in={isActive}>
					<Fab onClick={submitNote}>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;
