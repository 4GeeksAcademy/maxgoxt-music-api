import React, { useState, useEffect, useRef} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [songs, setSongs] = useState([])
	const [color, setColor] = useState("")
	const [newUrl, setNewUrl] = useState("")
	const [id, setId] = useState()
	const [botonPlay, setBotonPlay] = useState("block")
	const [botonPause, setBotonPause] = useState("none")
	const audio = useRef()
	const http = 'https://assets.breatheco.de/apis/sound/'

	async function getInfo() {
		try {
			const response = await fetch('https://playground.4geeks.com/apis/fake/sound/songs')     // fetch('https://playground.4geeks.com/apis/fake/sound/songs')  //especificamos la url donde vamos a buscar info
			const data = await response.json() // 	.then((response) => response.json()) // la info que llega la voy a convertir en un formato json
			setSongs(data) // 	.then((data) => setSongs(data))// convierte la info en un objeto, para que lo procesemos como queramos
		} catch (error) {
			console.log("error"); // 	.catch((error) => console.log(error))// si hay un error me muestra cual fue
		}
	}

	useEffect(() => {
		getInfo()
	}, [])

	function rep() {
		// console.log(newUrl);
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
		setId(id + 1);
		if (id == songs.length - 1) {
			setId(0)
		}
		audio.current.src = http + songs[id].url
		rep()
		console.log(songs[id].name);
	}

	function back() {
		setId(id - 1);
		if (id == 0){
			setId((1 - songs.length) * -1)
		}
			let httpCompleto = http + songs[id].url
			audio.current.src = httpCompleto
			rep()
			console.log(songs[id].name);
	}

	return (
		<div>
			<ul className="list-group">{
				songs.map((song) => {
					return <li onMouseEnter={() => setColor('100')} key={song.id}
							onClick={() => {setNewUrl(song.url); rep(); setId(song.id)}}
						className={"bg-black text-white list-group-item bg-opacity-" + color}
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
