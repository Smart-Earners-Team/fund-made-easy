/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: "Funding Made Easy",
    siteUrl: `https://fundingmadeeasy.com`,
    description: "FundingMadeEazy is a decentralized smart contract on the Binance Smart Chain (BSC). It is a Multiple of 3 through 7 Repetitions called the Easy Matrix (every member will have their own Easy Matrix within the main Easy Matrix)."
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
    {
      resolve: "gatsby-plugin-layout",
      options: {
        component: require.resolve("./src/components/GlobalAppWrapper.tsx"),
      },
    },
  ],
}
