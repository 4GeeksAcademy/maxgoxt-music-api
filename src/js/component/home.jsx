import React, { useState, useEffect, useRef} from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	
	const [songs, setSongs] = useState([])
	const [color, setColor] = useState("")
	const [url, setUrl] = useState("")
	const [boton, setBoton] = useState("block")

	const audio = useRef()

	function getInfo() {
		fetch('https://playground.4geeks.com/apis/fake/sound/songs')//especificamos la url donde vamos a buscar info
			.then((response) => response.json()) // la info que llega la voy a convertir en un formato json
			.then((data) => setSongs(data))// convierte la info en un objeto, para que lo procesemos como queramos
			.catch((error) => console.log(error))// si hay un error me muestra cual fue
	}

	useEffect(() => {
		getInfo()
	}, [])

	function play() {
		if (boton == "block") {
			audio.current.play()
		} 
	}

	return (
		<div>
			<ul className="list-group">{
				songs.map((song) => {
					return <li onMouseEnter={() => setColor(song.id)} key={song.id}
							onClick={() => setUrl(song.url)}
						className={"bg-black text-white list-group-item bg-opacity-" + (color == song.id ? "75" : "100")}
					><span className="me-4 text-white-50">{song.id}</span>{song.name}</li>
				})
			}</ul>
			<div className="bg-black bg-gradient bg-opacity-75 fixed-bottom">
				<footer className="d-flex justify-content-around my-2">
					<audio src={"https://assets.breatheco.de/apis/sound/" + url} ref={audio}></audio>
					<i className="fa fa-backward" style={{ color: '#fff'}}></i>
					<i onClick={() => play()} className="fa fa-play" style={{color: '#fff'}}></i>
					<i onClick={() => play()} className="fa fa-pause d-none" style={{color: '#fff'}}></i>
					<i className="fa fa-forward" style={{ color: '#fff' }}></i>
				</footer>
			</div>
		</div>
	);
};

export default Home;
