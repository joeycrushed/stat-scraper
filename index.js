const PORT = 8000

const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')


const app = express()
const url = "https://thescore.com/nfl/events/date/2021-5"


axios(url)
.then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const lost = []
    const won = []
    const scores = []
    const data = []
    $('.EventCard__eventCardContainer--3hTGN', html).each(function() {
        const lostTeam = $(this).find('div.EventCard__teamLost--2dtcV:nth-child(2)').text()
        const winningTeam = $(this).find('div.EventCard__topRow--oL3iY > div.EventCard__teamColumn--17asJ:nth-child(1)').text()
        const score = $(this).find('div.EventCard__scoreColumn--2JZbq').text()
        const matchScore = score.substring(0,2) + ' - ' + score.substring(2,6)
        data.push({
            winningTeam,
            lostTeam,
            matchScore
        })
    })
    console.log(data)
}).catch(err => console.log(err))

app.listen(PORT, () => 
    console.log(`server running on PORT ${PORT}`)
)