var Player = (function () {
  var toTime = function (seconds) {
    var minutes = '0' + Math.floor(seconds / 60);
    var seconds = '0' + Math.floor(seconds - minutes * 60);
    return minutes.substr(-2) + ':' + seconds.substr(-2);
  };

  var volumeIcon = function (value) {
    return value == 0 ? 'off' : (value >= 80 ? 'up' : 'down');
  };

  var player = document.getElementById('player');
  var playerControls = document.getElementById('player-controls');
  var toggleControl = document.getElementById('player-toggle');
  var volumeControl = document.getElementById('player-volume');
  var positionControl = document.getElementById('player-position');
  var positionControlBar = document.getElementById('player-position-bar');
  var positionVolumeBar = document.getElementById('player-volume-bar');
  var playerCurrentTime = document.getElementById('player-currentTime');
  var playerVolumeIndicator = document.getElementById('player-volume-indicator');
  var toggleButton;
  var currentSrc;
  (function () {
    var vol = (player.volume * 100);
    volumeControl.value = vol;
    positionVolumeBar.style.width = vol + '%';
    playerVolumeIndicator.classList.add(volumeIcon(vol));
  })();

  volumeControl.oninput = function() {
    var iconClass = (this.value == 0 ? 'off' : (this.value >= 80 ? 'up' : 'down'));
    var classList = playerVolumeIndicator.classList;
    classList.remove('up');
    classList.remove('down');
    classList.remove('off');
    classList.add(iconClass);
    positionVolumeBar.style.width = this.value + '%';
    player.volume = (this.value / 100);
  }
  positionControl.oninput = function() {
    // player.fastSeek(this.value * player.duration / 100);
    player.currentTime = Math.round(this.value * player.duration / 100);
  }
  toggleControl.addEventListener('click', function () {
    player.paused ? player.play() : player.pause();
  });
  player.onplay = function() {
    if (toggleButton) {
      toggleButton.classList.add('pause');
      toggleButton.classList.remove('paused');
    }
    toggleControl.classList.add('pause');
    // toggleControl.innerText = 'Pausar actual';
  };
  player.onpause = function () {
    toggleButton.classList.remove('pause');
    toggleButton.classList.add('paused');
    toggleControl.classList.remove('pause');
    // toggleControl.innerText = 'Reproducir actual';
  };
  player.ontimeupdate = function () {
    playerCurrentTime.innerText = toTime(this.currentTime);
    var value = Math.round(this.currentTime * 100 / this.duration);
    positionControl.value = value;
    positionControlBar.style.width = value + '%';
  }
  player.onloadedmetadata = function () {
    document.getElementById('player-endTime').innerText = toTime(this.duration);
  }
  player.onloadeddata = function () {
    console.log('loaded');
  }

  return {
    play: function (src, button) {
      playerControls.classList.add('show');
      if (src === currentSrc) {
        player.paused ? player.play() : player.pause();
        return;
      }
      currentSrc = src;
      if (toggleButton) {
        toggleButton.classList.remove('pause');
      }
      toggleButton = button;
      document.getElementById('player-track-title').innerText = button.dataset.title;
      player.src = src;
      player.play();
    }
  };
})();

(function () {
  var playButtons = document.getElementsByClassName('programa__playback');
  for (var i = 0; i < playButtons.length; i++) {
    playButtons.item(i).addEventListener('click', function (ev) {
      ev.preventDefault();
      var file = this.dataset.src;
      Player.play(file, this);
    });
  }
})();
