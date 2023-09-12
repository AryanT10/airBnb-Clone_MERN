import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';

export default function PlacesPage() {
	const { action } = useParams();
	const [title, setTitle] = useState('');
	const [address, setAddress] = useState('');
	const [addedPhotos, setAddedPhotos] = useState([]);
	const [photoLink, setPhotoLink] = useState('');
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
		<p className="text-gray-500 text-sm">{text}</p>
	}

	function preInput(header, paragraph) {
		return (
			<>
				{inputHeader(header)}
				{inputParagraph(paragraph)}
			</>
		);
	}
	return (
		<div>
			{action !== 'new' && (
				<div className="text-center">
					<Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full " to={'/account/places/new'}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
						</svg>
						Add New Places
					</Link>
				</div>
			)}
			{action === 'new' && (
				<div>
					<form>
						{/* Title */}
						{preInput('Title', 'title for your place. short and catchy as in advertisement')}
						<input type="text" value={title} onChange={e => setTitle(e.target.title)} placeholder="title, for example : Lovely Apartment" />

						{/* Address */}
						{preInput('Address', 'Address of this place')}
						<input type="text" value={address} onChange={e => setAddress(e.target.address)} placeholder="address" />

						{/* Photos */}
						{preInput('Photos', 'photos to this place')}
						<div className="flex gap-2">
							<input value={photoLink} onChange={e => setPhotoLink(e.target.photoLink)} type="text" placeholder={'Add using a link ...jpg'} />
							<button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
						</div>
						<div className="mt-2 grid grid-cols-3 md:lg-grid-cols-4 lg:grid-cols-6 ">
							<button className=" flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
								</svg>
								Upload
							</button>
						</div>

						{/* Descriptions */}
						{preInput('Description', 'Description of this place')}
						<textarea value={description} onChange={e => setDescription(e.target.description)} />

						{/* Perks: All perks sent to the Perks components */}
						{preInput('Perks', 'Select all Perks of this place')}
						<div className="grid mt-2 gap-2 grid-cols2 md:grid-cols-3 lg:grid-cols-6 ">
							<Perks selected={perks} onChange={setPerks} />
						</div>

						{/* Extra Info */}
						{preInput('Extra Information', 'house Rules etc')}
						<textarea value={extraInfo} onChange={e => setExtraInfo(e.target.setExtraInfo)} />

						{/* Check-In, Check-Out, Max-Guests */}
						{preInput('Check-In & Out, Max-Guests', 'Perks of this place')}
						<div className="grid gap-2 sm:grid-cols-3">

							<div className="mt-2 -mb-1">
								<h3>Check-In Time</h3>
								<input type="text"
									value={checkIn}
									onChange={e => setCheckIn(e.target.setCheckIn)}
									placeholder="14" />
							</div>

							<div className="mt-2 -mb-1">
								<h3>Check-Out Time</h3>
								<input type="text"
									value={checkOut}
									onChange={e => setCheckOut(e.target.setCheckOut)}
									placeholder="11" />
							</div>

							<div className="mt-2 -mb-1">
								<h3>Max-Guests</h3>
								<input type="number"
									value={maxGuests}
									onChange={e => setMaxGuests(e.target.setMaxGuests)}/>
							</div>
						</div>
						<div>
							<button className="primary my-4">
								Save
							</button>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}