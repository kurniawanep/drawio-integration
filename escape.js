/**
 * Escapes XML content for inclusion in an HTML attribute.
 * This function replaces special characters with their corresponding HTML entities.
 *
 * @param {string} xml - The XML content to be escaped.
 * @returns {string} - The escaped XML content.
 */
function escapeXmlContent(xml) {
  return xml
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Fixes the SVG content by escaping special characters and ensuring correct structure.
 *
 * @param {string} svg - The original SVG content.
 * @returns {string} - The fixed SVG content.
 */
function fixSvgContent(svg) {
  // Create a DOM parser to parse the SVG content
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svg, "image/svg+xml");

  // Find and fix the 'content' attribute if it exists
  const contentAttr = svgDoc.documentElement.getAttribute("content");
  if (contentAttr) {
    const escapedContent = escapeXmlContent(contentAttr);
    svgDoc.documentElement.setAttribute("content", escapedContent);
  }

  // Serialize the fixed SVG content back to a string
  const serializer = new XMLSerializer();
  return serializer.serializeToString(svgDoc);
}
