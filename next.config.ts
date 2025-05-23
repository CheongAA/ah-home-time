/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true";
const repoName = "ah-home-time";
const path = isGithubPages ? `/${repoName}` : "";

const nextConfig = {
  output: "export",
  basePath: path,
  assetPrefix: path,
};

module.exports = nextConfig;
