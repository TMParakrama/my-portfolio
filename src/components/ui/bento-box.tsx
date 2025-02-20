import {
  component$,
  isBrowser,
  useOnWindow,
  useSignal,
  $,
} from "@builder.io/qwik";
import { TickerBox } from "./number-ticker";
import { TechLogoStack } from "./tech-logo-stack";
import { ProfileBox } from "./profile-box";
import { Projects } from "./projects";
import { TechStack } from "./tech-stack";
import { Testimonials } from "./testimonials";
import { Collaborate } from "./collaborate";
import { ProofWork } from "./proof-of-work";
import { Skills } from "./skills";

/**
 * The BentoBox component
 */
export const BentoBox = component$(() => {
  const isExtraLargeScreen = useSignal(true);

  const handleWindowLargeScreen = $(() => {
    if (isBrowser) {
      console.log(window.innerWidth);
      if (window.innerWidth > 1278 !== isExtraLargeScreen.value)
        isExtraLargeScreen.value = window.innerWidth > 1278;
    }
  });
  //resize
  useOnWindow(
    "resize",
    $(() => {
      handleWindowLargeScreen();
    })
  );
  //initial load
  useOnWindow(
    "DOMContentLoaded",
    $(() => {
      handleWindowLargeScreen();
    })
  );

  // Prevent right click on image
  const preventContextMenu = $((e: Event) => {
    e.preventDefault();
    return false;
  });

  return (
    <>
      <div class="tw-flex tw-justify-center tw-p-0  ">
        {isExtraLargeScreen.value ? (
          <div class="tw-grid tw-grid-cols-2 tw-gap-4 tw-w-full tw-h-full tw-max-w-screen-2xl sm:tw-grid-cols-4 md:tw-grid-cols-3 xl:tw-grid-cols-6">
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 sm:tw-col-span-full tw-flex tw-flex-col sm:tw-flex-row tw-pl-6">
              <div
                class="tw-flex tw-w-[32] tw-h-[40] tw-items-center tw-justify-center tw-rounded-full tw-select-none "
                onContextMenu$={preventContextMenu}
                // style={{ userSelect: "none", WebkitUserSelect: "none" }}
              >
                <img
                  width={128}
                  height={160}
                  src="https://drive.google.com/thumbnail?id=1eiLD5-QrPKYtdbpWUrcLVN2niPDVsGBv"
                  class="tw-rounded-full tw-filter tw-saturate-112 tw-brightness-108 tw-w-32 tw-h-40 tw-pointer-events-none"
                  draggable={false}
                />
              </div>
              <div class="tw-flex-1">
                <ProfileBox client:visible />
              </div>
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-border-2 tw-border-[#28292b] tw-col-span-1 sm:tw-col-span-2 md:tw-col-span-1">
              <TickerBox
                number={12}
                title="Projects"
                client:visible
                iconType="PROJECTS"
              />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-border-2 tw-border-[#28292b] tw-h-[200px] tw-col-span-1 sm:tw-col-span-2 md:tw-col-span-1">
              <TechLogoStack client:visible />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-h-[200px] tw-border-2 tw-border-[#28292b] tw-col-span-2 sm:tw-col-span-2 md:tw-col-span-1">
              <TickerBox
                number={5}
                title="Experience"
                client:visible
                iconType="EXPERIENCE"
                uomStr="(yrs.)"
              />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[500px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-3 md:tw-col-span-2">
              <Projects client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[500px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-2 md:tw-col-span-1">
              <TechStack client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[420px] sm:tw-h-[350px] sm:tw-col-span-4 md:tw-col-span-3">
              <Testimonials client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[400px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-2 md:tw-col-span-1">
              <ProofWork client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[400px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-4 md:tw-col-span-2">
              <Collaborate client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[330px] xl:tw-mt-[-140px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-4 md:tw-col-span-3">
              <Skills client:idle />
            </div>
          </div>
        ) : (
          <div class="tw-grid tw-grid-cols-2 tw-gap-4 tw-w-full tw-max-w-screen-2xl sm:tw-grid-cols-4 md:tw-grid-cols-4 xl:tw-grid-cols-6">
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 sm:tw-col-span-full tw-flex tw-flex-col sm:tw-flex-row tw-pl-6">
              <div
                class="tw-flex tw-items-center tw-justify-center tw-rounded-full tw-mb-1 tw-w-32 tw-h-40 tw-select-none"
                onContextMenu$={preventContextMenu}
                // style={{ userSelect: "none", WebkitUserSelect: "none" }}
              >
                <img
                  width={128}
                  height={160}
                  src="https://drive.google.com/thumbnail?id=1eiLD5-QrPKYtdbpWUrcLVN2niPDVsGBv"
                  class="tw-rounded-full tw-filter tw-saturate-128 tw-brightness-110 tw-w-32 tw-h-40 tw-pointer-events-none"
                  draggable={false}
                />
              </div>
              <div class="tw-flex-1">
                <ProfileBox client:visible />
              </div>
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-border-2 tw-border-[#28292b] tw-col-span-1 sm:tw-col-span-2 md:tw-col-span-2">
              <TickerBox
                number={12}
                title="Projects"
                iconType="PROJECTS"
                noPlus
                client:visible
              />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-border-2 tw-border-[#28292b] tw-h-[200px] tw-col-span-1 sm:tw-col-span-2 md:tw-col-span-2">
              <TickerBox
                number={5}
                title="Experience"
                client:idle
                iconType="EXPERIENCE"
                uomStr="(yrs.)"
              />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-h-[200px] tw-border-2 tw-border-[#28292b] tw-col-span-2 sm:tw-col-span-4 md:tw-col-span-1">
              <TickerBox
                number={3}
                title="Tech stacks"
                iconType="TECH_STACK"
                noPlus
                client:idle
              />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[500px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-4 md:tw-col-span-2">
              <Projects client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[500px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-2 md:tw-col-span-1">
              <TechStack client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[400px] sm:tw-h-[500px] md:tw-h-[400px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-2 md:tw-col-span-1">
              <Testimonials client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[400px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-4 md:tw-col-span-3">
              <Skills client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[330px] md:tw-h-[287px] xl:tw-h-[330px] xl:tw-mt-[-140px] tw-border-2 tw-border-[#28292b] sm:tw-col-span-4 md:tw-col-span-1 md:tw-mt-[-96px]">
              <ProofWork client:idle />
            </div>
            <div class="tw-bg-[#121416] tw-rounded-xl tw-col-span-2 tw-row-span-2 tw-h-[400px] tw-border-2 tw-border-[#28292b] md:tw-mt-[-104px]  sm:tw-col-span-4 md:tw-col-span-full">
              <Collaborate client:idle />
            </div>
          </div>
        )}
      </div>
    </>
  );
});
