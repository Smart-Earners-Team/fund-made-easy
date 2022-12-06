/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Funding Made Eazy",
    siteUrl: `https://fundingmadeEazy.com`,
    description: "FundingMadeEazy is a decentralized smart contract on the Binance Smart Chain (BSC). It used a Multiple of 3 through 7 Repetitions called the Eazy Matrix (every member will have their own Eazy Matrix within the main Eazy Matrix)."
  },
  flags: {
    DEV_SSR: true
  },
  trailingSlash: "never",
  graphqlTypegen: false,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-nprogress",
      options: {
        color: "#FACC15",
        showSpinner: true,
      },
    },
    "gatsby-plugin-no-sourcemaps",
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/GlobalAppWrapper.tsx"),
      },
    },
  ],
}
