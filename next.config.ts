const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "ah-home-time";

import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repoName}` : "",
  assetPrefix: isGithubPages ? `/${repoName}/` : "",
  trailingSlash: true,
};

module.exports = nextConfig;
