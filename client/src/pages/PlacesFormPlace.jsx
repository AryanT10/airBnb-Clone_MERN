import PhotoUploader from '../PhotoUploader';
import Perks from '../Perks';
import { useState } from 'react';



export default function PlacesFormPage() {
	const [title, setTitle] = useState('');
	const [address, setAddress] = useState('');
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [description, setDescription] = useState('');
	const [perks, setPerks] = useState('');
	const [extraInfo, setExtraInfo] = useState('');
	const [checkIn, setCheckIn] = useState('');
	const [checkOut, setCheckOut] = useState('');
	const [maxGuests, setMaxGuests] = useState(1);

	function inputHeader(text) {
		return (
			<h2 className="text-2xl mt-4">{text}</h2>
		)
	}

	function inputParagraph(text) {
		return (
			<p className="text-gray-500 text-sm">{text}</p>
		);
	}

	function preInput(header, paragraph) {
		return (
			<>
				{inputHeader(header)}
				{inputParagraph(paragraph)}
			</>
		);
	}

	async function addNewPlace(ev) {
		ev.preventDefault();
		await axios.post('/places', {
			title, address, addedPhotos,
			description, extraInfo, perks,
			checkIn, checkOut, maxGuests
		});
	}

	return (
		<div>
			<form onSubmit={addNewPlace}>
				{/* Title */}
				{preInput('Title', 'title for your place. short and catchy as in advertisement')}
				<input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example : Lovely Apartment" />

				{/* Address */}
				{preInput('Address', 'Address of this place')}
				<input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />

				{/* Photos */}
				{preInput('Photos', 'photos to this place')}
				<PhotoUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

				{/* Descriptions */}
				{preInput('Description', 'Description of this place')}
				<textarea value={description} onChange={e => setDescription(e.target.value)} />

				{/* Perks: All perks sent to the Perks components */}
				{preInput('Perks', 'Select all Perks of this place')}
				<div className="grid mt-2 gap-2 grid-cols2 md:grid-cols-3 lg:grid-cols-6 ">
					<Perks selected={perks} onChange={setPerks} />
				</div>

				{/* Extra Info */}
				{preInput('Extra Information', 'house Rules etc')}
				<textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)} />

				{/* Check-In, Check-Out, Max-Guests */}
				{preInput('Check-In & Out, Max-Guests', 'Perks of this place')}
				<div className="grid gap-2 sm:grid-cols-3">

					<div className="mt-2 -mb-1">
						<h3>Check-In Time</h3>
						<input type="text"
							value={checkIn}
							onChange={e => setCheckIn(e.target.value)}
							placeholder="14" />
					</div>

					<div className="mt-2 -mb-1">
						<h3>Check-Out Time</h3>
						<input type="text"
							value={checkOut}
							onChange={e => setCheckOut(e.target.value)}
							placeholder="11" />
					</div>

					<div className="mt-2 -mb-1">
						<h3>Max-Guests</h3>
						<input type="number"
							value={maxGuests}
							onChange={e => setMaxGuests(e.target.value)} />
					</div>
				</div>
				<div>
					<button className="primary my-4">
						Save
					</button>
				</div>
			</form>
		</div>
	);

}