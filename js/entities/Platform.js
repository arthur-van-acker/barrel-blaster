/**
 * Platform.js
 *
 * Static platform entity for level construction.
 * Platforms provide walkable surfaces for the player and other entities.
 */

class Platform {
    /**
     * Create a new platform
     * @param {number} x - X coordinate (left edge)
     * @param {number} y - Y coordinate (top edge)
     * @param {number} width - Platform width in pixels
     * @param {number} height - Platform height in pixels
     * @param {string} color - Optional color (defaults to Constants.COLOR_PLATFORM)
     */
    constructor(x, y, width, height, color = Constants.COLOR_PLATFORM) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    /**
     * Render the platform to the canvas
     * @param {Renderer} renderer - The game renderer
     */
    render(renderer) {
        renderer.drawRect(this.x, this.y, this.width, this.height, this.color);
    }

    /**
     * Get the collision bounds of the platform
     * @returns {{x: number, y: number, width: number, height: number}} Bounding box
     */
    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
