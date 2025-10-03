import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";

import { DocPage } from "~/components/ui/doc-page";
import ProjectData from "~/data/project-docs.json";

interface ProjectDetail {
  title: string;
  description?: string;
}

export const useDocData = routeLoader$<ProjectDetail | null>(({ params, status }) => {
  const docId = params.id;
  const data = (ProjectData as Record<string, ProjectDetail>)[
    docId as keyof typeof ProjectData
  ];
  if (!data) {
    status(404);
    return null;
  }
  return data;
});

export const head: DocumentHead = ({ resolveValue, url }) => {
  const data = resolveValue(useDocData);
  const baseTitle = "Docs";
  const title = data?.title ? `${data.title} | ${baseTitle}` : `Not Found | ${baseTitle}`;
  const description = data?.description ?? "Project documentation not found.";

  return {
    title,
    meta: [
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url.href },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url.href }],
  };
};

/**
 * Qwik Docs page route component. Fetches and displays project documentation based on the dynamic route param.
 */
export default component$(() => {
  const projectDoc = useDocData();

  if (!projectDoc.value) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div style={{ color: "#fff", fontSize: "1.2rem" }}>Document not found.</div>
        <a
          href="/"
          style={{
            color: "#60a5fa",
            textDecoration: "underline",
            fontWeight: 500,
          }}
          aria-label="Back to Home"
        >
          ← Back to Home
        </a>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Navigation */}
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

      {/* Back/Home Link */}
      <a
        href="/"
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
          display: "inline-block",
        }}
        aria-label="Back to Home"
      >
        ← Back to Home
      </a>

      <DocPage
        data={{
          title: projectDoc.value.title,
          description: projectDoc.value.description ?? "",
        }}
      />
    </div>
  );
});
