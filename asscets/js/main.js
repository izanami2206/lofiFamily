
const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

// WEATHER
const brDay = $('.background-day--no-rain')
const brNight = $('.background-night--no-rain.none')

const brDayRain = $('.background-day--rain.none')
const brNIghtRain = $('.background-night--rain.none')

// FULLSCREEN
const switchFullscreen = $('.switch-fullscreen')

// NAVIGATION
const navigation = $('.header-nav')

// SIGN/LOGIN
const signupBtn =  $('.signup-btn')
const loginBtn = $('.login-btn')

//TRAFFIC VOLUME
const trafficVolume = $('.traffic-volume')

//TRAFFIC SONG
const trafficSong = $('#traffic-song')

//RAIN VOLUME
const rainVolume = $('.rain-volume')

// RAIN SONG
const rainSong = $('#rain-song')

// SONG
const prevBtn = $('#prev')
const playBtn = $('#play')
const nextBtn = $('#next')
const audio = $('#audio')
const songVolume = $('#song-volume')


const app = {
    currentIndex : 0,
    isPlaying: false,
    song: [
        {
            name: '1',
            path: './asscets/data/music/song/1.mp3'
        },
        {
            name: '2',
            path: './asscets/data/music/song/2.mp3'
        },
        {
            name: '3',
            path: './asscets/data/music/song/3.mp3'
        },
        {
            name: '4',
            path: './asscets/data/music/song/4.mp3'
        },
        {
            name: '5',
            path: './asscets/data/music/song/5.mp3'
        },
        {
            name: '6',
            path: './asscets/data/music/song/6.mp3'
        }
    ],
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong',{
            get: function() {
                return this.song[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this;

        // Handle click PLAY
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // FULLSCREEN
        switchFullscreen.oninput = function() {
            var elem = document.documentElement;
            if (!switchFullscreen.checked) {
                elem.requestFullscreen();
                signupBtn.classList.add('none')
                loginBtn.classList.add('none')
                navigation.classList.add('none')             
            } 
            if (switchFullscreen.checked) {
                document.exitFullscreen();
                signupBtn.classList.remove('none')
                loginBtn.classList.remove('none')
                navigation.classList.remove('none') 
            }            
        }
        
        //PLAYING SONG
        audio.onplay = function() {
            _this.isPlaying = true
            playBtn.src = './asscets/data/img/musicPlayer/pause.png'
        }

        //PAUSE SONG
        audio.onpause = function() {
            _this.isPlaying = false
            playBtn.src = './asscets/data/img/musicPlayer/play.png'
        }

        //NEXT SONG
        nextBtn.onclick = function() {
            setTimeout(function() {
                _this.nextSong()
                audio.play()
            }, 200)
        }

        //PREV SONG
        prevBtn.onclick = function() {
            setTimeout(function() {
                _this.prevSong()
                audio.play()
            }, 200)
        }

        //AUDIO ENDED THEN NEXT SONG
        audio.onended = function() {
            nextBtn.click()
        }
    },
    loadCurrentSong: function() {
        audio.src = this.currentSong.path
    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.song.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.song.length-1
        }
        this.loadCurrentSong()
    },
    start: function() {
        // Handle Events
        this.handleEvents()

        //  ObjectProerty
        this.defineProperties()

        //Load Current Song
        this.loadCurrentSong()
    }
}

// Start
app.start()


// WEATHER SWITCH
function weatherSwitch() {

    var inputEvent = $('#day-check')
    var btnRain = $('.btn-switch--rain')
    
    // day / no rain
    if (inputEvent.checked == true && btnRain.checked == false) {
        brDay.classList.remove('none')
        brDayRain.classList.add('none')
        brNight.classList.add('none')
        brNIghtRain.classList.add('none')
        rainSong.pause()

        //day / rain
    } else if (inputEvent.checked == true && btnRain.checked == true) {
        brDay.classList.add('none')
        brDayRain.classList.remove('none')
        brNight.classList.add('none')
        brNIghtRain.classList.add('none')
        rainSong.play()
        
        //night / rain
    } else if (inputEvent.checked == false && btnRain.checked == true) {
        brDay.classList.add('none')
        brDayRain.classList.add('none')
        brNight.classList.add('none')
        brNIghtRain.classList.remove('none')
        rainSong.play()

        // night / no rain
    } else if (inputEvent.checked == false && btnRain.checked == false) {
        brDay.classList.add('none')
        brDayRain.classList.add('none')
        brNight.classList.remove('none')
        brNIghtRain.classList.add('none')
        rainSong.pause()
    }
}

function trafficSwitch() {

    var btnTraffic = $('.btn-switch--traffic')

    btnTraffic.oninput = function() {
        if (btnTraffic.checked) {
            trafficSong.play()
        } else {
            trafficSong.pause()
        }
    }
}


//Trafic Volume
trafficVolume.oninput = function(e) {
    trafficSong.volume = (e.target.value) / 100
}

// Rain volume      
rainVolume.oninput = function(e) {
    rainSong.volume = (e.target.value) / 100
}

// Song volume
songVolume.oninput = function(e) {
    audio.volume = (e.target.value) / 100
}

//Preloader
const preloader = $('.preloader')

var promise = Promise.resolve()

promise 
    .then(function() {
        return new Promise((resolve) => {
            setTimeout(function() {
                preloader.classList.add('preloader-animation')
                resolve(1)
            }, 2000)
        })
    })
    .then(function(data) {
        if(data == 1) {
            setTimeout(function() {
                preloader.classList.add('none')
            }, 2000)
        }
    })