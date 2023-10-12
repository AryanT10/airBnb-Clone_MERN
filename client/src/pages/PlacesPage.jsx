import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Perks from '../Perks';
import axios from 'axios';

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
		return (
			<p className="text-gray-500 text-sm">{text}</p>
		);
	}

	async function addPhoto(e) {
		e.preventDefault();
		const { data: filename } = await axios.post('/upload-by-link', { link: photoLink })
		setAddedPhotos(prev => {
			return [...prev, filename];
		});
		setPhotoLink('');
	}

	function uploadPhoto(ev) {
		const files = ev.target.files;
		console.log(files)
		const data = new FormData();
		for (let i = 0; i < files.length; i++) {
			data.append('photos', files[i]);
		}
		console.log(data.get('photos'))
		axios.post('/upload', data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
			.then((res) => {
				const { data: filenames } = res;
				setAddedPhotos((prev) => [...prev, ...filenames]);
			})
			.catch((error) => {
				console.error('Error uploading files:', error);
			});
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
						<input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="title, for example : Lovely Apartment" />

						{/* Address */}
						{preInput('Address', 'Address of this place')}
						<input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="address" />

						{/* Photos */}
						{preInput('Photos', 'photos to this place')}
						<div className="flex gap-2">
							<input value={photoLink} onChange={e => setPhotoLink(e.target.value)} type="text" placeholder={'Add using a link ...jpg'} />
							<button onClick={addPhoto} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;Photo</button>
						</div>



						<div className="mt-2 grid gap-2 grid-cols-3 md:lg-grid-cols-4 lg:grid-cols-6 ">
							{addedPhotos.length > 0 && addedPhotos.map((link) => (
								<div>
									<img className="rounded-2xl" src={'http://localhost:4000/uploads/' + link} alt="" />
								</div>
							))}
							<label className="cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
								<input type="file" multiple className="hidden" onChange={uploadPhoto} />
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
									<path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
								</svg>
								Upload
							</label>
						</div>

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
			)}
		</div>
	)
}