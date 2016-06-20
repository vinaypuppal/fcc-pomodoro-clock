$(document).ready(function(){
  
  var breakTime = 5;
  var sessionTime = 25;
  
  var isPaused = false;
  var isSession = true;
  var isBreak = false;
  var isSessionTimer = false;
  var isBreakTimer = false;
  
  var min;
  var sec;
  var clear;
  
  var zeroPadding = function(value){
    return value < 10 ? "0"+value : value;
  };
  
  var audio = new Audio("http://www.universal-soundbank.com/802a/805020000000000000000000000pkjn800000000000000000000000000000090/g/85055050505050505050505/k/4202.MP3");
  audio.volume=0.5;
  
  $('.left').find('.inc').on('click',function(e){
    e.preventDefault();
    breakTime += 1;
    $('.left').find('.value').text(zeroPadding(breakTime));
  });

  $('.left').find('.dec').on('click',function(e){
    e.preventDefault();
    if(breakTime === 0) return;
    breakTime -= 1;
    $('.left').find('.value').text(zeroPadding(breakTime));
  });

  $('.right').find('.inc').on('click',function(e){
    e.preventDefault();
    sessionTime += 1;
    $('.right').find('.value').text(zeroPadding(sessionTime));
    if(!isSessionTimer && !isBreakTimer) $('.timer').text(zeroPadding(sessionTime) + ":00");
  });
  
  $('.right').find('.dec').on('click',function(e){
    e.preventDefault();
    if(sessionTime === 1) return;
    sessionTime -= 1;
    $('.right').find('.value').text(zeroPadding(sessionTime));
    if(!isSessionTimer && !isBreakTimer) $('.timer').text(zeroPadding(sessionTime) + ":00");
  });

var sessionTimer = function(){
  isSessionTimer = true;
  if(!isPaused){
    if(sec === 0 && min !== 0){
    sec = 59;
    min -=1;
  }else if(min===0 && sec ===0){
    //call breakTimer
    isBreak = true;
    isSession = false;
    isSessionTimer = false;
    clearInterval(clear);
    $('.title').text('Break Timer Running');
    min = breakTime;
    sec = 0;
    $('.timer').text(zeroPadding(min)+":"+'00');
    audio.play();
    swal(
    'Hey Your Session Finished!',
    'Now Break Time!',
    'success'
    ).then(function(isConfirm){
      if(isConfirm){
        breakTimer();
        clear = setInterval(breakTimer, 1000); 
      }    
    });
  return;
  }else{
    sec -=1;
  }
  console.log(min,sec);
  $('.timer').text(zeroPadding(min)+":"+zeroPadding(sec));
  }
};
  
var breakTimer = function(){
  isBreakTimer = true;
  if(!isPaused){
    if(sec === 0 && min !== 0){
    sec = 59;
    min -=1;
  }else if(min===0 && sec ===0){
    //call breakTimer
    isBreak = false;
    isSession = true;
    isBreakTimer = false;
    clearInterval(clear);
    audio.play();
    swal(
    'Hey Your Break Finished!',
    'You May Start Your Session Again!',
    'success'
    ).then(function(isConfirm){
      if(isConfirm){
        $('.start').find('.btn').show();
        $('.stop').removeClass('show').addClass('hide');
      }    
    });
    $('.title').text('Start Session Timer');
    $('.timer').text(zeroPadding(sessionTime)+":00");
    return;
  }else{
    sec -=1;
  }
  console.log(min,sec);
  $('.timer').text(zeroPadding(min)+":"+zeroPadding(sec));
  }
};

  $('.start').find('.btn').on('click',function(e){
    e.preventDefault();
    $(this).hide();
    $('.stop').removeClass('hide').addClass('show');
    min = sessionTime;
    sec = 0;
    $('.title').text('Session Timer Running');
    sessionTimer();
    clear = setInterval(sessionTimer, 1000);
  });

  $('.stop').find('.reset').on('click',function(e){
    e.preventDefault();
    $('.start').find('.btn').show();
    $('.stop').removeClass('show').addClass('hide');
    clearInterval(clear); 
    isBreak = false;
    isSession = true;
    isPaused = false;
    isSessionTimer = false;
    isBreakTimer = false;
    $('.stop').find('.pause').text("Pause");    $('.timer').text(zeroPadding(sessionTime)+":00");
    $('.title').text('Start Session Timer');
  });
  
  $('.stop').find('.pause').on('click',function(e){
    e.preventDefault();
    if(!isPaused){
      isPaused = true;
      $(this).text("Resume");
      if(isSession) $('.title').text('Session Timer Paused');
      else $('.title').text('Break Timer Paused');
    }else{
      isPaused = false;
      $(this).text("Pause");
      if(isSession) $('.title').text('Session Timer Running');
      else $('.title').text('Break Timer Running');
    }
  });
  
});