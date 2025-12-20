/*
 * Generated from Figma design — Thu Aug 14 2025
 * Figma File: Vibe & Make
 * Figma URL: https://www.figma.com/file/foJ9tLDEe0i7DWLADX7T6n/Vibe%20%26%20Make
 * Generated responsive section component
 */

import React from "react";
import Container from "./Container.jsx";
import useBreakpoint from "./../hooks/useBreakpoint.jsx";
import { BREAKPOINT_MD } from "./../hooks/useBreakpoint.jsx";

// Only Desktop variant is implemented. Mobile variant was not provided.
// To implement the missing Mobile variant, use a conditional branch like:
//
// if (width >= BREAKPOINT_MD) {
//   return // Desktop (implemented already)
// } else {
//   return // Mobile (todo)
// }
//
// Or use Tailwind's `md:` prefix to apply Desktop styles from BREAKPOINT_MD upward.
function ToolToolsSection({  }) {
  const width = useBreakpoint();
  return (

  <section className={"w-full"}>

    <Container maxWidth={1440} scalingFactor={1.25}>

      {/* Container: Tools */}
      <div className={"relative w-[80em] h-[55.125em]"}>

        {/* Container: Footer */}
        <div className={"bg-white absolute w-[80em] flex flex-col justify-center items-center left-[0em] top-[153.596875em]"}>

          {/* Container: Frame 48095939 */}
          <div className={"bg-black relative w-full shrink-0 grow-0 basis-[10.5625em] flex flex-col justify-end items-center"}>

            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-start gap-[34.75em]"}>

              <div className={"relative h-[4.3125em] shrink-0 grow-0 basis-[10.4375em] flex flex-row justify-center items-start"}>

                {/* Container: Frame 48095933 */}
                <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-center gap-[1.375em]"}>

                  <div className={"relative w-full shrink-0 grow-0 basis-5 flex flex-row justify-center items-center"}>

                    <div className={"text-[1.75em] [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[3.392857em] text-left text-white relative whitespace-nowrap shrink grow-0"}>
                      <span>{"Vibe & Make"}</span>

                    </div>

                  </div>

                  <div className={"relative w-full shrink-0 grow-0 basis-[0.625em] flex flex-row justify-center items-center"}>

                    <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[6.785714em] text-left text-white relative whitespace-nowrap shrink grow-0"}>
                      <span>{"POWERED BY "}</span>
                      <span className={"text-white underline"}>{"MAKER.CO"}</span>

                    </div>

                  </div>

                </div>

              </div>

              <div className={"relative shrink-0 grow-0 basis-[28.8125em] flex flex-row justify-center items-start"}>

                {/* Container: Frame 48095938 */}
                <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-center gap-4"}>

                  <div className={"relative w-full shrink-0 grow-0 basis-[0.8125em] flex flex-row justify-center items-start"}>

                    <div className={"text-lg [font-family:IBM_Plex_Sans] font-medium tracking-[0.00] leading-[1.333333em] text-left text-white relative whitespace-nowrap shrink grow-0"}>
                      <span>{"Get the latest in AI: subscribe to our newsletter."}</span>

                    </div>

                  </div>

                  <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-start"}>

                    {/* Container: Frame 110 */}
                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-3"}>

                      <div className={"relative shrink-0 grow-0 basis-[20em] flex flex-row justify-center items-center"}>

                        {/* Container: Search */}
                        <div className={"border bg-[rgba(255,255,255,0.100)] relative w-full h-10 shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(255,255,255,0.200)]"}>

                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center"}>

                            <div className={"relative h-[0.625em] shrink-0 grow-0 basis-6"} />

                            <div className={"relative h-[0.625em] shrink-0 grow-0 basis-[7.4375em] flex flex-row justify-center items-center"}>

                              <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1.428571em] text-left text-[rgba(255,255,255,0.400)] relative whitespace-nowrap shrink grow-0"}>
                                <span>{"E-MAIL ADDRESS"}</span>

                              </div>

                            </div>

                            <div className={"relative h-[0.625em] shrink-0 grow-0 basis-[11.0625em]"} />

                          </div>

                        </div>

                      </div>

                      <div className={"relative shrink-0 grow-0 basis-[8.0625em] flex flex-row justify-center items-center"}>

                        {/* Container: Frame 27 */}
                        <div className={"bg-[rgba(231,19,26,1.000)] relative w-full h-10 shrink-0 grow-0 flex flex-row justify-center items-center rounded-[8px_8px_8px_8px]"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.40] leading-[1em] text-center uppercase text-white relative whitespace-nowrap shrink grow-0"}>
                            <span>{"SUBSCRIBE"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className={"relative w-full shrink-0 grow-0 basis-10 flex flex-row justify-center items-end"}>

              {/* Image: Frame 427319999, Size: 1280x1 */}
              {/* Note: Take care to respect the original image size and not let allow it to clip. */}
              <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[0.09375em] shrink-0 grow-0"}
                style={{
                  backgroundImage: "url(/images/49cf6536-bcf8-4f71-9fac-9190a55f85f1.svg)"
                }} />

            </div>

          </div>

          {/* Container: Frame 48095937 */}
          <div className={"bg-black relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-[45.235625em]"}>

            <div className={"relative h-[6.25em] shrink-0 grow-0 basis-[19.625em] flex flex-row justify-center items-center"}>

              {/* Container: Frame 48095935 */}
              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-[1.75em]"}>

                <div className={"relative h-5 shrink-0 grow-0 basis-[3.875em] flex flex-row justify-center items-center"}>

                  <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1.428571em] text-left uppercase text-white relative whitespace-nowrap shrink grow-0"}>
                    <span>{"COOKIES"}</span>

                  </div>

                </div>

                <div className={"relative h-5 shrink-0 grow-0 basis-[7.875em] flex flex-row justify-center items-center"}>

                  <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1.428571em] text-left uppercase text-white relative whitespace-nowrap shrink grow-0"}>
                    <span>{"PRIVACY & TERMS"}</span>

                  </div>

                </div>

                <div className={"relative h-5 shrink-0 grow-0 basis-[4.375em] flex flex-row justify-center items-center"}>

                  <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1.428571em] text-left uppercase text-white relative whitespace-nowrap shrink grow-0"}>
                    <span>{"ABOUT US"}</span>

                  </div>

                </div>

              </div>

            </div>

            <div className={"relative h-[6.25em] shrink-0 grow-0 basis-[9.139375em] flex flex-row justify-center items-center"}>

              {/* Image: Frame 48095936, Size: 146x19 */}
              {/* Note: Take care to respect the original image size and not let allow it to clip. */}
              <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[1.18375em] shrink-0 grow-0"}
                style={{
                  backgroundImage: "url(/images/5c452b39-b072-4ea5-9b40-8b234eaecf3f.svg)"
                }} />

            </div>

          </div>

        </div>

        {/* Container: Tool */}
        <div className={"bg-white absolute w-[80em] flex flex-col justify-center items-center left-[0em] top-20"}>

          {/* Container: Tool */}
          <div className={"bg-white relative w-full shrink-0 grow-0 flex flex-row justify-center items-center border-t-0 border-x-0 border-solid border-black border-b"}>

            {/* Container: Frame 427319979 */}
            <div className={"bg-[rgba(246,244,241,1.000)] relative h-[45.909375em] shrink-0 grow-0 basis-[49em] flex flex-col justify-center items-center gap-6"}>

              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center"}>

                {/* Container: Frame 427319982 */}
                <div className={"relative shrink-0 grow-0 flex flex-row justify-start items-center gap-[25.169375em]"}>

                  <div className={"relative shrink-0 grow-0 basis-[9.080625em] flex flex-row justify-start items-center"}>

                    {/* Image: Vector, Size: 145x55 */}
                    {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                    <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[3.425em] shrink-0 grow-0"}
                      style={{
                        backgroundImage: "url(/images/9aa7f463-8345-40a6-846b-0658ad43dbc6.svg)"
                      }} />

                  </div>

                  <div className={"relative h-[3.425em] shrink-0 grow-0 basis-[8.75em] flex flex-row justify-start items-end"}>

                    {/* Container: Visit Site */}
                    <div className={"border relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-[0.625em] rounded-[8px_8px_8px_8px] border-solid border-black"}>

                      <div className={"relative h-10 shrink-0 grow-0 basis-[0.875em] flex flex-row justify-center items-center"}>

                        {/* Image: Subhead, Size: 14x12 */}
                        {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                        <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-3 shrink-0 grow-0"}
                          style={{
                            backgroundImage: "url(/images/46ae10bd-ff05-410d-b8ef-3caf1573e938.svg)"
                          }} />

                      </div>

                      <div className={"relative h-10 shrink-0 grow-0 basis-[4.8125em] flex flex-row justify-center items-center"}>

                        <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.40] leading-[1em] text-center capitalize text-black relative whitespace-nowrap shrink grow-0"}>
                          <span>{"VISIT SITE"}</span>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center"}>

                {/* Image: Screenshot 2025-05-15 at 19.22.11 1, Size: 688x560 */}
                {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-[43em] h-[34.984375em] shrink-0 grow-0"}
                  style={{
                    backgroundImage: "url(/images/cce5fe0d-a341-4751-9573-e28bef7ea3e3.png)"
                  }} />

              </div>

            </div>

            {/* Container: Frame 48095741 */}
            <div className={"bg-white relative h-[45.909375em] shrink-0 grow-0 basis-[31em] flex flex-col justify-center items-center border-r-0 border-y-0 border-l border-solid border-black"}>

              <div className={"relative w-[31em] shrink-0 grow-0 basis-[3.9375em]"} />

              <div className={"relative w-[31em] shrink-0 grow-0 flex flex-row justify-center items-center"}>

                {/* Container: Frame 427319983 */}
                <div className={"relative w-[25em] shrink-0 grow-0 flex flex-col justify-center items-start gap-6"}>

                  <div className={"relative w-full shrink-0 grow-0 basis-[1.75em] flex flex-row justify-start items-center"}>

                    <div className={"text-4xl [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[0.777778em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                      <span>{"Dream Machine"}</span>

                    </div>

                  </div>

                  <div className={"relative w-full shrink-0 grow-0 basis-[10.5em] flex flex-row justify-start items-center"}>

                    <div className={"text-lg [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.555556em] text-left text-black relative w-[22.222222em] shrink grow-0"}>
                      <span>{"Dream Machine is an AI-powered video generation tool that transforms text prompts or images into realistic, cinematic videos. Utilizing advanced models like Ray2 and Photon, it offers users the ability to create high-quality videos with natural motion and accurate physics."}</span>

                    </div>

                  </div>

                </div>

              </div>

              <div className={"relative w-[31em] shrink grow-0 basis-10"} />

              <div className={"relative w-[31em] shrink-0 grow-0 flex flex-row justify-center items-start"}>

                {/* Container: Frame 427319979 */}
                <div className={"relative w-[25em] shrink-0 grow-0 flex flex-col justify-start items-start gap-[1.75em]"}>

                  <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                    {/* Container: Frame 427319974 */}
                    <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-start gap-3"}>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                        {/* Container: Frame 427319977 */}
                        <div className={"relative shrink-0 grow-0 flex flex-row justify-center items-center gap-2"}>

                          <div className={"relative shrink-0 grow-0 basis-5 flex flex-row justify-center items-center"}>

                            {/* Image: tags, Size: 20x13 */}
                            {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                            <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[0.8125em] shrink-0 grow-0"}
                              style={{
                                backgroundImage: "url(/images/2008b28a-9953-42e7-9d8d-641c938be4f5.svg)"
                              }} />

                          </div>

                          <div className={"relative h-[0.8125em] shrink-0 grow-0 basis-[2.125em] flex flex-row justify-center items-center"}>

                            <div className={"text-lg [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.277778em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                              <span>{"Tags"}</span>

                            </div>

                          </div>

                        </div>

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                        {/* Container: Frame 427319972 */}
                        <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-center gap-1"}>

                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center gap-1"}>

                            <div className={"relative shrink-0 grow-0 basis-[3.4375em] flex flex-row justify-center items-center"}>

                              {/* Container: Frame 103 */}
                              <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"VIDEO"}</span>

                                </div>

                              </div>

                            </div>

                            <div className={"relative shrink-0 grow-0 basis-[6.375em] flex flex-row justify-center items-center"}>

                              {/* Container: Frame 427319835 */}
                              <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"TEXT-TO-VIDEO"}</span>

                                </div>

                              </div>

                            </div>

                            <div className={"relative shrink-0 grow-0 basis-[6.875em] flex flex-row justify-center items-center"}>

                              {/* Container: Frame 427319836 */}
                              <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"IMAGE-TO-VIDEO"}</span>

                                </div>

                              </div>

                            </div>

                          </div>

                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center"}>

                            {/* Container: Frame 427319837 */}
                            <div className={"border bg-[rgba(246,244,241,1.000)] relative w-[9.875em] h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                              <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"AI CREATIVITY CINEMATIC"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-start gap-[1.75em]"}>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                      {/* Container: Frame 427319975 */}
                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-[14.3125em]"}>

                        <div className={"relative h-5 shrink-0 grow-0 basis-[6.4375em] flex flex-row justify-center items-center"}>

                          {/* Container: Frame 427319977 */}
                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-2"}>

                            <div className={"relative shrink-0 grow-0 basis-5 flex flex-row justify-center items-center"}>

                              {/* Image: code, Size: 20x13 */}
                              {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                              <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[0.8125em] shrink-0 grow-0"}
                                style={{
                                  backgroundImage: "url(/images/a615ba7f-a0d7-4d07-b571-496b36add98e.svg)"
                                }} />

                            </div>

                            <div className={"relative h-[0.8125em] shrink-0 grow-0 basis-[4.6875em] flex flex-row justify-center items-center"}>

                              <div className={"text-lg [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.277778em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"Developer"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                        <div className={"relative h-5 shrink-0 grow-0 basis-[4.25em] flex flex-row justify-center items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.428571em] underline text-left text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"Luma Labs"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                      {/* Container: Frame 427319976 */}
                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-[11.5em]"}>

                        <div className={"relative h-5 shrink-0 grow-0 basis-[7.4375em] flex flex-row justify-center items-center"}>

                          {/* Container: Frame 427319977 */}
                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-2"}>

                            <div className={"relative shrink-0 grow-0 basis-5 flex flex-row justify-center items-center"}>

                              {/* Image: calendar, Size: 20x13 */}
                              {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                              <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[0.8125em] shrink-0 grow-0"}
                                style={{
                                  backgroundImage: "url(/images/5d4e89af-7ca0-4a99-b506-5fe6f25c6831.svg)"
                                }} />

                            </div>

                            <div className={"relative h-[0.8125em] shrink-0 grow-0 basis-[5.6875em] flex flex-row justify-center items-center"}>

                              <div className={"text-lg [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.277778em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"Launch Date"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                        <div className={"relative h-5 shrink-0 grow-0 basis-[6.0625em] flex flex-row justify-center items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.428571em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"June 12 / 2024"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                      {/* Container: Frame 427319977 */}
                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-[9.0625em]"}>

                        <div className={"relative h-5 shrink-0 grow-0 basis-[10.9375em] flex flex-row justify-center items-center"}>

                          {/* Container: Frame 427319977 */}
                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-2"}>

                            <div className={"relative shrink-0 grow-0 basis-5 flex flex-row justify-center items-center"}>

                              {/* Image: globe, Size: 20x13 */}
                              {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                              <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[0.8125em] shrink-0 grow-0"}
                                style={{
                                  backgroundImage: "url(/images/f0396e2c-2fe3-44a1-9500-fd68d35ed478.svg)"
                                }} />

                            </div>

                            <div className={"relative h-[0.8125em] shrink-0 grow-0 basis-[9.1875em] flex flex-row justify-center items-center"}>

                              <div className={"text-lg [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.277778em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"Platform Availability"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                        <div className={"relative h-5 shrink-0 grow-0 basis-20 flex flex-row justify-center items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.428571em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"Web and iOS"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className={"relative w-[31em] shrink-0 grow-0 basis-[12.034375em]"} />

            </div>

          </div>

          {/* Container: Frame 427319992 */}
          <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-center"}>

            {/* Container: Frame 427319822 */}
            <div className={"bg-white relative w-full shrink-0 grow-0 basis-[45.4375em] flex flex-col justify-center items-center gap-8 border-t-0 border-x-0 border-solid border-black border-b"}>

              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center"}>

                {/* Container: Frame 427319821 */}
                <div className={"relative shrink-0 grow-0 flex flex-row justify-start items-center gap-[26.625em]"}>

                  <div className={"relative h-10 shrink-0 grow-0 basis-[38.625em] flex flex-row justify-start items-center"}>

                    <div className={"text-4xl [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[0.555556em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                      <span>{"Projects Created with Dream Machine"}</span>

                    </div>

                  </div>

                  <div className={"relative shrink-0 grow-0 basis-[8.75em] flex flex-row justify-start items-center"}>

                    {/* Container: Button */}
                    <div className={"border relative w-full h-10 shrink-0 grow-0 flex flex-row justify-center items-center rounded-[8px_8px_8px_8px] border-solid border-black"}>

                      <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.40] leading-[1em] text-center uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                        <span>{"ALL PROJECTS"}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-start"}>

                {/* Container: Frame 427319820 */}
                <div className={"relative w-[74em] h-[31em] shrink-0 grow-0 flex flex-row justify-center items-start"}>

                  <div className={"relative h-[31em] shrink-0 grow-0 basis-[22.625em] flex flex-row justify-center items-start"}>

                    {/* Container: Artists Cards */}
                    <div className={"bg-white relative w-full shrink-0 grow-0 flex flex-col justify-start items-center"}>

                      {/* Image: Frame 54, Size: 362x261 */}
                      {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                      <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full shrink-0 grow-0 basis-[16.330625em]"}
                        style={{
                          backgroundImage: "url(/images/1e893942-3035-4d87-b906-2a6f90aa0b65.png)"
                        }} />

                      {/* Container: Frame 427320058 */}
                      <div className={"relative w-full shrink-0 grow-0 basis-[12.419375em] flex flex-col justify-end items-center gap-6"}>

                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                          {/* Container: Frame 427320057 */}
                          <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-start gap-3"}>

                            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                              {/* Container: Frame 427320059 */}
                              <div className={"relative shrink-0 grow-0 flex flex-row justify-center items-center gap-[0.705625em]"}>

                                <div className={"relative h-[0.4375em] shrink-0 grow-0 basis-[4.8125em] flex flex-row justify-center items-center"}>

                                  <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                    <span>{"HANNA INAI\xC1H"}</span>

                                  </div>

                                </div>

                                <div className={"relative shrink-0 grow-0 basis-[0.441875em] flex flex-row justify-center items-center"}>

                                  {/* Container: Rectangle 40565 */}
                                  <div className={"rotate-45 border relative w-full h-[0.441875em] shrink-0 grow-0 border-solid border-black"} />

                                </div>

                                <div className={"relative h-[0.4375em] shrink-0 grow-0 basis-[1.5625em] flex flex-row justify-center items-center"}>

                                  <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                    <span>{"2025"}</span>

                                  </div>

                                </div>

                              </div>

                            </div>

                            <div className={"relative w-full shrink-0 grow-0 basis-[1.5625em] flex flex-row justify-start items-start"}>

                              <div className={"text-4xl [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[1.333333em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"Mooui and Hanna"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 basis-[3.625em] flex flex-row justify-center items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.714286em] text-left text-black relative w-[25.857143em] shrink grow-0"}>
                            <span>{"Blending massive datasets, sensory design, and neural networks, he crafts immersive paintings that transform memory, nature and architecture."}</span>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-center"}>

                          {/* Container: Tags */}
                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-center gap-[0.805em]"}>

                            <div className={"relative shrink-0 grow-0 basis-[16.7575em] flex flex-row justify-end items-center"}>

                              {/* Container: Frame 427320044 */}
                              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                                <div className={"relative shrink-0 grow-0 basis-[9.19125em] flex flex-row justify-center items-center"}>

                                  {/* Container: Tags */}
                                  <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.544375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[104px_104px_104px_104px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                    <div className={"text-xs [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.20] leading-[1.166667em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                      <span>{"IMAGE GENERATION"}</span>

                                    </div>

                                  </div>

                                </div>

                                <div className={"relative shrink-0 grow-0 basis-[7.31625em] flex flex-row justify-center items-center"}>

                                  {/* Container: Tags */}
                                  <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.544375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[104px_104px_104px_104px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                    <div className={"text-xs [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.20] leading-[1.166667em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                      <span>{"ARCHITECTURE"}</span>

                                    </div>

                                  </div>

                                </div>

                              </div>

                            </div>

                            <div className={"relative h-[1.544375em] shrink-0 grow-0 basis-[5.0625em] flex flex-row justify-end items-center"}>

                              <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] underline text-center uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"READ MORE"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className={"relative h-[31em] shrink-0 grow-0 basis-[1.53125em] flex flex-row justify-end items-start"}>

                    {/* Container: Rectangle 40579 */}
                    <div className={"bg-black relative w-[0.0625em] h-[28.75em] shrink-0 grow-0"} />

                  </div>

                  <div className={"relative shrink-0 grow-0 basis-[24.15625em] flex flex-col justify-start items-end gap-[1.52125em]"}>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-start"}>

                      {/* Container: Artists Cards */}
                      <div className={"bg-white relative w-[22.625em] shrink-0 grow-0 flex flex-col justify-start items-center"}>

                        {/* Image: Frame 54, Size: 362x261 */}
                        {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                        <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full shrink-0 grow-0 basis-[16.330625em]"}
                          style={{
                            backgroundImage: "url(/images/54387217-a03b-468e-af41-8ac5e1645141.png)"
                          }} />

                        {/* Container: Frame 427320058 */}
                        <div className={"relative w-full shrink-0 grow-0 basis-[12.419375em] flex flex-col justify-end items-center gap-6"}>

                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                            {/* Container: Frame 427320057 */}
                            <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-start gap-3"}>

                              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                                {/* Container: Frame 427320059 */}
                                <div className={"relative shrink-0 grow-0 flex flex-row justify-center items-center gap-[0.705625em]"}>

                                  <div className={"relative h-[0.4375em] shrink-0 grow-0 basis-[7.25em] flex flex-row justify-center items-center"}>

                                    <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                      <span>{"GIUSEPPE LO SCHIAVO"}</span>

                                    </div>

                                  </div>

                                  <div className={"relative shrink-0 grow-0 basis-[0.441875em] flex flex-row justify-center items-center"}>

                                    {/* Container: Rectangle 40565 */}
                                    <div className={"rotate-45 border relative w-full h-[0.441875em] shrink-0 grow-0 border-solid border-black"} />

                                  </div>

                                  <div className={"relative h-[0.4375em] shrink-0 grow-0 basis-[1.5625em] flex flex-row justify-center items-center"}>

                                    <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                      <span>{"2023"}</span>

                                    </div>

                                  </div>

                                </div>

                              </div>

                              <div className={"relative w-full shrink-0 grow-0 basis-[1.5625em] flex flex-row justify-start items-start"}>

                                <div className={"text-4xl [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[1.333333em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"Windowscapes"}</span>

                                </div>

                              </div>

                            </div>

                          </div>

                          <div className={"relative w-full shrink-0 grow-0 basis-[3.625em] flex flex-row justify-center items-center"}>

                            <div className={"text-sm [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.714286em] text-left text-black relative w-[25.857143em] shrink grow-0"}>
                              <span>{"Blending massive datasets, sensory design, and neural networks, he crafts immersive paintings that transform memory, nature and architecture."}</span>

                            </div>

                          </div>

                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-center"}>

                            {/* Container: Tags */}
                            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-center gap-[1.555em]"}>

                              <div className={"relative shrink-0 grow-0 basis-[16.0075em] flex flex-row justify-end items-center"}>

                                {/* Container: Frame 427320044 */}
                                <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                                  <div className={"relative shrink-0 grow-0 basis-[9.19125em] flex flex-row justify-center items-center"}>

                                    {/* Container: Tags */}
                                    <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.544375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[104px_104px_104px_104px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                      <div className={"text-xs [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.20] leading-[1.166667em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                        <span>{"IMAGE GENERATION"}</span>

                                      </div>

                                    </div>

                                  </div>

                                  <div className={"relative shrink-0 grow-0 basis-[6.56625em] flex flex-row justify-center items-center"}>

                                    {/* Container: Tags */}
                                    <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.544375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[104px_104px_104px_104px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                      <div className={"text-xs [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.20] leading-[1.166667em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                        <span>{"VIDEO / FILM"}</span>

                                      </div>

                                    </div>

                                  </div>

                                </div>

                              </div>

                              <div className={"relative h-[1.544375em] shrink-0 grow-0 basis-[5.0625em] flex flex-row justify-end items-center"}>

                                <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] underline text-center uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"READ MORE"}</span>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-start"}>

                      {/* Image: Frame 427320051, Size: 387x11 */}
                      {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                      <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[0.706875em] shrink-0 grow-0"}
                        style={{
                          backgroundImage: "url(/images/9b86d9bb-65e4-4dd5-af60-7eb2aee33d1c.svg)"
                        }} />

                    </div>

                  </div>

                  <div className={"relative h-[31em] shrink-0 grow-0 basis-[1.53125em] flex flex-row justify-end items-start"}>

                    {/* Container: Rectangle 40646 */}
                    <div className={"bg-black relative w-[0.0625em] h-[28.75em] shrink-0 grow-0"} />

                  </div>

                  <div className={"relative h-[31em] shrink grow-0 basis-[1.53125em]"} />

                  <div className={"relative h-[31em] shrink-0 grow-0 basis-[22.625em] flex flex-row justify-center items-start"}>

                    {/* Container: Artists Cards */}
                    <div className={"bg-white relative w-full shrink-0 grow-0 flex flex-col justify-start items-center"}>

                      {/* Image: Frame 54, Size: 362x261 */}
                      {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                      <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full shrink-0 grow-0 basis-[16.330625em]"}
                        style={{
                          backgroundImage: "url(/images/8d583f64-6ced-4042-896a-992a10ed48d2.png)"
                        }} />

                      {/* Container: Frame 427320058 */}
                      <div className={"relative w-full shrink-0 grow-0 basis-[12.419375em] flex flex-col justify-end items-center gap-6"}>

                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                          {/* Container: Frame 427320057 */}
                          <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-start gap-3"}>

                            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                              {/* Container: Frame 427320059 */}
                              <div className={"relative shrink-0 grow-0 flex flex-row justify-center items-center gap-[0.705625em]"}>

                                <div className={"relative h-[0.4375em] shrink-0 grow-0 basis-[5.3125em] flex flex-row justify-center items-center"}>

                                  <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                    <span>{"HOLLY HERNDON"}</span>

                                  </div>

                                </div>

                                <div className={"relative shrink-0 grow-0 basis-[0.441875em] flex flex-row justify-center items-center"}>

                                  {/* Container: Rectangle 40565 */}
                                  <div className={"rotate-45 border relative w-full h-[0.441875em] shrink-0 grow-0 border-solid border-black"} />

                                </div>

                                <div className={"relative h-[0.4375em] shrink-0 grow-0 basis-[1.5625em] flex flex-row justify-center items-center"}>

                                  <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                    <span>{"2024"}</span>

                                  </div>

                                </div>

                              </div>

                            </div>

                            <div className={"relative w-full shrink-0 grow-0 basis-[1.5625em] flex flex-row justify-start items-start"}>

                              <div className={"text-4xl [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[1.333333em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"Holly+"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 basis-[3.625em] flex flex-row justify-center items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.714286em] text-left text-black relative w-[25.857143em] shrink grow-0"}>
                            <span>{"Blending massive datasets, sensory design, and neural networks, he crafts immersive paintings that transform memory, nature and architecture."}</span>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-center"}>

                          {/* Container: Tags */}
                          <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-center gap-[3.4925em]"}>

                            <div className={"relative shrink-0 grow-0 basis-[14.07em] flex flex-row justify-end items-center"}>

                              {/* Container: Frame 427320044 */}
                              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                                <div className={"relative shrink-0 grow-0 basis-[7.25375em] flex flex-row justify-center items-center"}>

                                  {/* Container: Tags */}
                                  <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.544375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[104px_104px_104px_104px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                    <div className={"text-xs [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.20] leading-[1.166667em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                      <span>{"MUSIC / AUDIO"}</span>

                                    </div>

                                  </div>

                                </div>

                                <div className={"relative shrink-0 grow-0 basis-[6.56625em] flex flex-row justify-center items-center"}>

                                  {/* Container: Tags */}
                                  <div className={"border bg-[rgba(246,244,241,1.000)] relative w-full h-[1.544375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[104px_104px_104px_104px] border-solid border-[rgba(240,237,232,1.000)]"}>

                                    <div className={"text-xs [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.20] leading-[1.166667em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                      <span>{"VIDEO / FILM"}</span>

                                    </div>

                                  </div>

                                </div>

                              </div>

                            </div>

                            <div className={"relative h-[1.544375em] shrink-0 grow-0 basis-[5.0625em] flex flex-row justify-end items-center"}>

                              <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] underline text-center uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"READ MORE"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* Container: All News */}
            <div className={"bg-white relative w-full shrink-0 grow-0 basis-[30.375em]"}>

              {/* Container: Rectangle 40608 */}
              <div className={"bg-black absolute w-[22.625em] h-[0.0625em] left-12 top-[18.1875em]"} />

              <div className={"text-4xl [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[0.555556em] text-left text-black absolute whitespace-nowrap left-[1.333333em] top-[2.541667em]"}>
                <span>{"Articles About Dream Machine"}</span>

              </div>

              {/* Container: Rectangle 40609 */}
              <div className={"bg-black absolute w-[22.625em] h-[0.0625em] left-[28.6875em] top-[18.1875em]"} />

              {/* Container: Rectangle 40618 */}
              <div className={"bg-black absolute w-[22.625em] h-[0.0625em] left-[54.375em] top-[18.1875em]"} />

              {/* Container: Frame 427320111 */}
              <div className={"absolute flex flex-row justify-center items-center gap-4 left-12 top-[11.0625em]"}>

                <div className={"relative shrink-0 grow-0 basis-[6.541875em] flex flex-row justify-center items-center"}>

                  {/* Image: Rectangle 40631, Size: 105x90 */}
                  {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                  <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[5.625em] shrink-0 grow-0"}
                    style={{
                      backgroundImage: "url(/images/037dd460-48f5-4d39-9adc-963941b692de.png)"
                    }} />

                </div>

                <div className={"relative shrink-0 grow-0 basis-[15.083125em] flex flex-row justify-start items-center"}>

                  {/* Container: Frame 134 */}
                  <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-start gap-6"}>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center"}>

                      {/* Container: Frame 133 */}
                      <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-start gap-2"}>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.4375em] flex flex-row justify-start items-center"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"MAY 25, 2025"}</span>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.625em] flex flex-row justify-start items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"UPDATE"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 basis-[2.5625em] flex flex-row justify-start items-center"}>

                      <div className={"text-lg [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.555556em] text-left text-black relative w-[13.407222em] shrink grow-0"}>
                        <span>{"What is Dream Machine: everything you need to know about the AI video generator"}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Container: Frame 427320112 */}
              <div className={"absolute flex flex-row justify-center items-center gap-4 left-12 top-[19.75em]"}>

                <div className={"relative shrink-0 grow-0 basis-[6.541875em] flex flex-row justify-center items-center"}>

                  {/* Image: Rectangle 40631, Size: 105x90 */}
                  {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                  <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[5.625em] shrink-0 grow-0"}
                    style={{
                      backgroundImage: "url(/images/511bad39-1b6e-4a81-9ba0-5192017dc876.png)"
                    }} />

                </div>

                <div className={"relative shrink-0 grow-0 basis-[15.083125em] flex flex-row justify-start items-center"}>

                  {/* Container: Frame 134 */}
                  <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-start gap-6"}>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center"}>

                      {/* Container: Frame 427320123 */}
                      <div className={"relative w-[5.0625em] shrink-0 grow-0 flex flex-col justify-center items-start gap-2"}>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.4375em] flex flex-row justify-start items-center"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"MAY 24, 2025"}</span>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.625em] flex flex-row justify-start items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"ANIMATION"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 basis-[2.5625em] flex flex-row justify-start items-center"}>

                      <div className={"text-lg [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.555556em] text-left text-black relative w-[13.407222em] shrink grow-0"}>
                        <span>{"Enhanced video generation features and a new user interface."}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Container: Frame 427320114 */}
              <div className={"absolute flex flex-row justify-center items-center gap-4 left-[28.6875em] top-[11.0625em]"}>

                <div className={"relative shrink-0 grow-0 basis-[6.541875em] flex flex-row justify-center items-center"}>

                  {/* Image: Rectangle 40631, Size: 105x90 */}
                  {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                  <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[5.625em] shrink-0 grow-0"}
                    style={{
                      backgroundImage: "url(/images/511bad39-1b6e-4a81-9ba0-5192017dc876.png)"
                    }} />

                </div>

                <div className={"relative shrink-0 grow-0 basis-[15.083125em] flex flex-row justify-start items-center"}>

                  {/* Container: Frame 134 */}
                  <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-start gap-6"}>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center"}>

                      {/* Container: Frame 427320125 */}
                      <div className={"relative w-[5.0625em] shrink-0 grow-0 flex flex-col justify-center items-start gap-2"}>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.4375em] flex flex-row justify-start items-center"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"MAY 22, 2025"}</span>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.625em] flex flex-row justify-start items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"ANIMATION"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 basis-[2.5625em] flex flex-row justify-start items-center"}>

                      <div className={"text-lg [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.555556em] text-left text-black relative w-[13.407222em] shrink grow-0"}>
                        <span>{"Enhanced video generation features and a new user interface."}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Container: Frame 427320115 */}
              <div className={"absolute flex flex-row justify-center items-center gap-4 left-[28.6875em] top-[19.75em]"}>

                <div className={"relative shrink-0 grow-0 basis-[6.541875em] flex flex-row justify-center items-center"}>

                  {/* Image: Rectangle 40631, Size: 105x90 */}
                  {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                  <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[5.625em] shrink-0 grow-0"}
                    style={{
                      backgroundImage: "url(/images/037dd460-48f5-4d39-9adc-963941b692de.png)"
                    }} />

                </div>

                <div className={"relative shrink-0 grow-0 basis-[15.083125em] flex flex-row justify-start items-center"}>

                  {/* Container: Frame 134 */}
                  <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-start gap-6"}>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center"}>

                      {/* Container: Frame 133 */}
                      <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-start gap-2"}>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.4375em] flex flex-row justify-start items-center"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"MAY 25, 2025"}</span>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.625em] flex flex-row justify-start items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"UPDATE"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 basis-[2.5625em] flex flex-row justify-start items-center"}>

                      <div className={"text-lg [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.555556em] text-left text-black relative w-[13.407222em] shrink grow-0"}>
                        <span>{"What is Dream Machine: everything you need to know about the AI video generator"}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Container: Frame 427320117 */}
              <div className={"absolute flex flex-row justify-center items-center gap-4 left-[54.375em] top-[11.0625em]"}>

                <div className={"relative shrink-0 grow-0 basis-[6.541875em] flex flex-row justify-center items-center"}>

                  {/* Image: Rectangle 40631, Size: 105x90 */}
                  {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                  <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[5.625em] shrink-0 grow-0"}
                    style={{
                      backgroundImage: "url(/images/037dd460-48f5-4d39-9adc-963941b692de.png)"
                    }} />

                </div>

                <div className={"relative shrink-0 grow-0 basis-[15.083125em] flex flex-row justify-start items-center"}>

                  {/* Container: Frame 134 */}
                  <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-center items-start gap-6"}>

                    <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center"}>

                      {/* Container: Frame 427320124 */}
                      <div className={"relative w-[4.3125em] shrink-0 grow-0 flex flex-col justify-center items-start gap-2"}>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.4375em] flex flex-row justify-start items-center"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.00] leading-[1.4em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"MAY 23, 2025"}</span>

                          </div>

                        </div>

                        <div className={"relative w-full shrink-0 grow-0 basis-[0.625em] flex flex-row justify-start items-center"}>

                          <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"UPDATE"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className={"relative w-full shrink-0 grow-0 basis-[2.5625em] flex flex-row justify-start items-center"}>

                      <div className={"text-lg [font-family:IBM_Plex_Sans] font-normal tracking-[0.00] leading-[1.555556em] text-left text-black relative w-[13.407222em] shrink grow-0"}>
                        <span>{"What is Dream Machine: everything you need to know about the AI video generator"}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

              {/* Container: Rectangle 40649 */}
              <div className={"bg-black absolute w-[0.0625em] h-[14.3125em] left-[27.125em] top-[11.0625em]"} />

              {/* Container: Rectangle 40650 */}
              <div className={"bg-black absolute w-[0.0625em] h-[14.3125em] left-[52.8125em] top-[11.0625em]"} />

            </div>

            {/* Container: Frame 427319838 */}
            <div className={"bg-white relative w-full shrink-0 grow-0 basis-[26.875em] flex flex-col justify-center items-center gap-8 border-b-0 border-x-0 border-solid border-black border-t"}>

              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center"}>

                <div className={"relative h-10 shrink-0 grow-0 basis-12"} />

                <div className={"relative h-10 shrink-0 grow-0 basis-[13.25em] flex flex-row justify-center items-center"}>

                  <div className={"text-4xl [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[0.555556em] text-left text-black relative w-[5.888889em] shrink grow-0"}>
                    <span>{"Related Tools"}</span>

                  </div>

                </div>

                <div className={"relative h-10 shrink-0 grow-0 basis-[63.75em]"} />

              </div>

              <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-end items-start"}>

                {/* Container: Frame 427319820 */}
                {/* Same width and height pattern detected in original design - multiple elements with identical dimensions arranged horizontally. */}
                {/* This very strongly indicates slider/carousel intent with uniform content blocks. */}
                {/* Ask the user if this should be converted to an interactive slider with navigation controls. */}
                <div className={"relative w-[77em] shrink-0 grow-0 flex flex-row justify-start items-start gap-[1.375em]"}>

                  <div className={"relative shrink-0 grow-0 basis-[12.3125em] flex flex-row justify-start items-start"}>

                    {/* Container: Flora */}
                    <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-center gap-3"}>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-start"}>

                        {/* Image: Frame 63, Size: 197x141 */}
                        {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                        <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[8.8125em] shrink-0 grow-0"}
                          style={{
                            backgroundImage: "url(/images/41c3842a-675b-4e84-84f9-c3d266881f82.svg)"
                          }} />

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end"}>

                        {/* Container: Frame 427319842 */}
                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end gap-[4.9375em]"}>

                          <div className={"relative h-[0.625em] shrink-0 grow-0 basis-[5.1875em] flex flex-row justify-center items-end"}>

                            <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.428571em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                              <span>{"Flora Fauna AI"}</span>

                            </div>

                          </div>

                          <div className={"relative shrink-0 grow-0 basis-[2.1875em] flex flex-row justify-center items-end"}>

                            {/* Container: Frame 427319841 */}
                            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                              <div className={"relative shrink-0 grow-0 basis-3 flex flex-row justify-center items-center"}>

                                {/* Image: eye, Size: 12x8 */}
                                {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                                <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-2 shrink-0 grow-0"}
                                  style={{
                                    backgroundImage: "url(/images/22cd9088-87a9-41e7-85e7-424b2c2b15ee.svg)"
                                  }} />

                              </div>

                              <div className={"relative h-2 shrink-0 grow-0 basis-[1.1875em] flex flex-row justify-center items-center"}>

                                <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[2em] text-right text-[rgba(196,190,181,1.000)] relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"2.2k"}</span>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                        {/* Container: Frame 427319969 */}
                        <div className={"relative shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                          <div className={"relative shrink-0 grow-0 basis-[3.4375em] flex flex-row justify-center items-center"}>

                            {/* Container: Frame 427319843 */}
                            <div className={"border relative w-full h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                              <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"VIDEO"}</span>

                              </div>

                            </div>

                          </div>

                          <div className={"relative shrink-0 grow-0 basis-[3.5625em] flex flex-row justify-center items-center"}>

                            {/* Container: Frame 103 */}
                            <div className={"border relative w-full h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                              <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                                <span>{"IMAGE"}</span>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className={"relative shrink-0 grow-0 basis-[12.3125em] flex flex-row justify-start items-start"}>

                    {/* Container: Pika */}
                    <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-center gap-3"}>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-start"}>

                        {/* Image: Frame 63, Size: 197x141 */}
                        {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                        <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[8.8125em] shrink-0 grow-0"}
                          style={{
                            backgroundImage: "url(/images/d31b19ee-3476-4b5b-961e-007aef607349.svg)"
                          }} />

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end"}>

                        {/* Container: Frame 427319842 */}
                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end gap-[7.3125em]"}>

                          <div className={"relative h-[0.625em] shrink-0 grow-0 basis-[2.8125em] flex flex-row justify-center items-end"}>

                            <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.428571em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                              <span>{"Pika Art"}</span>

                            </div>

                          </div>

                          <div className={"relative shrink-0 grow-0 basis-[2.1875em] flex flex-row justify-center items-end"}>

                            {/* Container: Frame 427319841 */}
                            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                              <div className={"relative shrink-0 grow-0 basis-3 flex flex-row justify-center items-center"}>

                                {/* Image: eye, Size: 12x8 */}
                                {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                                <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-2 shrink-0 grow-0"}
                                  style={{
                                    backgroundImage: "url(/images/22cd9088-87a9-41e7-85e7-424b2c2b15ee.svg)"
                                  }} />

                              </div>

                              <div className={"relative h-2 shrink-0 grow-0 basis-[1.1875em] flex flex-row justify-center items-center"}>

                                <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[2em] text-right text-[rgba(196,190,181,1.000)] relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"1.9k"}</span>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                        {/* Container: Frame 427319843 */}
                        <div className={"border relative w-[3.4375em] h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"VIDEO"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className={"relative shrink-0 grow-0 basis-[12.3125em] flex flex-row justify-start items-start"}>

                    {/* Container: Kling AI */}
                    <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-center gap-3"}>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-start"}>

                        {/* Image: Frame 63, Size: 197x141 */}
                        {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                        <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[8.8125em] shrink-0 grow-0"}
                          style={{
                            backgroundImage: "url(/images/2b5fffd9-fea9-483f-9a15-ee25ca1ff904.png)"
                          }} />

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end"}>

                        {/* Container: Frame 427319842 */}
                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end gap-[7.3125em]"}>

                          <div className={"relative h-[0.625em] shrink-0 grow-0 basis-[2.8125em] flex flex-row justify-center items-end"}>

                            <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.428571em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                              <span>{"Kling AI"}</span>

                            </div>

                          </div>

                          <div className={"relative shrink-0 grow-0 basis-[2.1875em] flex flex-row justify-center items-end"}>

                            {/* Container: Frame 427319841 */}
                            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                              <div className={"relative shrink-0 grow-0 basis-3 flex flex-row justify-center items-center"}>

                                {/* Image: eye, Size: 12x8 */}
                                {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                                <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-2 shrink-0 grow-0"}
                                  style={{
                                    backgroundImage: "url(/images/22cd9088-87a9-41e7-85e7-424b2c2b15ee.svg)"
                                  }} />

                              </div>

                              <div className={"relative h-2 shrink-0 grow-0 basis-[1.1875em] flex flex-row justify-center items-center"}>

                                <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[2em] text-right text-[rgba(196,190,181,1.000)] relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"1.8k"}</span>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                        {/* Container: Frame 427319843 */}
                        <div className={"border relative w-[3.4375em] h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"VIDEO"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                  <div className={"relative shrink-0 grow-0 basis-[12.3125em] flex flex-row justify-start items-start"}>

                    {/* Container: Jasper */}
                    <div className={"relative w-full shrink-0 grow-0 flex flex-col justify-start items-center gap-3"}>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-start"}>

                        {/* Image: Frame 63, Size: 197x141 */}
                        {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                        <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-[8.8125em] shrink-0 grow-0"}
                          style={{
                            backgroundImage: "url(/images/688e7067-5ef6-4b5d-95a7-4045cd9a26ab.png)"
                          }} />

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end"}>

                        {/* Container: Frame 427319842 */}
                        <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-end gap-[7.6875em]"}>

                          <div className={"relative h-[0.625em] shrink-0 grow-0 basis-[2.4375em] flex flex-row justify-center items-end"}>

                            <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[1.428571em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
                              <span>{"Jasper"}</span>

                            </div>

                          </div>

                          <div className={"relative shrink-0 grow-0 basis-[2.1875em] flex flex-row justify-center items-end"}>

                            {/* Container: Frame 427319841 */}
                            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-1"}>

                              <div className={"relative shrink-0 grow-0 basis-3 flex flex-row justify-center items-center"}>

                                {/* Image: eye, Size: 12x8 */}
                                {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                                <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-2 shrink-0 grow-0"}
                                  style={{
                                    backgroundImage: "url(/images/22cd9088-87a9-41e7-85e7-424b2c2b15ee.svg)"
                                  }} />

                              </div>

                              <div className={"relative h-2 shrink-0 grow-0 basis-[1.1875em] flex flex-row justify-center items-center"}>

                                <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[0.00] leading-[2em] text-right text-[rgba(196,190,181,1.000)] relative whitespace-nowrap shrink grow-0"}>
                                  <span>{"1.2k"}</span>

                                </div>

                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                      <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-start"}>

                        {/* Container: Frame 103 */}
                        <div className={"border relative w-[7.375em] h-[1.4375em] shrink-0 grow-0 flex flex-row justify-center items-center rounded-[100px_100px_100px_100px] border-solid border-[rgba(240,237,232,1.000)]"}>

                          <div className={"text-[0.625em] [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.00] leading-[1em] text-left uppercase text-black relative whitespace-nowrap shrink grow-0"}>
                            <span>{"TEXT / COPYRIGHT"}</span>

                          </div>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Container: Header */}
        <div className={"backdrop-blur-2xl bg-white absolute left-[-0.0625em] w-[80.125em] flex flex-row justify-center items-start gap-[15.1875em] border-t-0 border-x-0 border-solid border-black border-b top-[0em]"}>

          <div className={"relative h-[5.0625em] shrink-0 grow-0 basis-[11.375em] flex flex-row justify-center items-center"}>

            <div className={"text-[1.75em] [font-family:Gilda_Display] font-normal tracking-[0.00] leading-[3.392857em] text-left text-black relative whitespace-nowrap shrink grow-0"}>
              <span>{"Vibe & Make"}</span>

            </div>

          </div>

          <div className={"relative h-[5.0625em] shrink-0 grow-0 basis-[20.875em] flex flex-row justify-center items-start"}>

            {/* Container: Frame 100 */}
            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-center items-center gap-10"}>

              <div className={"relative h-20 shrink-0 grow-0 basis-[2.8125em] flex flex-row justify-center items-center"}>

                <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-center uppercase text-black relative w-[3.214286em] shrink grow-0"}>
                  <span>{"TOOLS"}</span>

                </div>

              </div>

              <div className={"relative h-20 shrink-0 grow-0 basis-[3.5625em] flex flex-row justify-center items-center"}>

                <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-center uppercase text-black relative w-[4.071429em] shrink grow-0"}>
                  <span>{"MAKERS"}</span>

                </div>

              </div>

              <div className={"relative h-20 shrink-0 grow-0 basis-[4.5em] flex flex-row justify-center items-center"}>

                <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-center uppercase text-black relative w-[5.142857em] shrink grow-0"}>
                  <span>{"PROJECTS"}</span>

                </div>

              </div>

              <div className={"relative h-20 shrink-0 grow-0 basis-10 flex flex-row justify-center items-center"}>

                <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-normal tracking-[1.40] leading-[1em] text-center uppercase text-black relative w-[2.857143em] shrink grow-0"}>
                  <span>{"NEWS"}</span>

                </div>

              </div>

            </div>

          </div>

          <div className={"relative h-[5.0625em] shrink-0 grow-0 basis-[11.375em] flex flex-row justify-start items-center"}>

            {/* Container: Frame 427320056 */}
            <div className={"relative w-full shrink-0 grow-0 flex flex-row justify-start items-center gap-10"}>

              <div className={"relative h-10 shrink-0 grow-0 basis-[0.8125em] flex flex-row justify-start items-center"}>

                {/* Image: Text, Size: 14x24 */}
                {/* Note: Take care to respect the original image size and not let allow it to clip. */}
                <div className={"bg-contain bg-no-repeat bg-[center_center] relative w-full h-6 shrink-0 grow-0"}
                  style={{
                    backgroundImage: "url(/images/0751a746-1fc3-4a2f-bb59-d1d786d9b67b.svg)"
                  }} />

              </div>

              <div className={"relative shrink-0 grow-0 basis-[8.0625em] flex flex-row justify-start items-center"}>

                {/* Container: Frame 27 */}
                <div className={"bg-[rgba(231,19,26,1.000)] relative w-full h-10 shrink-0 grow-0 flex flex-row justify-center items-center rounded-[8px_8px_8px_8px]"}>

                  <div className={"text-sm [font-family:IBM_Plex_Sans_Condensed] font-medium tracking-[1.40] leading-[1em] text-center uppercase text-white relative whitespace-nowrap shrink grow-0"}>
                    <span>{"SUBSCRIBE"}</span>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </Container>

  </section>
  );
}

export default ToolToolsSection;