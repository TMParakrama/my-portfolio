import { component$ } from "@builder.io/qwik";

/**
 * Interface for documentation data
 */
interface DocumentationData {
  title: string;
  description: string;
  liveLink?: string;
  resources?: {
    title: string;
    link: string;
  }[];
}

interface DocPageProps {
  data: DocumentationData;
}

/**
 * Documentation Page component that displays project details
 */
export const DocPage = component$<DocPageProps>(({ data }) => {
  return (
    <div class="tw-flex tw-justify-center tw-p-4">
      <div class="tw-w-full tw-max-w-screen-xl">
        <div class="tw-bg-[#121416] tw-rounded-xl tw-p-8 tw-border-2 tw-border-[#28292b]">
          <h1 class="tw-text-4xl tw-font-bold tw-mb-6 tw-text-white">
            {data.title}
          </h1>

          <div class="tw-mb-8">
            <p class="tw-text-gray-300 tw-text-lg tw-leading-relaxed">
              {data.description}
            </p>
          </div>

          {data.liveLink && (
            <div class="tw-mb-6">
              <h2 class="tw-text-2xl tw-font-semibold tw-mb-3 tw-text-white">
                Live Demo
              </h2>
              <a
                href={data.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                class="tw-text-blue-400 tw-hover:text-blue-300 tw-transition-colors"
              >
                Visit Live Site
              </a>
            </div>
          )}

          {data.resources && data.resources.length > 0 && (
            <div>
              <h2 class="tw-text-2xl tw-font-semibold tw-mb-3 tw-text-white">
                Resources
              </h2>
              <ul class="tw-space-y-2">
                {data.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      class="tw-text-blue-400 tw-hover:text-blue-300 tw-transition-colors"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
