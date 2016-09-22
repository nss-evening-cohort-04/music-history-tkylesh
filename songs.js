//////////////******************////////////////////////////////
// These Variables will contain the parsed objects returned/////
// from their respective XHR calls//////////////////////////////
var songs;
var moresongs;
///////////////*****************************************////////
////////////////////////////////////////////////////////////////


function fileLoad(){
//parses the string received from the xhr request into an actual js object 
//so it can be worked with
	songs = JSON.parse(this.responseText);
	displayMusicList();
};


//string builder for text to display in main content section of index.html
var stringbuilder;
//element to add stringbuilder to
var songElement = document.getElementById("listsongs");

function displayMusicList(){
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
	stringbuilder +="<button type='button' id='moreSongsBtn'>More ></button><br/><br/>";
	songElement.innerHTML = stringbuilder;
};


//function that will execute when more button is clicked
function showMore(){
	moresongs =  JSON.parse(this.responseText);
	console.log(moresongs);
	document.getElementById('moreSongsBtn').addEventListener("click",function(){
		songElement.innerHTML ="";
		stringbuilder = "";
		for (var i =0; i < moresongs.songlist.length; i++){
		songs.songlist.push(moresongs.songlist[i]);
		};
		displayMusicList();
	})
};


/////////////////////////////////////////////////
//////Code for Add Music View///////////////////
	var addView = document.getElementById('addsongs');
	addView.innerHTML =`<div id="addMusicForm">
	<h3>Add Song</h3><br/>
		<div>
			<label class="lbl">title:<input type="text" id="songName"/></label><br/>
			<label class="lbl">artist:<input type="text" id="artistName"/></label><br/>
			<label class="lbl">album:<input type="text" id="albumName"/></label><br/><br/>
			<button type="button" id="addBtn">Add</button><br/>
		</div>
	</div>`;
	document.getElementById('addsongs').style.display="none";

	//function to show add music view
	function addMusic(){
		document.getElementById('listsongs').style.display="none";
		document.getElementById('addsongs').style.display="inline-block";
		document.getElementById('sidebar').style.display="none";
	}

	//function to show list music view
	function listMusic(){
		document.getElementById('listsongs').style.display="inline-block";
		document.getElementById('sidebar').style.display="inline-block";
		document.getElementById('addsongs').style.display="none";
	}
///////////////*****************************************//////////////////////////
/////////////////////////////////////////////////////////////////////////////////


// Once the user fills out the song form and clicks the add button, 
// you should collect all values from the input fields, 
// add the song to your array of songs, and update the song list in the DOM.
	document.getElementById('addBtn').addEventListener("click",function(){
		var title = document.getElementById('songName').value;
		var artist = document.getElementById('artistName').value;
		var album = document.getElementById('albumName').value;
		var newSongObject= {"artist":artist,"title":title,"album":album};
		songs.songlist.push(newSongObject);
		alert("song has been temporarily added to the list music view");
		// console.log(songs.songlist[(songs.songlist.length-1)]);
		displayMusicList();
		document.getElementById('songName').value="";
		document.getElementById('artistName').value="";
		document.getElementById('albumName').value="";
	});


var songRequest = new XMLHttpRequest();
songRequest.addEventListener("load",fileLoad);
songRequest.open("GET","songs.json");
songRequest.send();

var moreSongsRequest = new XMLHttpRequest();
moreSongsRequest.addEventListener('load',showMore);
moreSongsRequest.open("GET","moresongs.json");
moreSongsRequest.send();


	//function to delete a song from list after it's been added to the dom
	document.getElementById('listsongs').addEventListener('click',function(e){
		// console.log("target",e.target);
		// console.log("target",e.target.parentNode);
		var target = e.target;
		if(document.getElementById(target.id).innerText === "Delete"){
		target.parentNode.parentNode.removeChild(target.parentNode);
		}
	});