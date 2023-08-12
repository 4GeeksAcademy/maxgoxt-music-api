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
	const [color, setColor] = useState("")
	const [borde, setBorde] = useState("")
	const [botonPlay, setBotonPlay] = useState("block")
	const [botonPause, setBotonPause] = useState("none")
	const [newUrl, setNewUrl] = useState("files/mario/songs/castle.mp3")
	const http = 'https://assets.breatheco.de/apis/sound/'
	const audio = useRef()
	const lista = useRef()

	useEffect(() => {
		getInfo()
	}, [])

	function foco() {
		let items = lista.current.childNodes
		for (let idx = 0; idx < lista.current.childNodes.length; idx++) {
			items[idx].style.background = "black"
		}
		items[index].style.background = "#555"
	}

	function rastro() {
		let items = lista.current.childNodes
		for (let idx = 0; idx < lista.current.childNodes.length; idx++) {
			items[idx].style.border = ""
		}
		setBorde(["solid","2px", "#555"])
	}

	function rep() {
		console.log(songs[index].name);
		if (audio.current.paused) {
			audio.current.play();
			setBotonPlay("none")
			setBotonPause("block")
			foco()
		} else {
			audio.current.pause()
			setBotonPlay("block")
			setBotonPause("none")
			foco()
		}
	}

	function next() {
		setIndex(index + 1);
		if (index == songs.length -1) {
			setIndex(0)
		}
		audio.current.src = http + songs[index].url
		rep()
	}

	function back() {
		setIndex(index - 1);
		if (index == 0) {
			setIndex((1 - songs.length) * -1)
		}
		audio.current.src = http + songs[index].url
		rep()
		console.log(songs[index].url);
	}

	return (
		<div>
			<div className="pb-5">
				<ul className="list-group" ref={lista}>{
					songs.map((song) => {
						return <li style={{ background: 'black', border: borde}} id={song.id} onMouseEnter={() => rastro()} key={song.id}
							onClick={() => { setNewUrl(song.url); setIndex(song.id - 1); rep(); foco()}}
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
