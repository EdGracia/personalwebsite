import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 10,
          backgroundColor: "#18181b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "monospace",
          fontWeight: 700,
          fontSize: 22,
          color: "#ffffff",
          letterSpacing: "-1px",
        }}
      >
        EG
      </div>
    ),
    { ...size }
  );
}
