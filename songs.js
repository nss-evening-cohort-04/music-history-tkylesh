/*
Requirements

Use JavaScript arrays, loops, and innerHTML to show the music you love.

Students must use JavaScript to create a list of songs in the index.html file for their Music History project. Have them download the songs.js file, which contains an array of strings with song information.

-Each student must add one song to the beginning and the end of the array.
-Loop over the array and remove any words or characters that obviously don't belong.
-Students must find and replace the > character in each item with a - character.
-Must add each string to the DOM in index.html in the main content area.

*/

// var songs = [];
// //adding a song to the beginning
// songs[0] = "Love Song - by The Cure on the album disintegration"
// songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
// songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
// songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
// songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
// songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
// //adding a song to the end of the array
// songs[songs.length] = "aliens exist - by Blink182 on the album enema of the state";
var songs;

function fileLoad(){
//parses the string received from the xhr request into an actual js object 
//so it can be worked with
	songs = JSON.parse(this.responseText);
	displayMusicList();
	};



function displayMusicList(){	
//string builder for text to display in main content section of index.html
var stringbuilder = "<h3>Songs</h3><ul>";
//element to add stringbuilder to
var songElement = document.getElementById("listsongs");

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
	stringbuilder +="</ul>";
	songElement.innerHTML = stringbuilder;
};



////////////////////////////////
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

	//function to delete a song from list after it's been added to the dom
	document.getElementById('listsongs').addEventListener('click',function(e){
		console.log("target",e.target);
		console.log("target",e.target.parentNode);
		var target = e.target;
		if(document.getElementById(target.id).innerText === "Delete"){
		target.parentNode.parentNode.removeChild(target.parentNode);
		}
	});