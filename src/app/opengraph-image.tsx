import { ImageResponse } from "next/og";

export const alt = "Lokesh Prajapat — Senior Shopify Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0d1117",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(212, 248, 120, 0.16) 0%, transparent 45%), radial-gradient(circle at 15% 85%, rgba(56, 189, 248, 0.10) 0%, transparent 45%)",
          padding: "64px 72px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          color: "#f3f4f6",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          boxSizing: "border-box",
        }}
      >
        {/* Top bar: Brand + Status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                backgroundColor: "#d4f878",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#101622",
                fontWeight: 800,
                fontSize: "26px",
              }}
            >
              L
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.5px" }}>
                lokesh<span style={{ color: "#d4f878" }}>.</span>
              </span>
              <span style={{ fontSize: "14px", color: "#9ca3af", letterSpacing: "0.5px" }}>
                lokesh-prajapati.vercel.app
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "rgba(212, 248, 120, 0.12)",
              border: "1px solid rgba(212, 248, 120, 0.3)",
              color: "#d4f878",
              fontSize: "15px",
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#d4f878",
              }}
            />
            Available for new projects
          </div>
        </div>

        {/* Center: Headline & Subtitle */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#ffffff",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Thoughtful code.</span>
            <span style={{ color: "#d4f878" }}>Better commerce.</span>
          </div>

          <p
            style={{
              fontSize: "24px",
              lineHeight: 1.45,
              color: "#9ca3af",
              margin: 0,
            }}
          >
            Senior Shopify Web Developer specializing in custom Liquid themes, seamless store migrations, and high-performance storefronts.
          </p>
        </div>

        {/* Bottom bar: Metrics & Location */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#d4f878" }}>5+</span>
              <span style={{ fontSize: "16px", color: "#9ca3af" }}>Years Experience</span>
            </div>
            <div style={{ width: "1px", height: "24px", backgroundColor: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#d4f878" }}>50+</span>
              <span style={{ fontSize: "16px", color: "#9ca3af" }}>Stores Delivered</span>
            </div>
            <div style={{ width: "1px", height: "24px", backgroundColor: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{ fontSize: "28px", fontWeight: 800, color: "#d4f878" }}>30%</span>
              <span style={{ fontSize: "16px", color: "#9ca3af" }}>Faster Delivery with Liquid</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#9ca3af", fontSize: "16px" }}>
            <span>📍 Indore, India · Global Remote</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
