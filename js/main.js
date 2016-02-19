$(document).ready(function(){

		var redSound = 'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3';
		var blueSound = 'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3';
		var orangeSound = 'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3';
		var greenSound = 'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3';
		var errorSound = new Audio('http://free-sounds.net/sound-files/special-effects/SHUTDOWN.WAV');
		var victorySound = new Audio('http://free-sounds.net/sound-files/special-effects/VICTORY.WAV');
		var counter = 1;
		var sounds = [redSound, blueSound, orangeSound, greenSound];
		var gameSequence = [];
		var userSequence = [];
		var delay = 1000;


		$('.switch-bg').on('click', function(){
			$(this).find('.switch').toggleClass('switch-active'); 

			if($('.switch').hasClass('switch-active')){
				$('.switch').text('ON');
				$('.counter-display').css('color', 'red');
				$('.quarter').removeClass('running');
				$('#start-btn').on('click', function(){
					gameReset();
					gameTurn();  
				});

				$('.strict-btn').on('click', function(){
					$('.strict-btn-LED').toggleClass('strict-btn-LED-active'); 
				});

			} else {
				$('.switch').text('OFF');
				$('.counter-display').css('color', '#333333');
				$('.counter-display').text('--');
				$('.quarter').addClass('running');
				$('#start-btn').off('click');
				$('.strict-btn').off('click'); 
				 gameReset();
				 $(".quarter").off();
			}
		});

	function gameReset() {
		counter = 1;
		gameSequence = [];
		userSequence = [];
		
	}

	function gameTurn() {

		function addToGameSequence(){	 
			gameSequence.push(sounds[Math.floor(Math.random()*sounds.length)]);
		}
		
		function generateSound(){
		
		$('.counter-display').text(counter);

		for (i = 0; i<gameSequence.length; i++) {

			if(counter >= 5){ delay = 650; }
    		if(counter >= 9){ delay = 550; }
    		if(counter >= 13){ delay = 450; }


			(function(i){
	        setTimeout(function(){
	            
		        var generatedSound = Number(gameSequence[i].charAt(gameSequence[i].length - 5));
		        var audio = new Audio(gameSequence[i]);

		        console.log("game " + gameSequence);
		        console.log(generatedSound);

		        if (generatedSound === 1) {
		            $('.red').removeClass('turned-off');
		            setTimeout(lightsOut, 250);
		        } 

		        else if (generatedSound === 2) {
		            $('.blue').removeClass('turned-off');
		            setTimeout(lightsOut, 250);
		        }  

		        else if (generatedSound === 3) {
		            $('.orange').removeClass('turned-off');
		            setTimeout(lightsOut, 250);
		        } 
		        
		        else if (generatedSound === 4) {
		            $('.green').removeClass('turned-off');
		            setTimeout(lightsOut, 250);
		        } 

		        audio.play();
				
	        }, delay * i);
	    	}(i));
    	
		}
	}

	function checkForMatch(arr1, arr2) {

		for(var i = arr1.length; i--;) {

			if(arr1[i] !== arr2[i]){
				console.log("nope!");
				$('.quarter').addClass('running');
				return false;
			} 
		}
		counter++;
		return true;

	}

	addToGameSequence();
	generateSound();
	userTurn();

	function lightsOut(){
		$('.red').addClass('turned-off');	
		$('.blue').addClass('turned-off');
		$('.orange').addClass('turned-off');	
		$('.green').addClass('turned-off');
	}

	function userTurn() {

		$('.quarter').css('cursor', 'pointer');

		$(".quarter").click(function() { 

   			if ($(this).hasClass('red')) {
   		   		$(this).removeClass('turned-off');
   		   		setTimeout(lightsOut, 250);
   		   		var audio = new Audio(redSound);
   		   		audio.play();
   		   		userSequence.push(redSound);
   		   		setTimeout(checkClick, 1000);
   		   	
   		    } else if ($(this).hasClass('blue')) {
   		   		$(this).removeClass('turned-off');
   		   		setTimeout(lightsOut, 250);
   		   		var audio = new Audio(blueSound);
   		   		audio.play();
	   		   	userSequence.push(blueSound);
	   		   	setTimeout(checkClick, 1000);
   		   	
   		   	} else if ($(this).hasClass('orange')) {
   		   		$(this).removeClass('turned-off');
   		   		setTimeout(lightsOut, 250);
   		   		var audio = new Audio(orangeSound);
   		   		audio.play();
   		   		userSequence.push(orangeSound);
   		   		setTimeout(checkClick, 1000);
   		   
   		   	} else if ($(this).hasClass('green')) {
   		   		$(this).removeClass('turned-off');
   		   		setTimeout(lightsOut, 250);
   		   		var audio = new Audio(greenSound);
   		   		audio.play();
   		   		userSequence.push(greenSound);
				setTimeout(checkClick, 1000);
   		   	}
		
		});
		
	}

	function checkClick() {

		for(var i in userSequence){
     		if(gameSequence[i] !== userSequence[i]){
     			if ($('.strict-btn-LED').hasClass('strict-btn-LED-active')) {
     				$('.counter-display').text('!!');
    				errorSound.play();
					gameReset();
					addToGameSequence();
      				setTimeout(function(){
        			generateSound();
      				}, 1500);
     			} else {
       				console.log("Wrong color!")
       				$('.counter-display').text('!!');
       				console.log(userSequence + "aaaaa");
        			errorSound.play();
        			userSequence = [];
        			setTimeout(function(){
          			generateSound();
        			}, 1500);
        		}
      		}
   		}

    	if (userSequence.length === gameSequence.length) {
    		if (counter === 20) {
    			$('.counter-display').text('**');
    			victorySound.play();
				gameReset();
				addToGameSequence();
      			setTimeout(function(){
        		generateSound();
      			}, 1500);
    		} else {
      			checkForMatch(userSequence,gameSequence);
      			userSequence = [];
      			addToGameSequence();
      			setTimeout(function(){
        		generateSound();
      			}, 1500);
      		}
    	}

	}

} // end of gameTurn();

	
});