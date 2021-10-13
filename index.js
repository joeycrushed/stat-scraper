const PORT = 8000

const express = require('express')
const app = express()
const cheerio = require('cheerio')
const axios = require('axios')
const fs = require('fs')

const getNFLData = (week, year) => {
    axios(`https://www.pro-football-reference.com/years/${year}/week_${week}.htm`)
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
        console.log(nflWeekData) /* This logs array into the console */
        return nflWeekData /* this is coming back as undefined if console.log the getNFLData() below */
    }).catch(err => console.log(err))
}

console.log(getNFLData(5,2021))

app.listen(PORT, () => 
    console.log(`server running on PORT ${PORT}`)
)