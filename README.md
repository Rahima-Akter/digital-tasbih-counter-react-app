# 🌙 Digital Tasbih (Islamic Prayer Counter)

> **AI-Generated Project** - This entire application was created autonomously using AI-assisted development tools and specifications.

A beautifully crafted digital Tasbih (Islamic prayer beads) application built with React, Vite, and Tailwind CSS. This elegant prayer counter helps Muslims perform dhikr (remembrance of Allah) with a premium, spiritually-inspired interface featuring a dark night-sky aesthetic, golden accents, and authentic Islamic design elements.

![Digital Tasbih Counter App Live Preview](https://digital-tasbih-counter-react-app.netlify.app/)

## ✨ Features

### Core Dhikr Functionality
- **Five Authentic Dhikr Options** with traditional targets:
  - **Subhanallah** (سُبْحَانَ اللَّهِ) — 33 times
  - **Alhamdulillah** (الْحَمْدُ لِلَّهِ) — 33 times
  - **Allahu Akbar** (اللَّهُ أَكْبَرُ) — 34 times
  - **La ilaha illallah** (لَا إِلَٰهَ إِلَّا اللَّهُ) — 100 times
  - **Astaghfirullah** (أَسْتَغْفِرُ اللَّهَ) — 100 times

### Premium Interactive Elements
- **Large Circular Tap Button** - Solid deep navy tasbih bead (hsl(215.63deg 95.08% 32%)) with:
  - Authentic 3D bead appearance
  - Sprinkler-style orange ripple animations on tap
  - No bounce effect - clean press feedback
  - Islamic decorative elements (subtle crescent motifs and gold specks)
  - Prominent "TAP" text with "to count" sublabel

- **Massive Count Display** - Ultra-rounded glassmorphism container showing:
  - Current count in giant, luminous Arabic-style numerals (96px)
  - Target number with amber-golden styling (52px)
  - "COUNT" and "TARGET" labels positioned below numbers
  - Golden divider with sparkle dots
  - Real-time percentage progress with elegant badge

### Authentic Visual Design
- **Night-Sky Theme** - Deep navy gradient background (#0f1b2d → #1a2d4a → #0d2235) evoking peaceful night prayers
- **Twinkling Stars** - 40 randomly positioned stars with gentle twinkling animation
- **Realistic Golden Moon** - Premium textured moon (68px) in top-right with:
  - Realistic crater/dent on lower-right surface
  - Subtle white glow and surface texture
  - Authentic lunar shading and depth
- **Islamic Ornamentation** - Subtle geometric patterns, crescent motifs, and Arabic calligraphy flourishes
- **Glassmorphism Effects** - Frosted glass cards with subtle borders and depth

### Smart Functionality
- **Persistent Storage** - Automatically saves counts to localStorage
- **Keyboard Support** - Press Spacebar or Enter to count without clicking
- **Haptic Feedback** - Mobile vibration on completion (where supported)
- **Completion Celebration** - "Mashallah! COMPLETED!" bounce animation with golden burst
- **Reset Functionality** - Separate reset button with premium amber gradient styling
- **Total Counter** - Running total of all dhikr counts across sessions in header

### Component Architecture
- **Separate DhikrTextCard** - Dedicated component for Arabic text, transliteration, and meaning
- **Modular DhikrCard** - Main interaction component with count display and tap button
- **Clean Code Structure** - Uses only React hooks (useState, useEffect, useCallback) and Tailwind utility classes

## 🚀 Quick Start

### Prerequisites
- **Node.js** version 18 or higher
- **npm** (comes with Node.js) or **pnpm** / **yarn**
- Modern web browser with ES2020 support

### Step 1: Clone the Repository

```bash
# Clone the project to your local machine
git clone https://github.com/Rahima-Akter/digital-tasbih-counter-react-app.git

# Navigate into the project directory
cd digital-tasbih
```

### Step 2: Install Dependencies

```bash
# Using npm (recommended)
npm install

# OR using pnpm
pnpm install

# OR using yarn
yarn install
```

### Step 3: Start the Development Server

```bash
# Start the Vite development server
npm run dev

# The app will be available at:
# Local:   http://localhost:5173/
# Network: http://192.168.x.x:5173/
```

### Step 4: Open in Browser

1. Open your web browser
2. Navigate to `http://localhost:5173`
3. Start performing dhikr by selecting a phrase and tapping the large circular button

## 📦 Build for Production

To create an optimized production build:

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🎯 How to Use

### Basic Dhikr Practice

1. **Select a Dhikr** - Click one of the pill-shaped buttons at the top to choose your phrase (Subhanallah, Alhamdulillah, etc.)

2. **Read the Card** - The Arabic text card displays:
   - Arabic script (right-to-left) in elegant Amiri font
   - Transliteration in Georgia serif
   - English meaning in uppercase

3. **Begin Counting** - Tap the large circular navy button in the center:
   - Each tap increments the counter
   - Orange "sprinkler" ripples emanate from your touch point
   - The count number updates in real-time
   - Progress percentage shows below

4. **Keyboard Alternative** - Press **Spacebar** or **Enter** instead of clicking

5. **Complete the Dhikr** - When you reach the target:
   - "Mashallah! COMPLETED!" appears with bounce animation
   - Golden burst effect radiates from the count display
   - Button becomes disabled (to prevent over-counting)
   - Haptic vibration occurs on mobile devices

6. **Reset or Continue** - Use the "Reset Current" button to start over, or switch to another dhikr using the pill buttons

### Advanced Features

- **Persistent Sessions** - Close your browser and return later - your counts are saved automatically
- **Multi-Dhikr Tracking** - Switch between different dhikr phrases and your progress is preserved for each
- **Total Statistics** - View your lifetime dhikr count in the top-right header

## 🏗️ Technical Architecture

### Project Structure
```
digital-tasbih/
├── src/
│   ├── App.tsx              # Main application component (single file)
│   ├── main.tsx             # React entry point
│   └── index.css            # Global styles and Tailwind imports
├── public/                  # Static assets
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

### Key Technologies
- **React 18** - Component-based UI with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Lightning-fast build tool and dev server
- **Tailwind CSS** - Utility-first styling framework
- **LocalStorage API** - Client-side data persistence

### Component Breakdown

**App.tsx** (single default export named `Tasbih`)
```tsx
function Tasbih() {
  // State management for counts, current dhikr, ripples, etc.
  // Keyboard event listeners
  // LocalStorage persistence effects
  // Render: Header → Dhikr Selector → Main Card → Footer
}
```

**DhikrTextCard** (separate component)
- Displays Arabic text, transliteration, and English meaning
- Glassy background with gold-orange border
- Subtle padding and rounded corners

**DhikrCard** (main interaction component)
- Count display with massive rounded typography
- Premium tap button with ripple animations
- Reset functionality and completion states

### Styling Approach
- **Pure Tailwind Classes** - No external CSS files, all styling via utility classes
- **Inline Styles** - For complex gradients and backdrop filters not covered by Tailwind
- **Custom Keyframes** - Defined in `<style>` tag for animations (twinkle, ripple, bounceIn, etc.)
- **Islamic Typography** - Amiri font for Arabic, Georgia/Times for Latin text

## 🎨 Design Philosophy

This Digital Tasbih was crafted with deep respect for Islamic aesthetics and the spiritual practice of dhikr:

1. **Spiritual Atmosphere** - The night-sky gradient with twinkling stars evokes the peaceful solitude of late-night worship (Tahajjud)

2. **Sacred Geometry** - Subtle Islamic patterns, crescent motifs, and avoiding excessive ornamentation follows traditional aniconic principles

3. **Tactile Authenticity** - The tap button mimics the weight and feel of actual tasbih beads made from precious stone

4. **Visual Hierarchy** - The massive count number draws focus to the act of remembrance itself, minimizing distractions

5. **Golden Accents** - Amber and gold tones symbolize divine light (Nur) without being ostentatious

6. **Mindful Interaction** - No gamification or points - this is a tool for worship, not entertainment

## 🤖 AI Generation Notice

**This project was created entirely through AI-assisted development.** 

- All code, styling, and component architecture was generated autonomously based on natural language specifications
- The implementation followed detailed design requirements for Islamic authenticity and premium aesthetics
- No human-written code was manually composed - the entire codebase emerged from AI generation
- This demonstrates the capability of AI to create production-ready applications with cultural sensitivity and technical excellence

The AI system utilized React best practices, Tailwind CSS utility patterns, and deep understanding of both web development and Islamic design principles to produce this finished application.

## 📱 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

**Required Features:**
- ES2020 support (optional chaining, nullish coalescing)
- CSS backdrop-filter (for glassmorphism effects - degrades gracefully)
- LocalStorage API
- Touch events (for mobile tap interaction)

## 🙏 Acknowledgements

- **Islamic tradition** - For the beautiful practice of dhikr that inspired this tool
- **Amiri Font Project** - For the authentic Arabic typography
- **Tailwind CSS** - For the utility-first styling system
- **Vite** - For the exceptional developer experience
- **The Muslim community** - May this tool aid in your remembrance of Allah

---

**"And the remembrance of Allah is greater."** — *Qur'an 29:45*

*Built with ☪ for the Ummah*