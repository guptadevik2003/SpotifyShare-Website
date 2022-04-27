console.log('Welcome to Spotify Share.')

const modal = document.getElementById('login-modal')
const passwdInput = document.getElementById('password')
let userPassword = ''

passwdInput.addEventListener('keyup', async (event) => {
    if (event.keyCode === 13) {
        event.preventDefault()
        loginBtnClicked()
    }
})

const loginBtnClicked = async () => {
    userPassword = passwdInput.value
    const checkUserPasswordURL = `https://spotifyshare.mapleclub.top/api/check-user-password?user_password=${userPassword}`
    await fetch(checkUserPasswordURL)
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            modal.style.display = 'none'
            modal.style.pointerEvents = 'none'
        } else {
            window.alert('Wrong Password')
        }
    })
}






// ==================== SPOTIFY CODE ====================

let access_token_devik = ''
let access_token_jiya = ''
let access_token_pukhraj = ''

// Document GetElementById

let devik_ele_profilepic = document.getElementById('profilepic-devik')
let devik_ele_songimage = document.getElementById('songimage-devik')
let devik_ele_songname = document.getElementById('songname-devik')
let devik_ele_artistsname = document.getElementById('artistsname-devik')
let devik_ele_songlink = document.getElementById('songlink-devik')
let devik_ele_progressbar = document.getElementById('progressbar-devik')

let jiya_ele_profilepic = document.getElementById('profilepic-jiya')
let jiya_ele_songimage = document.getElementById('songimage-jiya')
let jiya_ele_songname = document.getElementById('songname-jiya')
let jiya_ele_artistsname = document.getElementById('artistsname-jiya')
let jiya_ele_songlink = document.getElementById('songlink-jiya')
let jiya_ele_progressbar = document.getElementById('progressbar-jiya')

let pukhraj_ele_profilepic = document.getElementById('profilepic-pukhraj')
let pukhraj_ele_songimage = document.getElementById('songimage-pukhraj')
let pukhraj_ele_songname = document.getElementById('songname-pukhraj')
let pukhraj_ele_artistsname = document.getElementById('artistsname-pukhraj')
let pukhraj_ele_songlink = document.getElementById('songlink-pukhraj')
let pukhraj_ele_progressbar = document.getElementById('progressbar-pukhraj')

// Get AccessTokens Single Function

async function getAccessTokenDevik() {
    const accessTokenURL = `https://spotifyshare.mapleclub.top/api/fetch-access-token?user_password=${userPassword}&fetch_for=devik`
    await fetch(accessTokenURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.error) {
            return console.log(data.error)
        }
        access_token_devik = data.access_token
    })
}

async function getAccessTokenJiya() {
    const accessTokenURL = `https://spotifyshare.mapleclub.top/api/fetch-access-token?user_password=${userPassword}&fetch_for=jiya`
    await fetch(accessTokenURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.error) {
            return console.log(data.error)
        }
        access_token_jiya = data.access_token
    })
}

async function getAccessTokenPukhraj() {
    const accessTokenURL = `https://spotifyshare.mapleclub.top/api/fetch-access-token?user_password=${userPassword}&fetch_for=pukhraj`
    await fetch(accessTokenURL)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if (data.error) {
            return console.log(data.error)
        }
        access_token_pukhraj = data.access_token
    })
}

// Get Access Tokens Main Function

function getAccessTokensAll() {
    getAccessTokenDevik()
    getAccessTokenJiya()
    getAccessTokenPukhraj()
}

// User Data Load Single Function

function dataLoadDevik() {
    fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token_devik}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error)
            return
        }
        
        devik_ele_profilepic.src = data.images[0].url
    })
}

function dataLoadJiya() {
    fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token_jiya}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error)
            return
        }
        
        jiya_ele_profilepic.src = data.images[0].url
    })
}

function dataLoadPukhraj() {
    fetch(`https://api.spotify.com/v1/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token_pukhraj}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error)
            return
        }
        
        pukhraj_ele_profilepic.src = data.images[0].url
    })
}

// User Data Load Main Function

function userDataLoadAll() {
    dataLoadDevik()
    dataLoadJiya()
    dataLoadPukhraj()
}

// Callback Values Single Function

function callbackValueDevik() {
    fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token_devik}`
        }
    })
    .then(response => response.json())
    .catch(error => {
        devik_ele_songname.innerHTML = 'Nothing\'s Playing'
        devik_ele_songname.style.color = '#505a69'
        devik_ele_artistsname.innerHTML = ''
        devik_ele_songlink.style.display = 'none'
        devik_ele_songimage.src = 'https://spotifyshare.mapleclub.top/assets/no-song-playing.png'
        devik_ele_progressbar.style.width = '0%'
    })
    .then(data => {
        if (!data) {
            return
        }
        
        if (data.error) {
            console.log(data)
            return
        }

        if (data.currently_playing_type === 'track') {
            devik_ele_songname.innerHTML = data.item.name
            devik_ele_songlink.href = data.item.external_urls.spotify
            devik_ele_songlink.style.display = 'block'
            devik_ele_progressbar.style.width = data.progress_ms / data.item.duration_ms * 100 + '%'
            devik_ele_songimage.src = data.item.album.images[1].url

            const artistarray = data.item.artists
            const artists = []
            artistarray.forEach(function(item, index) {
                artists.push(item.name)
            })
            const artistsString = artists.join(', ')
            devik_ele_artistsname.innerHTML = artistsString

            if (data.is_playing == true) {
                devik_ele_songname.style.color = 'white'
                devik_ele_artistsname.style.color = '#090a0c'
            }
            if (data.is_playing == false) {
                devik_ele_songname.style.color = '#505a69'
                devik_ele_artistsname.style.color = '#505a69'
            }
        }

        if (data.currently_playing_type === 'ad') {
            devik_ele_songname.innerHTML = 'Advertisement'
            devik_ele_songlink.style.display = 'none'
            devik_ele_artistsname.innerHTML = 'Spotify'
            devik_ele_progressbar.style.width = data.progress_ms / 30000 * 100 + '%'
        }
    })
}

function callbackValueJiya() {
    fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token_jiya}`
        }
    })
    .then(response => response.json())
    .catch(error => {
        jiya_ele_songname.innerHTML = 'Nothing\'s Playing'
        jiya_ele_songname.style.color = '#505a69'
        jiya_ele_artistsname.innerHTML = ''
        jiya_ele_songlink.style.display = 'none'
        jiya_ele_songimage.src = 'https://spotifyshare.mapleclub.top/assets/no-song-playing.png'
        jiya_ele_progressbar.style.width = '0%'
    })
    .then(data => {
        if (!data) {
            return
        }

        if (data.error) {
            console.log(data)
            return
        }

        if (data.currently_playing_type === 'track') {
            jiya_ele_songname.innerHTML = data.item.name
            jiya_ele_songlink.href = data.item.external_urls.spotify
            jiya_ele_songlink.style.display = 'block'
            jiya_ele_progressbar.style.width = data.progress_ms / data.item.duration_ms * 100 + '%'
            jiya_ele_songimage.src = data.item.album.images[1].url

            const artistarray = data.item.artists
            const artists = []
            artistarray.forEach(function(item, index) {
                artists.push(item.name)
            })
            const artistsString = artists.join(', ')
            jiya_ele_artistsname.innerHTML = artistsString
            
            if (data.is_playing == true) {
                jiya_ele_songname.style.color = 'white'
                jiya_ele_artistsname.style.color = '#090a0c'
            }
            if (data.is_playing == false) {
                jiya_ele_songname.style.color = '#505a69'
                jiya_ele_artistsname.style.color = '#505a69'
            }
        }

        if (data.currently_playing_type === 'ad') {
            jiya_ele_songname.innerHTML = 'Advertisement'
            jiya_ele_songlink.style.display = 'none'
            jiya_ele_artistsname.innerHTML = 'Spotify'
            jiya_ele_progressbar.style.width = data.progress_ms / 30000 * 100 + '%'
        }
    })
}

function callbackValuePukhraj() {
    fetch(`https://api.spotify.com/v1/me/player/currently-playing`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token_pukhraj}`
        }
    })
    .then(response => response.json())
    .catch(error => {
        pukhraj_ele_songname.innerHTML = 'Nothing\'s Playing'
        pukhraj_ele_songname.style.color = '#505a69'
        pukhraj_ele_artistsname.innerHTML = ''
        pukhraj_ele_songlink.style.display = 'none'
        pukhraj_ele_songimage.src = 'https://spotifyshare.mapleclub.top/assets/no-song-playing.png'
        pukhraj_ele_progressbar.style.width = '0%'
    })
    .then(data => {
        if (!data) {
            return
        }

        if (data.error) {
            console.log(data)
            return
        }

        if (data.currently_playing_type === 'track') {
            pukhraj_ele_songname.innerHTML = data.item.name
            pukhraj_ele_songlink.href = data.item.external_urls.spotify
            pukhraj_ele_songlink.style.display = 'block'
            pukhraj_ele_progressbar.style.width = data.progress_ms / data.item.duration_ms * 100 + '%'
            pukhraj_ele_songimage.src = data.item.album.images[1].url

            const artistarray = data.item.artists
            const artists = []
            artistarray.forEach(function(item, index) {
                artists.push(item.name)
            })
            const artistsString = artists.join(', ')
            pukhraj_ele_artistsname.innerHTML = artistsString

            if (data.is_playing == true) {
                pukhraj_ele_songname.style.color = 'white'
                pukhraj_ele_artistsname.style.color = '#090a0c'
            }
            if (data.is_playing == false) {
                pukhraj_ele_songname.style.color = '#505a69'
                pukhraj_ele_artistsname.style.color = '#505a69'
            }
        }

        if (data.currently_playing_type === 'ad') {
            pukhraj_ele_songname.innerHTML = 'Advertisement'
            pukhraj_ele_songlink.style.display = 'none'
            pukhraj_ele_artistsname.innerHTML = 'Spotify'
            pukhraj_ele_progressbar.style.width = data.progress_ms / 30000 * 100 + '%'
        }
    })
}

// Callback Values Main Function

function callbackValuesAll() {
    callbackValueDevik()
    callbackValueJiya()
    callbackValuePukhraj()
}


// Looping System

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var loop = 'false'

async function startLoopAll() {
    loop = 'true'
    while (loop === 'true') {
        callbackValuesAll()
        await sleep(2345)
    }
}

function stopLoopAll() {
    loop = 'false'
}
