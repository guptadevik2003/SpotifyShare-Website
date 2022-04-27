console.log('Welcome to Spotify Share.')

const loginBtnClicked = async () => {
    const modal = document.getElementById('login-modal')
    const userPassword = document.getElementById('password').value
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
