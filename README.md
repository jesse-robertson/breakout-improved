# Breakout Example with Pseudo-Multiplayer

## Intro
My immediate instinct for this project was to completely refactor it, but I was
worried that doing so would make it difficult for you to see what I changed for 
my solution. See *Future Considerations* for more specifics. I will probably 
fork this project and do it differently, but for now this is my solution with
minimal changes to the original example.

## Breakout AI Player
To facilitate multiplayer testing, I've created an AI system that simulates a 
skilled human player.  Feel free to use this for testing my work.  Press any key 
during the breakout game to let the AI take over.

## Where To Look
The original example code is still public/index.html and only contains the 
necessary changes to the create() and update() methods.  The remainder of my 
client work is located in public/_site/js/jesse/ and my server code is located 
in index.js.

## How To Test

1. Ensure that the $PORT and $IP environment variables are correct. These are
   set by default if you use cloud9.
2. Install dependencies:

    ```sh
    $ npm install
    ```
    
3. Start the server:

    ```sh
    $ node index.js
    ```

Let me know if I can assist with any questions or issues with my code.

## Future Considerations
I am pleased with my overall solution for a project of this size, but there are
a number of changes I would make if I were to maintain this project long-term:

- Leverage ES6 capabilities, such as arrow functions, modules and classes.
- Instead of singletons for ball, paddle, wall, and brick, I would prefer to
  define each of these in seperate files as classes.
  - This could clean up the game's create() method by making each class
    responsible for its own configuration.
  - This would improve code re-use between the player ball and the 'ghost' balls 
    of other players.
  - Each class could have an .update() method, greatly simplifying the global
    update() method.
- I really want to replace the brick generation double loop with a utility
  function such as: 

    ```javascript
    gridForEach(4, 15, i => j => {
        // Define brick here
    });
    ```

- The current BallManager has a hard dependency on socket.io, I would prefer to 
  have it depend on a more generic pub/sub interface.
- The main game instantiaton, preload(), create(), and update() should each be
  in their own files.
- Even if classes are not used, create() should be split up into subroutines;
  a monolithic create() method for a much larger game would be hard to maintain.
- The socket event constants (i.e. BOUNCE_EVENT) are defined on both the client
  and the server.  This is an opportunity to leverage isomorphic code.




