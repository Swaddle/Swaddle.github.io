

function countDown(dat)
{
    var happening = new Date(dat);
    var sec = 1000;
    var min = 60 * sec;
    var hr = 60 * min;
    var d = 24 * hr; 
    var timer;
    
    function showTime() 
    {
        var audio = new Audio("24.mp3");
        var now = new Date();
        var distance = happening - now;
        var days = Math.floor(distance / d);
        var hours = Math.floor((distance % d) / hr);
        var minutes = Math.floor((distance % hr) / min);
        var seconds = Math.floor((distance % min) / sec);
        
        if(days <= 9) {
            document.getElementById('days').innerHTML = "0" + days ;
        } else {
            document.getElementById('days').innerHTML = days ;
        }
        
        if(hours <= 9) {
            document.getElementById('hours').innerHTML = "0" + hours;
        } else {
            document.getElementById('hours').innerHTML = hours;
        }
        
        if(minutes <= 9) {
            document.getElementById('minutes').innerHTML = "0" + minutes;
        } else {
            document.getElementById('minutes').innerHTML = minutes;
        }
        
        if( seconds <= 9) {
            document.getElementById('seconds').innerHTML = "0" + seconds;
        } else {
            document.getElementById('seconds').innerHTML = seconds;
        }
        audio.play();
    }
    
    timer = setInterval(showTime, 1000);
}

function clock() 
{
    countDown("October 30, 2014 12:00:00")
}