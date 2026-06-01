"use client";

import { useEffect } from "react";

export default function CopyButton() {
  useEffect(() => {
    const blocks = document.querySelectorAll(".post-content pre");

    blocks.forEach((block) => {
      // Don't add twice
      if (block.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      const copyIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`;
      const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 12 4 16"/></svg>`;

      btn.innerHTML = copyIcon;
      btn.className = "copy-btn";

      btn.addEventListener("click", () => {
        const code = block.querySelector("code")?.innerText ?? "";
        navigator.clipboard.writeText(code).then(() => {
          btn.innerHTML = checkIcon;
          setTimeout(() => (btn.innerHTML = copyIcon), 2000);
        });
      });

      block.appendChild(btn);
    });
  }, []);

  return null;
}
