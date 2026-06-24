---
name: feedback-canvas-rendering
description: "Never break canvas line paths mid-draw or change strokeStyle inside a line loop — causes visual artifacts"
metadata:
  type: feedback
---

When working on the AmbientField canvas grid, never change `strokeStyle` or call `stroke()`/`beginPath()` in the middle of drawing a single grid line. This breaks the continuous path into fragments and creates visual artifacts (white circles, broken grid lines).

**Why:** During the redesign, an attempt to add accent-colored lines near the cursor broke the grid by interrupting paths mid-draw. The user saw a white circle that hid the grid instead of the lens distortion effect.

**How to apply:** Keep one strokeStyle per full grid pass. If color variation is needed, draw a second pass on top. The displacement effect comes from the positions, not the colors. See [[design-preferences]] for the current design system.
