import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const font = await fetch(
    "https://fonts.gstatic.com/s/jetbrainsmono/v18/tDbY2o-flEEny0FZhsfKu5WU4xD-IQ.woff2"
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          backgroundColor: "#18181b",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "JetBrains Mono",
          fontWeight: 700,
          fontSize: 14,
          color: "#ffffff",
          letterSpacing: "-0.5px",
        }}
      >
        EG
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "JetBrains Mono", data: font, weight: 700 }],
    }
  );
}
