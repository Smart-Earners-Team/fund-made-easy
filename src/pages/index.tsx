import React, { Fragment } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import highlighText from "../components/HighlightText";
import Layout from "../components/Layout";
import Section from "../components/Section";
import SEO from "../components/SEO";
import UserInteractionComponent from "../components/UserInteractionComponent/UserInteraction";
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
          {highlighText("FundingMadeEazy", "text-[#E6B32A] font-bold italic")}{" "}
          is a decentralized smart contract on the Binance Smart Chain (BSC).
        </p>
        <p>
          {highlighText("FundingMadeEazy", "text-[#E6B32A] font-bold italic")}{" "}
          uses a Multiple of 3 through 7 Repetitions called the{" "}
          {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}{" "}
          (every member will have their own{" "}
          {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}{" "}
          within the main{" "}
          {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}).
        </p>
        <p>
          This {highlighText("Eazy Matrix", "text-[#E6B32A] font-bold italic")}{" "}
          assists anyone in raising and receiving Funds (BUSD) in 3 Ways:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            {highlighText(
              "Eazy Referrals",
              "text-[#E6B32A] font-bold no-underline italic"
            )}{" "}
            (transferred instantly to your BUSD wallet)
          </li>
          <li>
            {highlighText(
              "Eazy Matrix",
              "text-[#E6B32A] font-bold no-underline italic"
            )}{" "}
            (transferred instantly to your BUSD wallet)
          </li>
          <li>
            {highlighText(
              "Eazy Rewards",
              "text-[#E6B32A] font-bold no-underline italic"
            )}{" "}
            (available on a Daily Recurring Basis for you to Claim)
          </li>
        </ol>
      </Section>
      {/*       <Section className="flex justify-center flex-col max-w-3xl mx-auto border text-center">
        <div className="p-4 space-y-4">
          <p className="text-center">Countdown to Public Launch</p>
          <CountdownTimer timestamp={endTime} handleDisableButton={() => {}} />
        </div>
      </Section> */}
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
