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
