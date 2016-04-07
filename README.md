# IN PROGRESS!

# Improved Breakout Example with Pseudo-Multiplayer 

## Intro
This is my improved submission, which diverges greatly from the original example.  This is currently in progress.  The orignal solution can be found here: [https://github.com/jesse-robertson/breakout-minimal](https://github.com/jesse-robertson/breakout-minimal)

## How To Test

1. Ensure that the $PORT and $IP environment variables are correct. These are set by default if you use cloud9.
2. Install dependencies:

    ```sh
    $ npm install
    ```
    
3. Start the server:

    ```sh
    $ node index.js
    ```

Let me know if I can assist with any questions or issues with my code.

## Checklist
I am pleased with my overall solution for a project of this size, but there are a number of changes I would make if I were to maintain this project long-term:
- Leverage ES6 capabilities, such as arrow functions, modules and classes.
- Instead of singletons for ball, paddle, wall, and brick, I would prefer to define each of these in seperate files as classes.
    - This could clean up the game's create() method by making each class responsible for its own configuration.
    - This would improve code re-use between the player ball and the 'ghost' balls of other players.
    - Each class could have an .update() method, greatly simplifying the global update() method.
- I really want to replace the brick generation double loop with a utility function such as: 

    ```javascript
    gridForEach(4, 15, i => j => {
        // Define brick here
    });
    ```

- The current BallManager has a hard dependency on socket.io, I would prefer to have it depend on a more generic pub/sub interface.
- The main game instantiaton, preload(), create(), and update() should each be in their own files.
- Even if classes are not used, create() should be split up into subroutines; a monolithic create() method for a much larger game would be hard to maintain.
- The socket event constants (i.e. BOUNCE_EVENT) are defined on both the client and the server.  This is an opportunity to leverage isomorphic code.




