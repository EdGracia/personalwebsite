"use client";

import { useEffect } from "react";

export default function CopyButton() {
  useEffect(() => {
    const blocks = document.querySelectorAll(".post-content pre");

    blocks.forEach((block) => {
      // Don't add twice
      if (block.querySelector(".copy-btn")) return;

      const btn = document.createElement("button");
      btn.innerText = "copy";
      btn.className = "copy-btn";

      btn.addEventListener("click", () => {
        const code = block.querySelector("code")?.innerText ?? "";
        navigator.clipboard.writeText(code).then(() => {
          btn.innerText = "copied!";
          setTimeout(() => (btn.innerText = "copy"), 2000);
        });
      });

      block.appendChild(btn);
    });
  }, []);

  return null;
}
