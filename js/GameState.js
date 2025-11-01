/**
 * GameState.js
 *
 * Manages the game state, entities, and game loop logic.
 * Coordinates updates and rendering for all game objects.
 *
 * Implements issue #32: Level loading system
 * - Loads levels by number using Level.loadLevel()
 * - Player spawns at level-specific start position
 * - Level transitions support (loadLevel method)
 * - Extensible for multiple levels
 */

class GameState {
    /**
     * Create a new game state
     * @param {HTMLCanvasElement} canvas - The game canvas
     * @param {Renderer} renderer - The renderer instance
     * @param {number} levelNumber - The level number to load (default: 1)
     */
    constructor(canvas, renderer, levelNumber = 1) {
        this.canvas = canvas;
        this.renderer = renderer;

        // Game state
        this.currentState = Constants.STATE_PLAYING;

        // Initialize input handler
        this.inputHandler = new InputHandler();

        // Current level number
        this.currentLevelNumber = levelNumber;

        // Initialize level using Level.loadLevel() factory method (issue #32)
        this.level = Level.loadLevel(this.currentLevelNumber);

        // Get player start position from level (issue #32)
        const playerStart = this.level.getPlayerStartPosition();

        // Initialize player at level start position (issue #32)
        this.player = new Player(
            playerStart.x,
            playerStart.y,
            this.inputHandler
        );

        // TODO: Initialize DonkeyKong entity at level top when DonkeyKong class is implemented (issue #32)
        // const dkPosition = { x: Constants.DK_X, y: Constants.DK_Y };
        // this.donkeyKong = new DonkeyKong(dkPosition.x, dkPosition.y);

        // Score and lives (placeholders)
        this.score = 0;
        this.lives = Constants.PLAYER_STARTING_LIVES;
    }

    /**
     * Load a level by number (issue #32)
     * Allows transitioning between different levels
     * @param {number} levelNumber - The level number to load
     */
    loadLevel(levelNumber) {
        // Store the new level number
        this.currentLevelNumber = levelNumber;

        // Load the new level using Level.loadLevel() factory method
        this.level = Level.loadLevel(levelNumber);

        // Get player start position from level
        const playerStart = this.level.getPlayerStartPosition();

        // Reset player to level start position
        this.player.reset(playerStart.x, playerStart.y);

        // TODO: Reset DonkeyKong entity when DonkeyKong class is implemented
        // const dkPosition = { x: Constants.DK_X, y: Constants.DK_Y };
        // if (this.donkeyKong) {
        //     this.donkeyKong.reset(dkPosition.x, dkPosition.y);
        // }

        // Reset game state
        this.currentState = Constants.STATE_PLAYING;
    }

    /**
     * Update game state
     * @param {number} deltaTime - Time elapsed since last frame in seconds
     */
    update(deltaTime) {
        if (this.currentState !== Constants.STATE_PLAYING) {
            return;
        }

        // Update player
        this.player.update(
            deltaTime,
            this.level.getPlatforms(),
            this.level.getLadders()
        );

        // Keep player within bounds
        this.constrainPlayerToBounds();
    }

    /**
     * Keep player within canvas bounds
     */
    constrainPlayerToBounds() {
        // Left boundary
        if (this.player.x < 0) {
            this.player.x = 0;
            this.player.position.x = 0;
            this.player.velocity.x = 0;
        }

        // Right boundary
        if (this.player.x + this.player.width > Constants.CANVAS_WIDTH) {
            this.player.x = Constants.CANVAS_WIDTH - this.player.width;
            this.player.position.x = this.player.x;
            this.player.velocity.x = 0;
        }

        // Bottom boundary (game over if player falls off)
        if (this.player.y > Constants.CANVAS_HEIGHT) {
            this.player.reset();
        }
    }

    /**
     * Render game graphics
     * @param {Renderer} renderer - The renderer instance
     */
    render(renderer) {
        // Draw background
        renderer.clear(Constants.COLOR_BACKGROUND);

        // Render level (platforms and ladders)
        this.level.render(renderer);

        // Render player
        this.player.render(renderer);

        // Render UI
        this.renderUI(renderer);
    }

    /**
     * Render UI elements (score, lives, etc.)
     * @param {Renderer} renderer - The renderer instance
     */
    renderUI(renderer) {
        // Score
        renderer.drawText(
            `SCORE: ${this.score}`,
            20,
            30,
            Constants.COLOR_TEXT,
            '20px monospace',
            'left'
        );

        // Lives
        renderer.drawText(
            `LIVES: ${this.lives}`,
            Constants.CANVAS_WIDTH - 20,
            30,
            Constants.COLOR_TEXT,
            '20px monospace',
            'right'
        );

        // Debug info (climbing state)
        if (this.player.isClimbing) {
            renderer.drawText(
                'CLIMBING',
                Constants.CANVAS_WIDTH / 2,
                30,
                Constants.COLOR_LADDER,
                '20px monospace',
                'center'
            );
        }
    }

    /**
     * Change game state
     * @param {string} newState - The new game state
     */
    setState(newState) {
        this.currentState = newState;
    }

    /**
     * Reset game to initial state
     * Reloads current level and resets player position (issue #32)
     */
    reset() {
        this.score = 0;
        this.lives = Constants.PLAYER_STARTING_LIVES;

        // Get player start position from current level
        const playerStart = this.level.getPlayerStartPosition();
        this.player.reset(playerStart.x, playerStart.y);

        // TODO: Reset DonkeyKong entity when DonkeyKong class is implemented
        // if (this.donkeyKong) {
        //     const dkPosition = { x: Constants.DK_X, y: Constants.DK_Y };
        //     this.donkeyKong.reset(dkPosition.x, dkPosition.y);
        // }

        this.currentState = Constants.STATE_PLAYING;
    }
}
