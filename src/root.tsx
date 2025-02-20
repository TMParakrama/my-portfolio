import { component$ } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";
import { isDev } from "@builder.io/qwik";

import "./global.css";
import UiAurora from "./components/ui/aurora/ui-aurora";

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
      </head>
      <body lang="en" class="tw-m-0 tw-bg-black">
        <UiAurora
          client:idle
          colorStops={[
            "#FF0000",
            "#FF7F00",
            "#FFFF00",
            "#00FF00",
            "#0000FF",
            "#4B0082",
            "#8F00FF",
          ]}
          speed={0.25}
        />
        <div class="tw-sm:px-4 tw-lg:px-12 tw-px-4 tw-py-4  tw-h-full tw-z-20">
          <RouterOutlet />
          {!isDev && <ServiceWorkerRegister />}
        </div>
      </body>
    </QwikCityProvider>
  );
});
