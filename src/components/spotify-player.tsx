import { component$, useSignal } from "@builder.io/qwik";

/**
 * A floating Spotify playlist player component with toggle functionality
 * @returns {JSX.Element} The Spotify player component
 */
export const SpotifyPlayer = component$(() => {
  const isVisible = useSignal(true);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        width: "300px",
        transition: "transform 0.3s ease-in-out",
        transform: isVisible.value ? "translateY(0)" : "translateY(-85%)",
        zIndex: 1000,
      }}
    >
      <button
        onClick$={() => (isVisible.value = !isVisible.value)}
        style={{
          position: "absolute",
          left: "50%",
          bottom: "-25px",
          transform: "translateX(-50%)",
          background: "#1DB954",
          border: "none",
          borderRadius: "0 0 8px 8px",
          padding: "10px",
          cursor: "pointer",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "40px",
          height: "30px",
        }}
      >
        {isVisible.value ? "↑" : "↓"}
      </button>
      <iframe
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        src="https://open.spotify.com/embed/playlist/0TpJlTaA3mbInCxzVKHWvz?utm_source=generator&theme=0"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      />
    </div>
  );
});
