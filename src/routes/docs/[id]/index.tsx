import {
  component$,
  useSignal,
  useOnWindow,
  $,
  useTask$,
} from "@builder.io/qwik";
import { useLocation, server$ } from "@builder.io/qwik-city";

import { DocPage } from "~/components/ui/doc-page";
import ProjectData from "$/public/mockData/ProjectDoc.json";

interface ProjectDetail {
  title: string;
  description?: string;
}

// Using type assertion to fix TypeScript error where docId cannot be used as an index
// Since we know ProjectData only contains valid project IDs as keys
const getDocData = server$(function (docId: string) {
  const data: ProjectDetail = ProjectData[docId as keyof typeof ProjectData];
  return data;
});

/**
 * Qwik Docs page route component. Fetches and displays project documentation based on the dynamic route param.
 */
export default component$(() => {
  const loc = useLocation();
  const isLoaded = useSignal(false);

  // Signal to hold the project documentation data
  const projectDoc = useSignal<ProjectDetail | null>(null);

  // Fetch the document data when the route param changes
  useTask$(async ({ track }) => {
    const documentId = track(() => loc.params.id);
    if (documentId) {
      // getDocData is a server$ function
      const data = await getDocData(documentId);
      projectDoc.value = data;
    }
  });

  useOnWindow(
    "readystatechange",
    $(() => {
      isLoaded.value = true;
    })
  );

  return (
    <>
      {!isLoaded.value || !projectDoc.value ? (
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
        <div>
          {/* Breadcrumb Navigation */}
          {/**
           * Breadcrumb navigation for docs page.
           * Home is a link to the root, and the current project title is shown.
           */}
          <nav
            aria-label="breadcrumb"
            style={{
              marginBottom: "1.5rem",
              marginTop: "1rem",
              marginInline: "1rem",
            }}
          >
            <a
              href="/"
              style={{
                color: "#60a5fa",
                textDecoration: "underline",
                fontWeight: 500,
              }}
            >
              Home
            </a>
            <span style={{ color: "#888", margin: "0 0.5rem" }}>/</span>
            <span style={{ color: "#fff", fontWeight: 500 }}>
              {projectDoc.value.title}
            </span>
          </nav>

          {/* Back/Home Button */}
          {/**
           * Button to navigate back to the home/root page.
           */}
          <button
            type="button"
            onClick$={() => (window.location.href = "/")}
            style={{
              background: "#28292b",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "0.5rem 1.2rem",
              marginBottom: "1.5rem",
              marginInline: "1rem",
              cursor: "pointer",
              fontWeight: 500,
              fontSize: "1rem",
              transition: "background 0.2s",
            }}
            aria-label="Back to Home"
          >
            ← Back to Home
          </button>

          <DocPage
            data={{
              title: projectDoc.value.title,
              description: projectDoc.value.description ?? "",
            }}
          />
        </div>
      )}
    </>
  );
});
