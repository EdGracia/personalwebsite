import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ed Gracia — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#18181b",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          position: "relative",
        }}
      >
        {/* Top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: "linear-gradient(90deg, #ffffff, transparent)",
          }}
        />

        {/* Label */}
        <div
          style={{
            fontSize: "16px",
            fontFamily: "monospace",
            color: "#71717a",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}
        >
          Software Engineer
        </div>

        {/* Name */}
        <div
          style={{
            fontSize: "96px",
            fontWeight: "700",
            color: "#ffffff",
            lineHeight: 1,
            letterSpacing: "-0.03em",
          }}
        >
          Ed Gracia
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "24px",
            color: "#52525b",
            marginTop: "24px",
          }}
        >
          University of Miami · Systems · Graphics · C++
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "16px",
            color: "#3f3f46",
            fontFamily: "monospace",
          }}
        >
          edgracia.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
