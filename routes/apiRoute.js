const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

// /api
router.get('/', async (req, res) => {
    res.status(200).json({ success: true, message: `API Route Working!`, timestamp: Date.now() })
})

// /api/check-user-password
router.get('/check-user-password', async (req, res) => {
    const userPassword = process.env.USER_PASSWORD

    // /api/check-user-password?user_password=....
    const queryUserPassword = require('url').parse(req.url, true).query.user_password

    if (userPassword === queryUserPassword) {
        return res.json({ success: true })
    } else {
        return res.json({ success: false, message: "wrong_user_password" })
    }
})

// /api/fetch-access-token
router.get('/fetch-access-token', async (req, res) => {
    const userPassword = process.env.USER_PASSWORD
    
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID
    const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET

    const refreshTokenDevik = process.env.REFRESH_TOKEN_DEVIK
    const refreshTokenJiya = process.env.REFRESH_TOKEN_JIYA
    const refreshTokenPukhraj = process.env.REFRESH_TOKEN_PUKHRAJ
    const fetchForUsers = ['devik', 'jiya', 'pukhraj']
    const usersRefreshTokens = {
        "devik": refreshTokenDevik,
        "jiya": refreshTokenJiya,
        "pukhraj": refreshTokenPukhraj
    }

    // /api/fetch-access-token?user_password=....&fetch_for=....
    const query = require('url').parse(req.url, true).query

    const queryUserPassword = query.user_password
    const queryFetchFor = query.fetch_for

    // Checking if the userPassword matches
    if (userPassword !== queryUserPassword) return res.status(403).json({ error: "wrong_user_password" })

    // Getting the Fetched for User
    if (!fetchForUsers.includes(queryFetchFor)) return res.status(406).json({ error: "wrong_fetch_for_user" })

    // Getting Access Tokens from Spotify
    const refreshURL = `https://accounts.spotify.com/api/token?grant_type=refresh_token&refresh_token=${usersRefreshTokens[queryFetchFor]}&client_id=${spotifyClientId}&client_secret=${spotifyClientSecret}`

    fetch(refreshURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => res.json())
    .then(data => {
        return res.send(data)
    })
    .catch(err => {
        return res.status(400).json({ error: "error_while_fetching" })
    })
})

module.exports = router
