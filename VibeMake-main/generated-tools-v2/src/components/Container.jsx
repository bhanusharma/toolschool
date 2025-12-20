/*
 * Generated from Figma design — Thu Aug 14 2025
 * Figma File: Vibe & Make
 * Figma URL: https://www.figma.com/file/foJ9tLDEe0i7DWLADX7T6n/Vibe%20%26%20Make
 */

import React from "react";


/**
 * @param {object} props
 * @param {number} props.maxWidth - Maximum width (px) for centered inner content.
 * @param {number} props.scalingFactor - Sets font-size on inner wrapper as scalingFactor + "cqw"; all em units scale with container width.
 * @param {React.ReactNode} props.children - Content.
 *
 * Container
 *
 * - Outer div: 100% width.
 * - Inner div: centered and bounded by maxWidth.
 *   Sets containerType: "inline-size" for cqw units.
 * - scalingFactor is required; wraps children in a div with font-size: scalingFactor + "cqw".
 *   All descendant em units (font, margin, padding, gap, etc.) scale linearly with container width.
 *
 * For backgrounds, borders, and other full-width effects, use a wrapper around Container.
 * If you want unbounded, unscaled content, do not use this Container.
 */
export function Container({
  maxWidth,
  scalingFactor,
  children,
}) {
  const outerStyle = {
    width: "100%",
  };

  const innerStyle = {
    width: "100%",
    maxWidth: maxWidth + "px",
    marginLeft: "auto",
    marginRight: "auto",
    containerType: "inline-size",
    contain: "layout inline-size",
  };

  return (
    <div style={outerStyle}>
      <div style={innerStyle}>
        <div style={{ fontSize: String(scalingFactor) + "cqw" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * USAGE EXAMPLES (Tailwind)
 *
 * // Full-width border, bounded readable content
 * <div className="w-full border-b-4 border-black">
 *   <Container maxWidth={960} scalingFactor={3}>
 *     <h1 className="text-3xl font-bold">Bounded Content</h1>
 *     <p className="text-lg">Border is full page width, content is centered and bounded. All em units scale fluidly.</p>
 *   </Container>
 * </div>
 *
 * // Full-width background, bounded readable content
 * <div className="w-full bg-cover bg-center" style={{ backgroundImage: "url(/img/bg.jpg)" }}>
 *   <Container maxWidth={960} scalingFactor={3}>
 *     <h1 className="text-4xl font-bold text-white">Bounded Content</h1>
 *     <p className="text-lg text-white">Background fills the page, content is centered and bounded. All em units scale fluidly.</p>
 *   </Container>
 * </div>
 *
 * // Full-width background, full-width border, bounded content
 * <div className="w-full bg-gray-200 border-b-2 border-blue-500">
 *   <Container maxWidth={960} scalingFactor={3}>
 *     <h1 className="text-3xl font-bold">Bounded Content</h1>
 *     <p className="text-lg">Background and border are full width. Content is centered and bounded. All em units scale fluidly.</p>
 *   </Container>
 * </div>
 */


export default Container;