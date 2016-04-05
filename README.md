# Breakout Example plus Pseudo-Multiplayer

## Intro
My immediate instinct for this project was to completely refactor it, but I 
worried that that would make it difficult for you to see what I changed for my 
solution. I will probably fork this project and do it differently, but for now 
this is my solution with minimal changes to the original example.

## Breakout AI Player
To facilitate multiplayer testing, I've created an AI system that simulates a 
skilled human player.  Feel free to use this for testing my work.  Press any key 
during the breakout game to let the AI take over.

## Solution
The original example code is still public/index.html and only contains the 
necessary changes to the create() and update() methods.  The remainder of my 
client work is located in public/_site/js/jesse/ and my server code is located 
in index.js

## Starting the Server
The server expect the $PORT and $IP environment variables to be set.  If these 
are set, the server can be started with a couple of commands:
```sh
$ npm install
$ node index.js
```
If you have any trouble with, or any questions about my work, feel free to let 
me know.

