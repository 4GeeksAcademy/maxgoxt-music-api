import React, { useState, useEffect, useRef} from "react";

//create your first component
const Home = () => {
	
	const [songs, setSongs] = useState([])
	const [color, setColor] = useState("")
	const [newUrl, setNewUrl] = useState("")
	const [index, setIndex] = useState()
	const [botonPlay, setBotonPlay] = useState("block")
	const [botonPause, setBotonPause] = useState("none")
	const audio = useRef()
	const lista = useRef()
	const http = 'https://assets.breatheco.de/apis/sound/'
	
	async function getInfo() {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs')     // fetch('https://playground.4geeks.com/apis/fake/sound/songs')  //especificamos la url donde vamos a buscar info
			const data = await response.json()  	//.then((response) => response.json()) // la info que llega la voy a convertir en un formato json
			setSongs(data)  	//.then((data) => setSongs(data))// convierte la info en un objeto, para que lo procesemos como queramos
		} catch (error) { 	//.catch((error) =>
			console.log("error");  // console.log(error))si hay un error me muestra cual fue
		}
	}

	useEffect(() => {
		getInfo()
	}, [])

	function rep() {
		// console.log(songs.id);
		// console.log(songs[index]);
		if (audio.current.paused) {
			audio.current.play();
			setBotonPlay("none")
			setBotonPause("block")
		}else{
			audio.current.pause()
			setBotonPlay("block")
			setBotonPause("none")
		}
	}

	function next() {
		setIndex(songs[index].id+ 1);
		if (id == songs.length - 1) {
			setIndex(0)
		}
		audio.current.src = http + songs[id].url
		console.log(songs[index].name);
	}

	function back() {
		setIndex(songs[index].id - 1);
		if (id == 0){
			setIndex((1 - songs.length) * -1)
		}
			let httpCompleto = http + songs[id].url
			audio.current.src = httpCompleto
			foco(songs[id].id)
			rep()
			console.log(songs[id].name);
	}

	function foco() {
		let items = lista.current.childNodes
		for (let idx = 0; idx < lista.current.childNodes.length; idx++) {
			items[idx].style.background = "black"
		}
		let selected = items[index].style.background;
		if (selected == "black") {
			items[index].style.background = "blue"
			}else{
			items[index].style.background = "black"
		}
	}

	return (
		<div>
			<ul className="list-group" ref={lista}>{
				songs.map((song) => {
					return <li style={{background: 'black'}} id={song.id} onMouseEnter={() => setColor(song.id)} key={song.id}
							onClick={() => {setNewUrl(song.url); setIndex(song.id-1); rep(); foco()}}
						className={"text-white list-group-item bg-opacity-" + (color == song.id ? "75" : "100")}
					><span className="me-4 text-white-50">{song.id}</span>{song.name}</li>
				})
			}</ul>
			<div className="bg-black bg-gradient bg-opacity-75 fixed-bottom">
				<footer className="d-flex justify-content-around my-3">
					<audio src={http + newUrl} ref={audio}></audio>
					<i onClick={() => back()} className="fa fa-backward" style={{ color: '#fff'}}></i>
					<i onClick={() => rep()} className={"fa fa-play d-" + botonPlay} style={{color: '#fff'}}></i>
					<i onClick={() => rep()} className={"fa fa-pause d-" + botonPause} style={{color: '#fff'}}></i>
					<i onClick={() => next()} className="fa fa-forward" style={{ color: '#fff' }}></i>
				</footer>
			</div>
		</div>
	);
};

export default Home;
