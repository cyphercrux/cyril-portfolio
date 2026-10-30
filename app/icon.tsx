import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#C6FF00",
          fontWeight: 900,
          borderRadius: "8px",
          border: "1px solid #7C3AED",
          fontFamily: "sans-serif",
        }}
      >
        CW
      </div>
    ),
    { ...size }
  );
}

