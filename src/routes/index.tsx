import { component$, useSignal, useOnWindow, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { BentoBox } from "~/components/ui/bento-box";

export default component$(() => {
  const isLoaded = useSignal(false);

  useOnWindow(
    "readystatechange",
    $(() => {
      isLoaded.value = true;
    })
  );

  return (
    <>
      {!isLoaded.value ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              border: "2px solid #fff",
              borderTopColor: "transparent",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          />
          <div
            style={{
              color: "#fff",
              fontSize: "1.2rem",
            }}
          >
            Loading<span style={{ animation: "dots 1.5s infinite" }}>...</span>
          </div>
        </div>
      ) : (
        <BentoBox />
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Portfolio",
  meta: [
    {
      name: "description",
      content: "This is the portfolio site developed with Qwik.",
    },
  ],
};
