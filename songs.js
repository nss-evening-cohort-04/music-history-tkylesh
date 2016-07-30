/*
Requirements

Use JavaScript arrays, loops, and innerHTML to show the music you love.

Students must use JavaScript to create a list of songs in the index.html file for their Music History project. Have them download the songs.js file, which contains an array of strings with song information.

-Each student must add one song to the beginning and the end of the array.
-Loop over the array and remove any words or characters that obviously don't belong.
-Students must find and replace the > character in each item with a - character.
-Must add each string to the DOM in index.html in the main content area.

*/

var songs = [];
//adding a song to the beginning
songs[0] = "Love Song - by The Cure on the album disintegration"
songs[songs.length] = "Legs > by Z*ZTop on the album Eliminator";
songs[songs.length] = "The Logical Song > by Supertr@amp on the album Breakfast in America";
songs[songs.length] = "Another Brick in the Wall > by Pink Floyd on the album The Wall";
songs[songs.length] = "Welco(me to the Jungle > by Guns & Roses on the album Appetite for Destruction";
songs[songs.length] = "Ironi!c > by Alanis Moris*ette on the album Jagged Little Pill";
//adding a song to the end of the array
songs[songs.length] = "aliens exist - by Blink182 on the album enema of the state";

//string builder for text to display in main content section of index.html
var stringbuilder = "<h3>Songs</h3><ul>"
//element to add stringbuilder to
var songElement = document.getElementById("songs");

//loop over the array and remove any words or characters that dont belong
for (var i =0; i < songs.length; i++){
	//replacing all unwanted characters in the array items
			songs[i] = songs[i].replace(">","-");
		
			songs[i] = songs[i].replace("*","");
		
			songs[i] = songs[i].replace("@","");

			songs[i] = songs[i].replace("(","");

			songs[i] = songs[i].replace("!","");

	//adding array items to stringbuilder variable
	stringbuilder += "<li>"+songs[i]+"</li></br></br>";


	}//end of for loop

	//ending unorder list in stringbuilder
	stringbuilder +="</ul>";
	songElement.innerHTML = stringbuilder;




//console.log(songs[0].includes(">"));
//console.log(songs[0].replace(">",""));
console.log(songs);