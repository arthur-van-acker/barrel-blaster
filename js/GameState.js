/**
 * GameState.js
 *
 * Manages the game state, entities, and game loop logic.
 * Coordinates updates and rendering for all game objects.
 */

class GameState {
    /**
     * Create a new game state
     * @param {HTMLCanvasElement} canvas - The game canvas
     * @param {Renderer} renderer - The renderer instance
     */
    constructor(canvas, renderer) {
        this.canvas = canvas;
        this.renderer = renderer;

        // Game state
        this.currentState = Constants.STATE_PLAYING;

        // Initialize input handler
        this.inputHandler = new InputHandler();

        // Initialize level
        this.level = new Level();

        // Initialize player
        this.player = new Player(
            Constants.PLAYER_START_X,
            Constants.PLAYER_START_Y,
            this.inputHandler
        );

        // Score and lives (placeholders)
        this.score = 0;
        this.lives = Constants.PLAYER_STARTING_LIVES;
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
     */
    reset() {
        this.score = 0;
        this.lives = Constants.PLAYER_STARTING_LIVES;
        this.player.reset();
        this.currentState = Constants.STATE_PLAYING;
    }
}
