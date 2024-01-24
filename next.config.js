/**
 * @type {import('next').NextConfig}
 */

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {};
  }

  return {
    output: "export",
  };
};
