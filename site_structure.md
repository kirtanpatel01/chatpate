# Sukoon Ki Gali ( सुकून की गली ) — Complete Feature & UX Architecture Report

Sukoon Ki Gali is a tranquil, minimalist web application built to curate peaceful music for slow, intentional listening. This document provides an exhaustive breakdown of every feature, architectural component, micro-interaction, sound design decision, and UX optimization embedded within the site.

---

## Executive Summary & Core UX Philosophy

1. **Atmospheric Immersion**: Avoiding busy streaming UIs (ads, recommendations, comment sections). The UI blends directly into a warm ambient photographic backdrop.
2. **Tactile Sound Design**: Native Web Audio SFX (`uisfx`) provides quiet physical audio feedback for every button click, seek, drawer toggle, and text keystroke.
3. **Seamless State Memory**: Player state (current track, playback timestamp, volume level, mute state, shuffle state, repeat mode, and excluded song lists) persists seamlessly across browser sessions via `localStorage`.
4. **Smart Queue Management**: Session-aware shuffle algorithms prevent song repetition across a 239-song catalog without destroying queue predictability.

---

## 1. Complete Feature Specifications

### 1.1 Audio Engine & Player Console
- **Visible Video & Focus Mode**:
  - Compact aspect-video YouTube player iframe stack with rounded corners, subtle outer glow, and ambient backdrop shadow.
  - Interactive **Focus Video Mode**: Allows toggling an expanded, enlarged view (`max-w-4xl`) for immersive video watching or compressing back to normal (`max-w-lg`).
  - **Click-to-Expand Overlay**: Clicking directly anywhere on the small video player card triggers Focus Video Mode smoothly.
- **3-Step Error Fallback Chain**:
  - When a YouTube video fails or has third-party embedding disabled (`Error 101/150`), the system smoothly transitions from the video frame to:
    1. Direct YouTube Thumbnail Artwork
    2. Ambient Blurred Background Artwork
    3. Default Sukoon Ki Gali Photographic Fallback Artwork
  - Displays a dedicated fallback banner with song title, artist, and a manual **Skip Track** button, while automatically skipping to the next playable track after 4 seconds.
- **Progress Tracking & Drag Seek**:
  - Real-time time display (`01:42 / 04:15`) updated every 500ms.
  - Interactive range slider with custom gradient track filling (`#e2b170` fill + translucent white background).
  - Smooth drag handling (`mousedown`, `mousemove`, `touchstart`, `touchmove`): Suspends auto-timer updates while dragging to prevent slider stutter, resuming instantly upon release.

### 1.2 Interactive Playlist Drawer & Queue Control
- **Glassmorphism Side Sheet**:
  - Slide-over panel (`max-w-[420px]`) rendered with `bg-[#090b10]/95`, 2xl backdrop blur, and crisp border dividers.
  - Animated slide-in transition (`translate-x-8` curve with `duration-400 ease-out`).
- **Live Search & Real-Time Filtering**:
  - Instant client-side search input filtering by track title or artist name.
  - Includes a clear (`✕`) button and empty search state message when no tracks match.
- **Active Track Equalizer Indicator**:
  - Active track in the drawer replaces its static index number (`01`) with an animated 3-bar equalizer (`eq-bounce` animation) in warm gold.
  - Auto-scrolls the active track into view (`scrollIntoView({ block: 'nearest' })`) when opened.
- **Song Exclusion / Skipping Customization**:
  - Each track in the drawer features an **Exclude Song** checkbox.
  - Excluded songs are stored in `localStorage` (`skg_excluded_songs`), dimmed (`opacity-35`), marked with a strikethrough/dash icon, and automatically skipped during linear or shuffled playback.
- **Standalone Floating Sticky Mini-Player**:
  - Positioned at the bottom of the drawer in a dedicated glassmorphism container (`bg-[#06070a]/90`).
  - Shows current song title, artist, animated equalizer indicator, and a direct **Play/Pause** button.
  - Tapping the mini-player card smoothly closes the drawer and brings focus back to the main console.

### 1.3 Smart Session-Aware Shuffle
- **Randomized Queue Architecture**:
  - Toggling shuffle constructs a randomized queue of all non-excluded songs.
- **Anti-Repeat History Buffer**:
  - Tracks played songs during the current session (up to ~30% of catalog size, max 50 songs).
  - When re-shuffling or generating a queue, recently played tracks are pushed to the tail end of the queue, guaranteeing fresh songs upfront.

### 1.4 Native Media Session API & System OS Integration
- Integrates `navigator.mediaSession` to register track title, artist, album name ("Sukoon Ki Gali"), and thumbnail artwork with the operating system.
- Supports native hardware media keys (Play/Pause, Next Track, Previous Track, Seek) on keyboards, lock-screens, and Bluetooth devices.
- Ensures playback continues smoothly when switching browser tabs or backgrounding windows.

### 1.5 Modals & Feedback System
- **Suggest a Song Modal**: Dedicated dialog for submitting song requests.
- **Leave a Note Modal**: General feedback form for user notes.
- **Shortcuts Modal**: Visual keymap cheat sheet detailing all keyboard shortcuts.
- Form submissions integrate Formspree API with active loading spinners, sound loop indicators, and success confirmation views.

---

## 2. Granular UX Decisions & Micro-Interactions

| UX Domain | Specific Design Decision | Rationale / Benefit |
|---|---|---|
| **Touch vs Desktop** | Scoped all button hover highlights under `sm:hover:` / `@media (hover: hover)`. | Eliminates "sticky yellow hover states" on mobile touch screens when tapping buttons. |
| **Tactile SFX** | Integrated quiet UI sound cues for `open`, `close`, `select`, `toggle-on`, `toggle-off`, `skip-next`, `skip-previous`, `seek`, and `typing`. | Gives the digital app a physical, mechanical instrument feel without needing audio feedback volume over 8-15%. |
| **Typography & Hierarchy** | Combines serif headers (`font-serif`, warm cream `#f5f0e1`) with monospaced numbers (`font-mono`, `#e2b170`). | Creates an inviting, editorial aesthetic suited for acoustic/peaceful music. |
| **Bottom-Left Identity** | Replaced traditional portfolio footer with: <br>`Made by Kirtan`<br>*`for people who like staying a little longer.`*<br>Social icons underneath. | Aligns with the soulful, quiet personality of the site rather than a standard corporate link bar. |
| **Transitions & Fades** | Applied text fade & drop (`opacity-0 translate-y-1.5`) when switching tracks, and scale pop-in (`scale-95` to `scale-100`) for modal dialogs. | Prevents abrupt visual jumps when text or components re-render. |
| **Up Next Preview Bar** | Included a dedicated preview bar below main controls displaying the upcoming song title and time remaining. | Gives users queue foresight without needing to open the side drawer. |
| **Non-Intrusive Controls** | Hidden scrollbars (`custom-scrollbar`), touch-action panning, and touch-manipulation rules. | Prevents accidental page zooming or awkward mobile browser scroll traps. |

---

## 3. Keyboard Shortcuts Reference

| Shortcut | Action |
|---|---|
| <kbd>Space</kbd> | Toggle Play / Pause |
| <kbd>K</kbd> | Toggle Play / Pause |
| <kbd>→</kbd> / <kbd>L</kbd> | Next Song |
| <kbd>←</kbd> / <kbd>J</kbd> | Previous Song |
| <kbd>S</kbd> | Toggle Shuffle Mode |
| <kbd>R</kbd> | Toggle Repeat Song Mode |
| <kbd>M</kbd> | Toggle Mute / Unmute |
| <kbd>Q</kbd> | Toggle Songs Drawer |
| <kbd>F</kbd> | Open Suggest a Song Modal |
| <kbd>N</kbd> | Open Leave a Note Modal |
| <kbd>?</kbd> | Toggle Keyboard Shortcuts Modal |
| <kbd>Esc</kbd> | Close any open modal or drawer |

---

## 4. Summary of Tech Stack

- **Framework**: Astro (SSG / Client Hydration)
- **Styling**: Vanilla CSS + Tailwind CSS utilities
- **Sound Engine**: `uisfx` (Web Audio API)
- **Video Engine**: YouTube IFrame Player API
- **Icons**: Hand-crafted SVG icons + Feather/Heroicons
- **Typography**: Google Fonts (Cinzel / Serif + Inter / Sans + JetBrains Mono)
