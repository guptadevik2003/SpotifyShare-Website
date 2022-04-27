console.log('Welcome to Spotify Share.')

async function formSubmitted() { console.log(`Modal Form Submitted`) }

const modal = document.getElementById('login-modal')

document.getElementById('modal-form').addEventListener('submit', async (e) => {
    const data = Object.fromEntries(new FormData(e.target).entries())
    
    const checkUserPasswordURL = `http://localhost:6969/api/check-user-password?user_password=${data.password}`
    // const checkUserPasswordURL = `https://spotifyshare.mapleclub.top/api/check-user-password?user_password=${data.password}`
    await fetch(checkUserPasswordURL, {
        method: 'GET'
    }).then(res => res.json())
    .then(data => {
        if (data.success) {
            modal.style.display = 'none'
            modal.style.pointerEvents = 'none'
        } else {
            window.alert('Wrong Password')
        }
    })
})