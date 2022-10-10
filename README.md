# OneT Bot

This bot is using to handle tickets final data :
- Ban reason
- Number of days the ban is during
- Game faceit link
- Player faceit link

We can have stats of moderator

## Commands available

### Global

`/take <ticket>`<br/>
`/stats` <br/>
`/stats <moderator>`<br/>

### Guild

`/ban <ticket>` -autocomplete<br/>
`/close <ticket>` -autocomplete<br/>
`/unban <player>` -autocomplete<br/>


## Automation

Each days at 9am send a message to remember that certains player needs to be unbaned

## Monitor

Monitoring logs on discord (at discord owner)

## Faceit API

Using internal api, creating ban, tempban, remove ban, get player id
