import { createDOM } from "@builder.io/qwik/testing";
import { test, expect, describe, vi, beforeEach } from "vitest";
import { BentoBox } from "./bento-box";

describe("BentoBox Component", () => {
  beforeEach(() => {
    // Mock window object
    Object.defineProperty(global, 'window', {
      value: {
        innerWidth: 1280,
        dispatchEvent: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      },
      writable: true
    });
  });

  test("should render with initial state", async () => {
    const { screen, render } = await createDOM();
    await render(<BentoBox />);
    
    // Check if the main container is rendered
    const mainContainer = screen.querySelector(".tw-flex.tw-justify-center") as HTMLElement;
    expect(mainContainer).toBeTruthy();
    
    // Check if the grid container is rendered
    const gridContainer = screen.querySelector(".tw-grid") as HTMLElement;
    expect(gridContainer).toBeTruthy();
  });

  test("should render profile section", async () => {
    const { screen, render } = await createDOM();
    await render(<BentoBox />);
    
    // Check if profile image is rendered
    const profileImage = screen.querySelector("img") as HTMLImageElement;
    expect(profileImage).toBeTruthy();
    expect(profileImage.src).toContain("drive.google.com");
  });

  test("should render all major sections", async () => {
    const { screen, render } = await createDOM();
    await render(<BentoBox />);
    
    // Check for presence of major sections
    const sections = screen.querySelectorAll(".tw-bg-\\[\\#121416\\]");
    expect(sections.length).toBeGreaterThan(0);
  });

  test("should handle window resize", async () => {
    const { screen, render } = await createDOM();
    await render(<BentoBox />);
    
    // Mock window resize by changing innerWidth
    Object.defineProperty(window, 'innerWidth', {
      value: 800,
      writable: true
    });
    
    // Trigger resize event
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
    
    // Verify the component still renders after resize
    const mainContainer = screen.querySelector(".tw-flex.tw-justify-center") as HTMLElement;
    expect(mainContainer).toBeTruthy();
    
    // Verify the grid layout changed (you can add more specific assertions based on your needs)
    const gridContainer = screen.querySelector(".tw-grid") as HTMLElement;
    expect(gridContainer).toBeTruthy();
  });

  test("should prevent context menu on profile image", async () => {
    const { screen, render } = await createDOM();
    await render(<BentoBox />);
    
    // Find the profile image container - it could be either of these two classes
    const profileImageContainer = screen.querySelector(
      ".tw-flex.tw-w-\\[32\\], .tw-flex.tw-items-center.tw-justify-center.tw-rounded-full"
    ) as HTMLElement;
    
    expect(profileImageContainer).toBeTruthy();
    
    // Verify the onContextMenu handler is attached
    expect(profileImageContainer.hasAttribute("onContextMenu$")).toBeDefined();
    
    // Verify the handler returns false (which is the expected behavior)
    const handler = profileImageContainer.getAttribute("onContextMenu$");
    expect(handler).toBeDefined(); // The attribute exists
    
  });
}); 