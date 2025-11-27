# 🐍 Snake Game - Next.js Edition

A modern, feature-rich implementation of the classic Snake game built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

![Snake Game](https://img.shields.io/badge/Next.js-16.0.4-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎮 Core Gameplay
- **Classic Snake Mechanics** - Navigate the snake to eat food and grow longer
- **Progressive Difficulty** - Game speed increases as you level up
- **High Score Tracking** - Persistent high score saved in localStorage
- **Power-Ups System** - 4 different power-ups for strategic gameplay
  - ⚡ **Speed Boost** - Move 30% faster
  - ⭐ **Score Multiplier** - Double points for food
  - 🛡️ **Invincibility** - Pass through walls temporarily
  - 🐌 **Slow Motion** - Slow down time by 50%

### 🎨 Visual & Audio
- **4 Beautiful Themes**
  - 🌙 Classic Dark
  - 🌊 Ocean Blue
  - 💜 Neon Purple
  - 🌲 Forest Green
- **Smooth Animations** - CSS transitions for fluid movement
- **Sound Effects** - Web Audio API synthesized sounds (eat, level up, game over, power-up)
- **Responsive Design** - Works perfectly on desktop and mobile devices

### ⚙️ Settings & Customization
- **Grid Size Configuration** - Adjustable from 10x10 to 30x30
- **Difficulty Levels** - Easy, Medium, Hard presets
- **Theme Switcher** - Change themes on the fly
- **Sound Toggle** - Enable/disable sound effects
- **Mobile Controls** - Touch-friendly directional buttons

### 📊 Statistics Tracking
- Games Played
- Best Score
- Average Score
- Total Play Time
- Best Streak

### 🛡️ Robustness & Quality
- **Error Boundaries** - Dual-layer error handling for graceful failures
- **Input Validation** - Comprehensive validation system (233 lines of validators!)
- **Safe Storage** - localStorage with memory fallback
- **TypeScript** - Full type safety with no `any` types
- **Performance Optimized** - React.memo, useCallback, memoized grid
- **Defensive Programming** - Extensive edge case handling

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/snake-game.git

# Navigate to project directory
cd snake-game

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play!

### Building for Production

```bash
npm run build
npm run start
```

## 🎮 How to Play

### Desktop Controls
- **Arrow Keys** (↑ ↓ ← →) - Move the snake
- **Space** - Pause/Resume game
- **Settings Icon** (top right) - Open settings menu

### Mobile Controls
- **Directional Buttons** - On-screen buttons to move the snake
- **Center Button** - Pause/Resume game

### Objective
1. Guide your snake to eat the red food
2. Each food eaten increases your score and length
3. Collect power-ups when they appear (every 50 points)
4. Avoid hitting walls or yourself
5. Try to beat your high score!

## 🏗️ Architecture

### Project Structure
```
app/
├── components/        # React components
│   ├── ErrorBoundary.tsx
│   ├── GameErrorBoundary.tsx
│   ├── GameStats.tsx
│   ├── Grid.tsx (memoized)
│   ├── MobileDirections.tsx
│   ├── PauseMenu.tsx
│   ├── PauseStart.tsx
│   ├── PowerUp.tsx
│   ├── Settings.tsx
│   └── Snake.tsx (memoized)
├── constants/         # Constants and configurations
│   └── themes.ts      # Theme definitions
├── hooks/            # Custom React hooks
│   ├── useGameLoop.ts
│   ├── useGameStats.ts
│   ├── useGenerateFood.ts
│   ├── useHighScore.ts
│   ├── useKeyboardControls.ts
│   ├── usePowerUps.ts
│   ├── useSetLevel.ts
│   ├── useSettings.ts
│   └── useSound.ts
├── utils/            # Utility functions
│   ├── AudioManager.ts
│   ├── safeStorage.ts
│   └── validators.ts  # 233 lines of validation logic!
├── constants.tsx     # Shared constants
├── globals.css       # Global styles
├── layout.tsx        # Root layout
├── page.tsx          # Main game component
└── types.ts          # TypeScript type definitions
```

### Tech Stack

- **Framework**: Next.js 16.0.4 (App Router)
- **React**: 19.2.0 with React Compiler
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS v4
- **Sound**: Web Audio API
- **State Management**: React hooks
- **Storage**: localStorage with memory fallback

### Key Design Patterns

1. **Component Composition** - Small, focused components
2. **Custom Hooks** - Logic separation and reusability
3. **Memoization** - Performance optimization (Grid, Snake components)
4. **Error Boundaries** - Graceful error handling at multiple levels
5. **Validation Layer** - Comprehensive input/state validation
6. **Theme System** - CSS-in-JS with theme objects

## 🎨 Themes

Each theme provides a complete color palette:
- Background colors
- Grid and UI elements
- Snake colors (body and head)
- Food color with glow effect
- Interactive elements (buttons, highlights)

Themes can be changed in the settings menu without losing game progress.

## 🔊 Sound Effects

The game uses the Web Audio API to generate synthetic sound effects:
- **Eat Sound** - Short beep when consuming food
- **Level Up** - Ascending chime when reaching new level
- **Game Over** - Descending tone when game ends
- **Power-Up** - Special effect when collecting power-ups

All sounds can be toggled in the settings menu.

## 📱 Responsive Design

The game adapts to different screen sizes:
- **Desktop**: Keyboard controls with visual hints
- **Mobile**: Touch-friendly on-screen controls
- **Tablet**: Optimized for both orientations

## 🧪 Validation & Error Handling

The game includes extensive validation:
- Point boundary checking
- Snake self-collision detection
- Food position validation
- Speed and score sanitization
- Grid size validation
- Direction change validation
- Comprehensive game state validation (development mode)

## 🚀 Performance Optimizations

- ✅ React.memo on Snake and Grid components
- ✅ useCallback for stable function references
- ✅ Memoized grid to prevent re-rendering 400+ divs
- ✅ CSS transitions over JavaScript animations
- ✅ React Compiler enabled
- ✅ Next.js automatic code splitting

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with modern React patterns and best practices
- Inspired by the classic Nokia Snake game
- Sound effects generated using Web Audio API

## 📞 Contact

Created with ❤️ by [Your Name]

---

**Enjoy the game! 🐍🎮**
