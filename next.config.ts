import type { NextConfig } from "next";
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "ah-home-time";
const path = isGithubPages ? `/${repoName}` : "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: path,
  assetPrefix: path,
};

export default nextConfig;
