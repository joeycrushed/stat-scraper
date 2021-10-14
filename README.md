# NFL Statistic Scraper

I couldn't find a decent API for my NFL statistic application that wasn't behind a paywall - so I decided that I'll create my own API by scraping the data from pro-football-reference. Currently You can dynamically
input the week number of the american football year and the year to bring back data about that weeks scores.

### Key Functionality

- A user can create a json file using the getNFLData() function
- Calling getNFLData(5,2021) will save a stats.json file from Week 5 of the 2021 season.
- Currenty Data is the stats file date, winning team name, losing team name, winning team score, losing Team score, links to team statistics on pro-football.

### Tech used

- node
- express
- cheerio
- axios

