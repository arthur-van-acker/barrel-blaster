/**
 * Level.js
 *
 * Level configuration and management.
 * Creates platforms and ladders for the game world.
 */

class Level {
    constructor() {
        this.platforms = [];
        this.ladders = [];
        this.createLevel1();
    }

    /**
     * Create the first level layout
     * Classic Donkey Kong level structure with platforms and ladders
     */
    createLevel1() {
        // Ground platform
        this.platforms.push(new Platform(0, Constants.PLATFORM_GROUND, Constants.CANVAS_WIDTH, Constants.PLATFORM_HEIGHT));

        // Platform 1 (second from bottom)
        this.platforms.push(new Platform(0, Constants.PLATFORM_1, 600, Constants.PLATFORM_HEIGHT));
        this.platforms.push(new Platform(680, Constants.PLATFORM_1, Constants.CANVAS_WIDTH - 680, Constants.PLATFORM_HEIGHT));

        // Platform 2 (middle)
        this.platforms.push(new Platform(0, Constants.PLATFORM_2, Constants.CANVAS_WIDTH, Constants.PLATFORM_HEIGHT));

        // Platform 3 (second from top)
        this.platforms.push(new Platform(0, Constants.PLATFORM_3, 600, Constants.PLATFORM_HEIGHT));
        this.platforms.push(new Platform(680, Constants.PLATFORM_3, Constants.CANVAS_WIDTH - 680, Constants.PLATFORM_HEIGHT));

        // Platform 4 (top platform)
        this.platforms.push(new Platform(0, Constants.PLATFORM_4, Constants.CANVAS_WIDTH, Constants.PLATFORM_HEIGHT));

        // Create ladders connecting platforms
        // Ladder from ground to platform 1
        this.ladders.push(new Ladder(300, Constants.PLATFORM_1, Constants.LADDER_WIDTH, Constants.PLATFORM_GROUND - Constants.PLATFORM_1));

        // Ladder from platform 1 to platform 2
        this.ladders.push(new Ladder(900, Constants.PLATFORM_2, Constants.LADDER_WIDTH, Constants.PLATFORM_1 - Constants.PLATFORM_2));

        // Ladder from platform 2 to platform 3
        this.ladders.push(new Ladder(450, Constants.PLATFORM_3, Constants.LADDER_WIDTH, Constants.PLATFORM_2 - Constants.PLATFORM_3));

        // Ladder from platform 3 to platform 4
        this.ladders.push(new Ladder(1000, Constants.PLATFORM_4, Constants.LADDER_WIDTH, Constants.PLATFORM_3 - Constants.PLATFORM_4));
    }

    /**
     * Get all platforms
     * @returns {Array<Platform>}
     */
    getPlatforms() {
        return this.platforms;
    }

    /**
     * Get all ladders
     * @returns {Array<Ladder>}
     */
    getLadders() {
        return this.ladders;
    }

    /**
     * Render the level
     * @param {Renderer} renderer
     */
    render(renderer) {
        // Render platforms
        for (const platform of this.platforms) {
            platform.render(renderer);
        }

        // Render ladders
        for (const ladder of this.ladders) {
            ladder.render(renderer);
        }
    }
}
