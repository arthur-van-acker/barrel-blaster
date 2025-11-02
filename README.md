# Barrel Blaster

A classic arcade-style platform climbing game reimplemented using pure HTML, CSS, and JavaScript. Climb the platforms, dodge the barrels, and reach the princess at the top!

![Barrel Blaster Gameplay](assets/screenshots/gameplay.png)

## About

Barrel Blaster is an educational reimplementation of classic 1980s arcade platform-climbing gameplay. Inspired by iconic arcade games of that era, this project demonstrates game development using vanilla JavaScript and HTML5 Canvas.

**Note**: This is an original implementation created for educational purposes. All code and assets are original or open-source. Not affiliated with or endorsed by Nintendo.

## Table of Contents

- [Features](#features)
- [How to Play](#how-to-play)
- [Controls](#controls)
- [Scoring System](#scoring-system)
- [Game Mechanics](#game-mechanics)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

## Features

- **Classic arcade gameplay mechanics** with smooth physics
- **State-based player sprite rendering** with 6 animation states (idle, walk, jump, climb, duck, hit)
- **Smooth character movement** with acceleration/deceleration physics
- **Variable-height jumping** - hold spacebar longer for higher jumps
- **Climbable ladders** with animated climbing
- **Platform-based level design** with multiple platforms at different heights
- **Intelligent barrel AI** - barrels roll down platforms and fall down ladders
- **Lives system** with respawn mechanics and invincibility frames
- **Hammer power-up** for smashing barrels and earning bonus points
- **Audio system** with background music and sound effects
- **Game state management** (menu, playing, paused, level complete, game over)
- **Score tracking** with high score persistence
- **Responsive canvas rendering** at 1280×720 resolution (60 FPS target)
- **Retro arcade aesthetic** with CRT monitor effects and pixel-perfect rendering

## How to Play

### Objective

Your goal is to help the protagonist climb to the top of the construction site and reach the princess while dodging rolling barrels thrown by the antagonist. Complete the level by reaching the top platform before time runs out!

### Getting Started

1. **Open the game**: Open `index.html` in your web browser
2. **Start playing**: Press **SPACE** at the menu screen to begin
3. **Navigate the level**: Use arrow keys to move and climb ladders
4. **Avoid barrels**: Jump over or dodge the rolling barrels
5. **Collect hammer**: Pick up the hammer power-up to smash barrels
6. **Reach the princess**: Climb to the top platform to complete the level
7. **Watch your lives**: You start with 3 lives - avoid getting hit by barrels

### Winning the Game

- Reach the princess at the top platform before the time limit (180 seconds) expires
- Press **SPACE** at the level complete screen to return to the menu
- Try to achieve the highest score possible!

### Game Over

- Lose all 3 lives by getting hit by barrels
- Run out of time (180 seconds)
- Press **SPACE** at the game over screen to return to the menu

## Controls

| Key | Action | Description |
|-----|--------|-------------|
| **←** (Left Arrow) | Move Left | Walk left on platforms and ladders |
| **→** (Right Arrow) | Move Right | Walk right on platforms and ladders |
| **↑** (Up Arrow) | Climb Up | Climb up ladders when positioned in front of them |
| **↓** (Down Arrow) | Climb Down | Climb down ladders when positioned in front of them |
| **SPACE** | Jump / Confirm | Jump while on platforms, confirm in menus |
| **P** or **ESC** | Pause / Resume | Pause the game during gameplay, resume when paused |

### Control Tips

- **Variable Jump Height**: Hold SPACE longer for higher jumps, release quickly for shorter hops
- **Ladder Climbing**: Stand in front of a ladder (character snaps to center) and press UP or DOWN
- **Momentum Physics**: Character has acceleration and deceleration - plan your movements
- **Dodge vs Jump**: Sometimes it's safer to duck under barrels than to jump over them

## Scoring System

Earn points by completing various actions throughout the game:

| Action | Points | Description |
|--------|--------|-------------|
| **Barrel Jump** | 100 | Successfully jump over a rolling barrel |
| **Barrel Smash** | 300 | Destroy a barrel with the hammer power-up |
| **Climbing** | 10 per meter | Earn points as you climb higher (10 points per meter of vertical progress) |
| **Reach Princess** | 1,000 | Complete the level by reaching the princess at the top |
| **Time Bonus** | 10 per second | Bonus points for each second remaining when you complete the level |

### High Score

- Your highest score is automatically saved and displayed on the game over screen
- High scores are stored in browser localStorage and persist between sessions
- Try to beat your personal best!

## Game Mechanics

### Player Movement

- **Walking**: Smooth acceleration and deceleration physics (800 px/s² acceleration, 1200 px/s² deceleration)
- **Running**: Top walking speed of 150 px/s, can be increased with momentum
- **Jumping**: Variable-height jumps up to 400 px/s initial velocity
  - Hold SPACE for maximum jump height
  - Release SPACE early for shorter hops (40% jump cut)
- **Climbing**: 100 px/s climb speed on ladders
- **Physics**: Realistic gravity at 980 px/s² (1G Earth gravity)

### Ladder Climbing

1. **Positioning**: Stand in front of a ladder (within 8 pixels of center)
2. **Snap to Center**: Character automatically aligns to ladder center
3. **Climb**: Press UP to climb up, DOWN to climb down
4. **Exit Ladder**: Press LEFT or RIGHT to step off onto a platform
5. **Animation**: Smooth climbing animation at 8 FPS

### Barrel Mechanics

- **Spawning**: Barrels are thrown by the antagonist at the top platform
  - Spawn rate: Every 2-5 seconds (randomized)
  - Maximum 8 barrels on screen at once
- **Rolling**: Barrels roll down platforms at 120 px/s
- **Ladder Behavior**: 40% chance to fall down ladders, 60% chance to continue rolling
- **Collision**: One hit from a barrel costs one life and triggers invincibility frames

### Lives System

- **Starting Lives**: 3 lives per game
- **Hit Detection**: Touching a barrel costs 1 life
- **Invincibility**: 2 seconds of invincibility after getting hit (character flashes)
- **Respawn**: After death, character respawns at starting position
- **Barrel Clear**: All barrels are cleared when player dies
- **Game Over**: Lose all 3 lives and it's game over

### Hammer Power-Up

- **Pickup**: Walk over the hammer to collect it
- **Duration**: 10 seconds of hammer time
- **Effect**: Automatically smash any barrel you touch
- **Scoring**: 300 points per barrel smashed (3x barrel jump points)
- **Animation**: Character swings hammer while active
- **Sound**: Special sound effects for pickup and barrel destruction

### Game States

1. **Menu**: Title screen with "Press SPACE to start"
2. **Playing**: Active gameplay with timer counting down
3. **Paused**: Game frozen, press P or ESC to resume
4. **Level Complete**: Victory screen when reaching the princess
5. **Game Over**: Defeat screen when losing all lives or running out of time

### Audio System

- **Background Music**: Looping arcade-style music during gameplay
- **Sound Effects**:
  - Jump sound
  - Barrel roll sound
  - Death sound
  - Hammer pickup sound
  - Barrel destroy sound
  - Level complete jingle
- **Volume Control**: Configurable master volume, music volume, and SFX volume

### Time Limit

- **Total Time**: 180 seconds (3 minutes) to complete the level
- **Timer Display**: Countdown timer shown at top of screen
- **Time Bonus**: Earn 10 points per second remaining when you complete the level
- **Time Up**: Game over if timer reaches zero

## Installation

No installation or build process required! Barrel Blaster is built with pure vanilla JavaScript and runs directly in the browser.

### Quick Start

```bash
# Clone the repository
git clone https://github.com/bearded-wizard/barrel-blaster.git
cd barrel-blaster

# Open in browser
# Simply double-click index.html or open it in your browser
```

### System Requirements

- **Browser**: Any modern browser with ES6+ support
  - Chrome 51+
  - Firefox 54+
  - Safari 10+
  - Edge 79+
- **JavaScript**: ES6+ (classes, arrow functions, const/let, template literals)
- **Canvas Support**: HTML5 Canvas 2D API
- **Screen Resolution**: 1280×720 or higher recommended

## Development Setup

### Running Locally

For development with live reload and proper asset loading:

```bash
# Option 1: Python HTTP Server (built into most systems)
python -m http.server 8000

# Option 2: Node.js HTTP Server
npx serve

# Option 3: PHP Built-in Server
php -S localhost:8000
```

Then open http://localhost:8000 in your browser.

### Making Changes

1. **Edit Code**: Modify JavaScript files in the `js/` directory
2. **Refresh Browser**: Simply refresh to see changes (no build step!)
3. **Debug**: Use browser DevTools Console for debugging
4. **Test**: Manual testing in browser (see verification steps below)

### Development Workflow

This project follows a strict development workflow:

1. **Branch Protection**: Never push directly to `main` branch
2. **Feature Branches**: Create feature branches: `feature/`, `fix/`, `issue/[#]-description`
3. **Conventional Commits**: Use conventional commit format (`feat:`, `fix:`, `docs:`, etc.)
4. **Pull Requests**: All changes via PR with comprehensive description
5. **Code Review**: Review agent evaluates PRs against 13 criteria
6. **Versioning**: Semantic versioning with changelog updates

### Adding New Features

When adding new entities or systems, follow the established architecture:

**Entities** (`js/entities/`):
- Implement `update(deltaTime, gameState)` method
- Implement `render(ctx)` method
- Use Constants for all configurable values
- Handle own collision logic

**Systems** (`js/systems/`):
- Provide services to entities
- Keep stateless where possible
- Examples: Physics, Renderer, CollisionDetector

**Constants** (`js/utils/Constants.js`):
- Add all new configuration values here
- Never hardcode magic numbers
- Object is frozen to prevent modification

### Script Loading Order

**Critical**: When adding new files, add script tags to `index.html` in the correct dependency order:

1. **Utilities** (Vector2D, Constants) - Foundation classes
2. **Systems** (InputHandler, Renderer, Physics, etc.) - Core game systems
3. **Entities** (Player, Barrel, DonkeyKong, etc.) - Game objects
4. **Level** - Level construction
5. **GameState & main.js** - State management and entry point

### Testing

This project uses manual browser testing. Test checklist:

```bash
# Start development server
python -m http.server 8000

# Open browser to http://localhost:8000
# Then verify:
# ✓ Game loads without console errors
# ✓ Player movement with arrow keys
# ✓ Jump with spacebar
# ✓ Ladder climbing works
# ✓ Barrel spawning and collision
# ✓ Lives system and respawn
# ✓ Hammer power-up functionality
# ✓ Score tracking
# ✓ Level complete by reaching princess
# ✓ Pause with P or ESC
# ✓ Game over screen
# ✓ Audio system (music and SFX)
# ✓ 60 FPS performance (check DevTools)
```

See [TESTING.md](TESTING.md) for comprehensive end-to-end test checklists.

### Code Style

- **ES6+**: Use modern JavaScript features (classes, arrow functions, const/let)
- **Naming**:
  - `camelCase` for variables and functions
  - `PascalCase` for classes
  - `UPPER_SNAKE_CASE` for constants
- **Comments**: JSDoc style for classes and complex functions
- **Formatting**: 4-space indentation, consistent style
- **Constants**: All magic numbers in `Constants.js`

## Project Structure

```
barrel-blaster/
├── index.html                     # Main HTML file with canvas element
├── styles.css                     # Game styling (retro arcade theme)
├── LICENSE                        # MIT License
├── README.md                      # This file
├── CHANGELOG.md                   # Version history (Keep a Changelog format)
├── CLAUDE.md                      # AI assistant project instructions
├── TESTING.md                     # Comprehensive E2E testing documentation
│
├── .claude/
│   └── project.yml                # Project configuration for Claude agents
│
├── assets/
│   ├── sounds/                    # Audio files (OGG format)
│   │   ├── music.ogg              # Background music
│   │   ├── jump.ogg               # Jump sound effect
│   │   ├── barrel_roll.ogg        # Barrel rolling sound
│   │   ├── death.ogg              # Death sound
│   │   ├── hammer_pickup.ogg      # Hammer pickup sound
│   │   ├── barrel_destroy.ogg     # Barrel smash sound
│   │   └── level_complete.ogg     # Level complete jingle
│   │
│   ├── sprites/                   # Sprite images (PNG)
│   │   ├── player-new-platformer.png      # Player sprite (128×128, New Platformer Pack)
│   │   ├── antagonist-happy.png           # DonkeyKong sprite (96×96, Simplified Pack)
│   │   ├── antagonist-walk.png            # DonkeyKong walk sprite
│   │   ├── antagonist-throw.png           # DonkeyKong throw sprite
│   │   ├── princess/                      # Princess sprites (128×128)
│   │   │   ├── character_pink_idle.png
│   │   │   └── character_pink_front.png
│   │   ├── barrel.png             # Barrel sprite
│   │   ├── hammer.png             # Hammer power-up sprite
│   │   └── LICENSE-kenney.txt     # Sprite attribution (CC0 by Kenney)
│   │
│   └── screenshots/               # Game screenshots
│       └── gameplay.png           # Gameplay screenshot for README
│
└── js/
    ├── main.js                    # Entry point and game loop
    │
    ├── utils/
    │   ├── Vector2D.js            # 2D vector math utilities
    │   └── Constants.js           # Global game constants (frozen object)
    │
    ├── systems/
    │   ├── InputHandler.js        # Keyboard input handling
    │   ├── Renderer.js            # Canvas rendering wrapper
    │   ├── Physics.js             # Physics system (gravity, velocity)
    │   ├── CollisionDetector.js   # Collision detection utilities
    │   └── AudioManager.js        # Audio system (music and SFX)
    │
    ├── entities/
    │   ├── Player.js              # Player character (protagonist)
    │   ├── Platform.js            # Platform obstacles
    │   ├── Ladder.js              # Climbable ladders
    │   ├── Barrel.js              # Rolling barrel obstacles
    │   ├── DonkeyKong.js          # Antagonist character
    │   ├── Princess.js            # Princess character at top
    │   └── Hammer.js              # Hammer power-up (stub)
    │
    ├── level/
    │   ├── Level.js               # Base level class
    │   └── Level1.js              # Level 1 configuration
    │
    ├── Game.js                    # Main game class with state management
    └── GameState.js               # Gameplay state management
```

## Technical Details

### Architecture

- **Language**: Pure JavaScript (ES6+)
- **Rendering**: HTML5 Canvas 2D API
- **Resolution**: 1280×720 pixels (16:9 aspect ratio)
- **Frame Rate**: 60 FPS target using `requestAnimationFrame()`
- **Physics**: Custom gravity-based physics system (980 px/s²)
- **Pattern**: Entity-component-system architecture
- **No Dependencies**: Zero npm packages, frameworks, or build tools
- **Browser Only**: Runs directly in browser with no server required

### Key Systems

| System | Description | Location |
|--------|-------------|----------|
| **Game Loop** | `requestAnimationFrame()` with delta time | `main.js` |
| **Renderer** | Canvas 2D API wrapper with pixel-perfect rendering | `Renderer.js` |
| **Physics** | Gravity, velocity, acceleration, collision | `Physics.js` |
| **Input** | Keyboard event handling | `InputHandler.js` |
| **Audio** | Web Audio API for music and sound effects | `AudioManager.js` |
| **State Machine** | 5 game states (menu, playing, paused, complete, over) | `GameState.js` |
| **Collision** | AABB collision detection | `CollisionDetector.js` |

### Constants System

All game parameters are centralized in `js/utils/Constants.js` (frozen object):

```javascript
const Constants = {
    // Screen dimensions
    CANVAS_WIDTH: 1280,
    CANVAS_HEIGHT: 720,

    // Physics
    GRAVITY: 980,              // pixels per second squared
    JUMP_VELOCITY: -400,       // pixels per second

    // Player
    PLAYER_WIDTH: 32,
    PLAYER_HEIGHT: 48,
    PLAYER_WALK_SPEED: 150,
    PLAYER_ACCELERATION: 800,

    // Scoring
    POINTS_BARREL_JUMP: 100,
    POINTS_BARREL_SMASH: 300,
    POINTS_REACH_PRINCESS: 1000,

    // ... 50+ more constants
};

Object.freeze(Constants); // Prevent modification
```

**Why centralized constants?**
- Easy to tune game balance
- No magic numbers scattered in code
- Single source of truth
- Prevents accidental modification

### Coordinate System

- **Origin**: (0, 0) at top-left corner of canvas
- **Y-Axis**: Increases downward (standard canvas orientation)
- **Platform Heights**: Measured from top (e.g., ground: 670, top: 120)
- **All Measurements**: In pixels

### Performance

- **Target FPS**: 60 frames per second
- **Delta Time**: Variable time step for consistent physics
- **Efficient Rendering**: Only active entities rendered
- **Entity Limits**: Maximum 8 barrels on screen
- **Profiling**: Use browser DevTools Performance tab

### Browser Compatibility

Requires modern browsers with:
- ✅ ES6+ support (classes, const/let, arrow functions, template literals)
- ✅ HTML5 Canvas 2D API
- ✅ requestAnimationFrame
- ✅ Web Audio API (optional for audio)
- ✅ localStorage (optional for high scores)

**Tested On**:
- Chrome 51+
- Firefox 54+
- Safari 10+
- Edge 79+

**Not Supported**:
- Internet Explorer (no ES6 support)
- Very old mobile browsers

## Contributing

This is an educational project, but contributions are welcome! Here's how you can help:

### Reporting Bugs

1. Check existing issues first
2. Create a new issue with:
   - Clear description of the bug
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and OS version
   - Console errors (if any)

### Suggesting Features

1. Check roadmap in README
2. Open an issue with:
   - Feature description
   - Use case / motivation
   - Proposed implementation (optional)

### Submitting Code

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/my-feature`
3. **Follow code style**: ES6+, use Constants.js, add comments
4. **Test thoroughly**: Manual browser testing
5. **Update CHANGELOG.md**: Document your changes
6. **Commit conventionally**: `feat:`, `fix:`, `docs:`, etc.
7. **Push**: `git push origin feature/my-feature`
8. **Create Pull Request**: With comprehensive description

### Pull Request Guidelines

Your PR should include:
- **Clear title**: Following conventional commit format
- **Description**: What and why you changed it
- **Acceptance criteria**: Checklist of what was implemented
- **Test plan**: Manual testing steps performed
- **Screenshots**: If visual changes
- **Breaking changes**: Clearly marked if any

### Development Workflow

This project uses:
- **Branch Protection**: Never commit directly to `main`
- **Feature Branches**: `feature/`, `fix/`, `issue/[#]-description`
- **Conventional Commits**: For semantic versioning
- **Pull Requests**: All changes reviewed before merge
- **Semantic Versioning**: `vX.Y.Z` tags
- **Keep a Changelog**: Detailed changelog in CHANGELOG.md

### Code Review Process

PRs are evaluated against 13 criteria (target 85/100):
1. **Correctness** (25%) - Does it work perfectly?
2. **Testing** (20%) - Thoroughly tested?
3. **Code Style** (10%) - Follows conventions?
4. **Design Patterns** (10%) - SOLID principles?
5. **Readability** (7%) - Clear and maintainable?
6. **Performance** (7%) - Efficient algorithms?
7. **Error Handling** (7%) - Edge cases handled?
8. **Maintainability** (6%) - Easy to modify?
9. **Documentation** (4%) - Updated docs?
10. **Code Duplication** (4%) - DRY principle?
11. **Business Logic** (3%) - Requirements met?
12. **Time Complexity** (2%) - Optimal algorithms?
13. **Space Complexity** (2%) - Efficient memory?

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### Summary

```
MIT License

Copyright (c) 2025 Donkey Kong Project Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

**You are free to:**
- ✅ Use the code for personal or commercial projects
- ✅ Modify the code
- ✅ Distribute the code
- ✅ Sublicense the code

**Conditions:**
- Include the original copyright notice and license in any copy
- No warranty provided

## Credits

### Game Design

- **Inspired by**: Classic 1980s arcade platform-climbing games
- **Original Implementation**: Created from scratch for educational purposes
- **Not affiliated with**: Nintendo or any official arcade game franchise

### Assets

#### Sprites

All sprites by **[Kenney](https://kenney.nl)** (CC0 License - Public Domain):

- **Protagonist (Player)**:
  - [New Platformer Pack](https://kenney.nl/assets/platformer-characters)
  - Beige character sprite (128×128)
  - 6 animation states (idle, walk, jump, climb, duck, hit)

- **Antagonist (DonkeyKong)**:
  - [Simplified Platformer Pack](https://kenney.nl/assets/platformer-characters)
  - Antagonist character sprites (96×96)
  - 3 sprite variations (happy, walk, throw)

- **Princess**:
  - [Platformer Characters Pack](https://kenney.nl/assets/platformer-characters)
  - Pink character sprite (128×128)

All sprites are licensed under **CC0 1.0 Universal (Public Domain)**. Full attribution in `assets/sprites/LICENSE-kenney.txt`.

#### Audio

Audio system implemented with Web Audio API. Sound files are placeholders for future implementation.

### Development

- **Created by**: Educational project contributors
- **Language**: Pure vanilla JavaScript (ES6+)
- **Framework**: None (zero dependencies!)
- **Tools**: Browser DevTools for debugging and profiling

### Special Thanks

- **Kenney** for amazing CC0 sprite assets
- **MDN Web Docs** for excellent Canvas API documentation
- Classic arcade games for timeless gameplay inspiration
- Open source community for feedback and contributions

---

## Version History

**Latest Version**: v0.36.0 (2025-11-02)

See [CHANGELOG.md](CHANGELOG.md) for detailed version history following [Keep a Changelog](https://keepachangelog.com/) format.

## Roadmap

Future enhancements planned:

- [x] Player movement and physics
- [x] Ladder climbing mechanics
- [x] Platform collision detection
- [x] Player sprite animations (6 states)
- [x] Game state management (menu, pause, game over)
- [x] Level architecture with Level1 implementation
- [x] Barrel obstacles with rolling physics
- [x] Lives system with respawn mechanics
- [x] Audio system (music and sound effects)
- [x] Hammer power-up (stub implemented)
- [x] Score tracking and high score persistence
- [x] Princess character at level completion
- [x] DonkeyKong antagonist with barrel throwing
- [ ] Multiple levels (Level 2, Level 3, etc.)
- [ ] Full hammer power-up implementation
- [ ] Mobile touch controls
- [ ] Difficulty progression
- [ ] Leaderboard system
- [ ] Additional power-ups
- [ ] Boss battles

---

**Educational Project** - Created to demonstrate vanilla JavaScript game development techniques using HTML5 Canvas API.

**Play now**: Simply open `index.html` in your browser and start climbing!

---

*For more information, check out the [project repository](https://github.com/bearded-wizard/barrel-blaster) or read the [CLAUDE.md](CLAUDE.md) for AI assistant instructions.*
