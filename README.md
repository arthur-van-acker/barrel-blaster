# Donkey Kong

A classic arcade game reimplemented using pure HTML, CSS, and JavaScript. Climb the platforms, avoid the barrels, and rescue the princess!

## Features

- Classic arcade gameplay mechanics
- Smooth character movement and jumping
- Rolling barrel obstacles
- Climbable ladders
- Platform-based level design
- Score tracking system
- Lives system
- Responsive canvas rendering

## How to Play

1. Open `index.html` in your web browser
2. Use arrow keys to move left and right
3. Press spacebar to jump
4. Climb ladders to reach higher platforms
5. Avoid rolling barrels
6. Reach the top to rescue the princess!

## Controls

- **Left Arrow** - Move left
- **Right Arrow** - Move right
- **Up Arrow** - Climb ladder up
- **Down Arrow** - Climb ladder down
- **Spacebar** - Jump

## Installation

No installation required! Simply:

```bash
git clone <repository-url>
cd DonkeyKong
```

Then open `index.html` in your web browser.

## Project Structure

```
DonkeyKong/
├── index.html          # Main HTML file with canvas
├── styles.css          # Game styling
├── game.js            # Main game loop and initialization
├── js/
│   ├── Player.js      # Player character class
│   ├── DonkeyKong.js  # Donkey Kong character class
│   ├── Barrel.js      # Barrel obstacle class
│   ├── Platform.js    # Platform class
│   ├── Ladder.js      # Ladder class
│   ├── Physics.js     # Physics and collision detection
│   ├── Input.js       # Keyboard input handler
│   └── GameState.js   # Game state management
└── assets/            # Images and sprites (if used)
```

## Development

This project uses vanilla JavaScript with no build tools or dependencies. To modify:

1. Edit the JavaScript files in `js/` directory
2. Refresh your browser to see changes
3. Use browser DevTools for debugging

### Key Components

- **Canvas Rendering**: All graphics rendered using HTML5 Canvas 2D API
- **Game Loop**: requestAnimationFrame for smooth 60 FPS gameplay
- **Physics**: Custom gravity and collision detection
- **State Management**: Simple state machine for game states

## Roadmap

- [ ] Multiple levels
- [ ] Sound effects and music
- [ ] Hammer power-up
- [ ] High score persistence (localStorage)
- [ ] Mobile touch controls
- [ ] Difficulty progression
- [ ] Animated sprites

## Technical Details

- **Language**: Pure JavaScript (ES6+)
- **Rendering**: HTML5 Canvas API
- **No Dependencies**: No frameworks or libraries required
- **Browser Support**: Modern browsers with ES6 support

## License

MIT License - Feel free to use and modify for your own projects.

## Credits

Inspired by the classic 1981 Nintendo arcade game "Donkey Kong" created by Shigeru Miyamoto.
