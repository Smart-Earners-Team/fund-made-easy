import React, { useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import highlighText from "../components/HighlightText";
import Layout from "../components/Layout";
import Section from "../components/Section";
import SEO from "../components/SEO";
import UserInteractionComponent from "../components/UserInteractionComponent/UserInteraction";
import CountdownTimer from "../components/Tools/CountDownTimer";

const IndexPage = (props: PageProps
  ) => {
  const [endTime] = useState(1671559200);

  return (
    <Layout>
      <Section padding className="space-y-6">
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
      <Section className="flex justify-center flex-col max-w-3xl mx-auto border text-center">
        <div className="p-4 space-y-4">
          <p className="text-center">Countdown to Public Launch</p>
          <CountdownTimer timestamp={endTime} handleDisableButton={() => {}} />
        </div>
      </Section>
      <UserInteractionComponent {...props} />
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO
    title="Home"
    description="FundingMadeEazy is a decentralized smart contract on the Binance Smart Chain (BSC). It used a Multiple of 3 through 7 Repetitions called the Eazy Matrix (every member will have their own Eazy Matrix within the main Eazy Matrix)."
  />
);
