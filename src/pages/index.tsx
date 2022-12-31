import React, { Fragment } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import highlighTextPrimary from "../components/HighlightText";
import Layout from "../components/Layout";
import Section from "../components/Section";
import SEO from "../components/SEO";
import UserInteractionComponent from "../components/UserInteractionComponent/UserInteraction";
import CopyToClipboard from "../components/Tools/copyToClipboard";
// import CountdownTimer from "../components/Tools/CountDownTimer";

const IndexPage = (props: PageProps) => {
  // const [endTime] = useState(1671559200);

  return (
    <Layout>
      <Section className="space-y-6">
        <StaticImage
          src="../images/FundingMadeEazy.jpeg"
          alt=""
          placeholder="blurred"
          className="my-3"
        />

        <p>
          Welcome to {highlighTextPrimary("FundingMadeEazy")}, the decentralized
          smart contract on the <i>BNB (Binance) Smart Chain</i> that helps you
          raise and receive <b className="italic">Funds</b> (
          <b className="italic">BUSD</b>) in a snap!
        </p>
        <p>
          Our {highlighTextPrimary("Eazy Matrix")} system, which uses a{" "}
          <b className="italic">Multiple of 3 through 7 Repetitions</b>, lets
          you raise <b className="italic">Funds</b> (
          <b className="italic">BUSD</b>) through:
        </p>
        <ol className="list-inside space-y-2 list-disc text-xl pl-4">
          <li>
            {highlighTextPrimary("Eazy Referrals")} (transferred instantly to
            your BUSD wallet)
          </li>
          <li>
            {highlighTextPrimary("Eazy Matrix")} (transferred instantly to your
            BUSD wallet)
          </li>
          <li>
            {highlighTextPrimary("Eazy Rewards")} (available on a Daily
            Recurring Basis for you to Claim)
          </li>
        </ol>
        <p>
          Simply invite three or more people to join who will repeat this{" "}
          {highlighTextPrimary("Eazy")} process.
        </p>
        <p>
          We're all about sharing the wealth here at{" "}
          {highlighTextPrimary("FundingMadeEazy")}.
        </p>
        <p>
          Please refer to our {highlighTextPrimary("Eazy")}
          <b className="italic">Paper</b> for more details.
        </p>
        <p>
          Just Connect your wallet (<i>Trust Wallet or Metamask</i>) to start
          raising <b className="italic">Funds</b> (
          <b className="italic">BUSD</b>) and getting rewarded with{" "}
          {highlighTextPrimary("FundingMadeEazy")} today and everyday!
        </p>
        <p>
          If you have no Referral Link, please use the following address to
          register:
          <div className="my-4" />
          <CopyToClipboard content="0x7291C4Ba40497139e0276a818bEB08E6e86Bdd69" />
        </p>
      </Section>
      <UserInteractionComponent {...props} />
      <Section
        containerClass="bg-[url(/bgs/yellow-waves.png)] bg-no-repeat bg-cover bg-gray-50"
        className="flex justify-center"
        padding
      >
        <div
          id="kryptolite-swap-widget"
          data-referraladdress="0x7291C4Ba40497139e0276a818bEB08E6e86Bdd69"
          data-basetoken="0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56"
          data-color="#f1c410"
          className="bg-white mx-auto w-auto md:p-3 shadow-md text-sm"
        ></div>
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <Fragment>
    <SEO
      title="Home"
      description="FundingMadeEazy is a decentralized smart contract on the Binance Smart Chain (BSC). It used a Multiple of 3 through 7 Repetitions called the Eazy Matrix (every member will have their own Eazy Matrix within the main Eazy Matrix)."
    />
    {/* <!-- Import stylesheet --> */}
    <link
      href="https://kryptolite.rocks/assets/widget/v1/styles.css"
      rel="stylesheet"
    />
    {/* <!-- End stylesheet --> */}
    {/* <!-- Add add javascript --> */}
    <script
      src="https://kryptolite.rocks/assets/widget/v1/main.js"
      async
    ></script>
    <script
      src="https://kryptolite.rocks/assets/widget/v1/kryptolitewidget.min.js"
      async
    ></script>
    {/* <!-- End javascript --> */}
  </Fragment>
);
