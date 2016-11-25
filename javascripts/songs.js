"use strict";


let apiKeys = {};
let uid = "";

firebase.initializeApp(config);

//////////////******************////////////////////////////////
// These Variables will contain the parsed objects returned/////
// from their respective XHR calls//////////////////////////////
let songs, moresongs, stringbuilder;
//element to add stringbuilder to
let songElement = $("#listsongs");
///////////////*****************************************////////
////////////////////////////////////////////////////////////////
//convert javascript ajax requests to jquery
// var songRequest = new XMLHttpRequest();
// songRequest.addEventListener("load",fileLoad);
// songRequest.open("GET","songs.json");
// songRequest.send();
let songRequest = () => {
 return new Promise((resolve, reject)=>{
	$.ajax({
		method: 'GET',
		url: 'songs.json'
	}).then( (response) => {
		console.log('songs response: ',response);
		 resolve(response);
		
	}, (errorResponse) => {
		reject(errorResponse);
		});
	});
};
//convert javascript ajax requests to jquery
// var moreSongsRequest = new XMLHttpRequest();
// moreSongsRequest.addEventListener('load',showMore);
// moreSongsRequest.open("GET","moresongs.json");
// moreSongsRequest.send();
let moreSongsRequest = () => {
 return new Promise((resolve, reject)=>{
	$.ajax({
		method: 'GET',
		url: 'moresongs.json'
	}).then( (response) => {
		console.log('moresongs response: ',response);
		 resolve(response);
		
	}, (errorResponse) => {
		reject(errorResponse);
		});
	});
};

///////////////*****************************************/////////
////////////////////////////////////////////////////////////////
///////////////On Document Ready///////////////////////////////
$(document).ready(()=> {

songRequest().then((dataFromSongs)=>{
	console.log('dataFromSongs: ',dataFromSongs);
	songs = dataFromSongs;
	displayMusicList(songs);
	$('#moreSongsBtn').on("click", () =>{
	moreSongsRequest().then((dataFromMoreSongs)=>{
		console.log('dataFromMoreSongs: ',dataFromMoreSongs);
		songElement.html("");
		stringbuilder = "";
		dataFromMoreSongs.songlist.forEach((song) =>{
			songs.songlist.push(song);
		});
		displayMusicList(songs);
		}).catch((error) => {
			console.log(error);
		});
	});
	$('#listMusic').on('click', listMusic);
	$('#addMusic').on('click', addMusic);
}).catch((error) => {
	console.log(error);
});


function displayMusicList(songs){
stringbuilder = "<h3>Songs</h3><ul>";	
//loop over the array and remove any words or characters that dont belong
for (var i =0; i < songs.songlist.length; i++){
	//replacing all unwanted characters in the array items
			// songs.songlist[i] = songs.songlist[i].replace(">","-");	
			// songs.songlist[i] = songs.songlist[i].replace("*","");
			// songs.songlist[i] = songs.songlist[i].replace("@","");
			// songs.songlist[i] = songs.songlist[i].replace("(","");
			// songs.songlist[i] = songs.songlist[i].replace("!","");
	//adding array items to stringbuilder variable
	stringbuilder += "<li id='song-"+i+"'>"+"title: "+songs.songlist[i].title+", artist: "+
	songs.songlist[i].artist+", album: "+songs.songlist[i].album +" <button type='button' id='button-"+
	i+"'>Delete</button></li></br></br>";
	}//end of for loop
	//ending unorder list in stringbuilder
	stringbuilder +="</ul><br/><br/>";
	stringbuilder +="<button type='button' id='moreSongsBtn' class='center-block'>More ></button><br/><br/>";
	songElement.html(stringbuilder);
}





/////////////////////////////////////////////////
//////Code for Add Music View///////////////////

	//function to show add music view
	let addMusic =() => {
		$('#listsongs').addClass('hidden');
		$('#sidebar').addClass('hidden');
		$('#addSection').removeClass('hidden');
	};

	//function to show list music view
	let listMusic =() => {
		$('#listsongs').removeClass('hidden');
		$('#sidebar').removeClass('hidden');
		$('#addSection').addClass('hidden');
	};
///////////////*****************************************//////////////////////////
/////////////////////////////////////////////////////////////////////////////////


// Once the user fills out the song form and clicks the add button, 
// you should collect all values from the input fields, 
// add the song to your array of songs, and update the song list in the DOM.
	$('#addBtn').on("click",function(){
		var title = $('#songName').val();
		var artist = $('#artistName').val();
		var album = $('#albumName').val();
		var newSongObject= {"artist":artist,"title":title,"album":album};
		songs.songlist.push(newSongObject);
		console.log("song has been temporarily added to the list music view");
		// console.log(songs.songlist[(songs.songlist.length-1)]);
		displayMusicList(songs);
		$('#songName').val("");
		$('#artistName').val("");
		$('#albumName').val("");
	});



	//function to delete a song from list after it's been added to the dom
	$('#listsongs').on('click',function(e){
		// console.log("target",e.target);
		// console.log("target",e.target.parentNode);
		var target = e.target;
		if(document.getElementById(target.id).innerText === "Delete"){
		target.parentNode.parentNode.removeChild(target.parentNode);
		}
	});
});