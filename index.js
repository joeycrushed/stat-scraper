const PORT = 8000

const express = require('express')
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')
const writeStream = fs.createWriteStream

const app = express()
const url = "https://www.pro-football-reference.com/years/2021/week_5.htm"

axios(url)
.then(response => {
    const html = response.data
    const $ = cheerio.load(html)
    const nflWeekData = []
    
    $('div.section_heading', html).each(function() {
        const week = $(this).find('h2:nth-child(1)').text()
        if(week != "" && week != null) {
            nflWeekData.push(week)
        }
    })

    $('table.teams', html).each(function() {
        const date = $(this).find('tr.date').text()
        const winningTeam = $(this).find('tr.winner > td:nth-child(1)').text()
        const winningTeamScore = $(this).find('tr.winner > td:nth-child(2)').text()
        const winningTeamStatPage = `https://www.pro-football-reference.com${$(this).find('a').attr('href')}`
        const losingTeam = $(this).find('tr.loser > td:nth-child(1)').text()
        const losingTeamScore = $(this).find('tr.loser > td:nth-child(2)').text()
        const losingTeamStatPage = `https://www.pro-football-reference.com${$(this).find('tr.loser > td > a').attr('href')}`
        const gameLink = `https://www.pro-football-reference.com${$(this).find('td.gamelink > a').attr('href')}`
        
        nflWeekData.push({
            date,
            winningTeam,
            winningTeamScore,
            losingTeam,
            losingTeamScore,
            winningTeamStatPage,
            losingTeamStatPage,
            gameLink
        })
    })
    console.log(nflWeekData)
}).catch(err => console.log(err))



app.listen(PORT, () => 
    console.log(`server running on PORT ${PORT}`)
)