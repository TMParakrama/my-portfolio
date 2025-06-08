import { createDOM } from "@builder.io/qwik/testing";
import { test, expect } from "vitest";
import { SpotifyPlayer } from "./spotify-player";

test(`[SpotifyPlayer Component]: Should render with initial visible state`, async () => {
  const { screen, render } = await createDOM();
  await render(<SpotifyPlayer />);
  
  // Check if the player container is rendered
  const playerContainer = screen.querySelector("div") as HTMLElement;
  expect(playerContainer).toBeTruthy();
  
  // Check if the iframe is rendered
  const iframe = screen.querySelector("iframe") as HTMLIFrameElement;
  expect(iframe).toBeTruthy();
  expect(iframe.src).toContain("open.spotify.com");
});

test(`[SpotifyPlayer Component]: Should toggle visibility on button click`, async () => {
  const { screen, render, userEvent } = await createDOM();
  await render(<SpotifyPlayer />);
  
  // Get initial transform value
  const playerContainer = screen.querySelector("div") as HTMLElement;
  const initialTransform = playerContainer.style.transform;
  
  // Click the toggle button
  const toggleButton = screen.querySelector("button") as HTMLButtonElement;
  await userEvent("button", "click");
  
  // Check if transform value changed
  expect(playerContainer.style.transform).not.toBe(initialTransform);
  
  // Click again to verify toggle back
  await userEvent("button", "click");
  expect(playerContainer.style.transform).toBe(initialTransform);
}); 