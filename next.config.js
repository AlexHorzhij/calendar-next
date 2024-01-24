/**
 * @type {import('next').NextConfig}
 */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  const nextConfig = {
    basePath: "/calendar-next",
    assetPrefix: "/calendar-next",
    output: "export",
  };
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {};
  }

  return nextConfig;
};
