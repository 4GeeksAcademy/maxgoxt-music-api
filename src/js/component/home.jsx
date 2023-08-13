import React, { useState, useEffect, useRef } from "react";

//create your first component
const Home = () => {

	async function getInfo() {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs')     // fetch('https://playground.4geeks.com/apis/fake/sound/songs')  //especificamos la url donde vamos a buscar info
			const data = await response.json()  	//.then((response) => response.json()) // la info que llega la voy a convertir en un formato json
			setSongs(data)  	//.then((data) => setSongs(data))// convierte la info en un objeto, para que lo procesemos como queramos
		} catch (error) { 	//.catch((error) =>
			console.log("error");  // console.log(error))si hay un error me muestra cual fue
		}
	}

	const [songs, setSongs] = useState([])
	const [index, setIndex] = useState(0)
	const [botonPlay, setBotonPlay] = useState("block")
	const [botonPause, setBotonPause] = useState("none")
	const [newUrl, setNewUrl] = useState()
	const http = 'https://assets.breatheco.de/apis/sound/'
	const audio = useRef()
	const lista = useRef()

	useEffect(() => {
		getInfo()
	}, [])

	function foco(indice) {
		let items = lista.current.childNodes
		for (let idx = 0; idx < items.length; idx++) {
			items[idx].style.background = "#000"
		}
		items[indice].style.background = "#555"
	}

	function cursor(indice) {
		let items = lista.current.childNodes
		for (let idx = 0; idx < items.length; idx++) {
			items[idx].style.border = "solid 1px #000"
		}
		items[indice].style.border = "solid 1px #555"
	}

	function rep() {
		console.log(songs[index].name);
		if (audio.current.paused) {
			audio.current.src = http + songs[index].url
			audio.current.play();
			setBotonPlay("none")
			setBotonPause("block")
		} else {
			audio.current.src = http + songs[index].url
			audio.current.pause()
			setBotonPlay("block")
			setBotonPause("none")
		}
	}

	function next() {
		setIndex(index + 1);
		if (index == songs.length -1) {
			setIndex(0)
		}
		audio.current.pause()
		// audio.current.src = http + songs[index].url
		foco(index)
		rep()
	}

	function back() {
		setIndex(index - 1);
		if (index == 0) {
			setIndex((1 - songs.length) * -1)
		}
		audio.current.pause()
		// audio.current.src = http + songs[index].url
		foco(index)
		rep()
	}

	return (
		<div>
			<div className="pb-5">
				<ul className="list-group" ref={lista}>{
					songs.map((song) => {
						return <li style={{ background: '#000', border: 'solid 1px #000'}} id={song.id} onMouseEnter={() => {cursor(song.id - 1);}} key={song.id}
							onClick={() => { setNewUrl(song.url); setIndex(song.id - 1); rep(); foco(song.id - 1);}}
							className="text-white list-group-item"
						><span className="me-4 text-white-50">{song.id}</span>{song.name}</li>
					})
				}</ul>
			</div>
			<div className="bg-black bg-gradient bg-opacity-75 fixed-bottom">
				<footer className="d-flex justify-content-around my-3">
					<audio src={http + newUrl} ref={audio}></audio>
					<i onClick={() => back()} className="fa fa-backward" style={{ color: '#fff' }}></i>
					<i onClick={() => rep()} className={"fa fa-play d-" + botonPlay} style={{ color: '#fff' }}></i>
					<i onClick={() => rep()} className={"fa fa-pause d-" + botonPause} style={{ color: '#fff' }}></i>
					<i onClick={() => next()} className="fa fa-forward" style={{ color: '#fff' }}></i>
				</footer>
			</div>
		</div>
	);
};

export default Home;
