// Button.jsx
// Usage:
// <Button>Sign In</Button>
// <Button variant="dark">Register</Button>
// <Button variant="outline">Cancel</Button>
// <Button disabled>Loading...</Button>
// <Button fullWidth>Next</Button>

export default function Button({
  children,
  variant = "primary", // "primary" | "dark" | "outline"
  fullWidth = true,
  disabled = false,
  onClick,
}) {
  const styles = {
    primary: {
      background: disabled ? "#F0B87A" : "#E8821A",
      color: "white",
      border: "none",
    },
    dark: {
      background: disabled ? "#666" : "#1A1A1A",
      color: "white",
      border: "none",
    },
    outline: {
      background: "transparent",
      color: "#E8821A",
      border: "2px solid #E8821A",
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@700&display=swap');
        .ss-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 16px 24px;
          border-radius: 14px;
          font-size: 16px;
          font-weight: 700;
          font-family: 'Manrope', sans-serif;
          cursor: ${disabled ? "not-allowed" : "pointer"};
          opacity: ${disabled ? 0.7 : 1};
          transition: transform 0.1s, opacity 0.2s;
          letter-spacing: 0.2px;
          width: ${fullWidth ? "100%" : "auto"};
        }
        .ss-btn:active {
          transform: ${disabled ? "none" : "scale(0.97)"};
        }
      `}</style>
      <button
        className="ss-btn"
        style={styles[variant]}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </>
  );
}