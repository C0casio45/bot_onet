# OneT Bot

This bot is using to handle tickets final data :
- Ban reason
- Number of days the ban is during
- Game faceit link
- Player faceit link

We can have stats of moderator

## Commands avaiable

`/take <ticket>` -global<br/>
`/ban <ticket>` -autocomplete -guild<br/>
`/close <ticket>` -autocomplete -guild<br/>
`/unban <player>` -autocomplete -guild<br/>
`/stats` <br/>
`/stats <moderator>`<br/>

## Automation

Each days at 9am send a message to remember that certains player needs to be unbaned
Each Monday at 9am, send message to specific user

## Monitor

Monitoring logs on discord (at discord owner)

## Faceit API

Using internal api, creating ban, tempban, remove ban, get player id
