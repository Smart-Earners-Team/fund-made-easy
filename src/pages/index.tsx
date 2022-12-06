import { HeadFC } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import highlighText from "../components/HighlightText";
import Layout from "../components/Layout";
import Section from "../components/Section";
import SEO from "../components/SEO";

const IndexPage = () => {
  return (
    <Layout>
      <Section padding className="space-y-6">
        <h1>Fund Made Easy</h1>
        <p>
          {highlighText("FundingMadeEazy", "text-[#E6B32A] font-bold")} is a
          decentralized smart contract on the Binance Smart Chain (BSC).
        </p>
        <p>
          {highlighText("FundingMadeEazy", "text-[#E6B32A] font-bold")} is a
          Multiple of 3 through 7 Repetitions called the{" "}
          {highlighText("Easy Matrix", "text-[#E6B32A] font-bold")} (every
          member will have their own{" "}
          {highlighText("Easy Matrix", "text-[#E6B32A] font-bold")} within the
          main {highlighText("Easy Matrix", "text-[#E6B32A] font-bold")}).
        </p>
        <p>
          This Easy Matrix assists anyone in raising and receiving Funds (BUSD)
          in 3 Ways:
        </p>
        <ol className="list-decimal list-inside">
          <li>
            {highlighText("Easy Referrals", "text-[#E6B32A] font-bold no-underline")}{" "}
            (transferred instantly to your BUSD wallet)
          </li>
          <li>
            {highlighText("Easy Matrix", "text-[#E6B32A] font-bold no-underline")}{" "}
            (transferred instantly to your BUSD wallet)
          </li>
          <li>
            {highlighText("Easy Rewards", "text-[#E6B32A] font-bold no-underline")}{" "}
            (transferred to your BUSD wallet on a Daily Recurring Basis)
          </li>
        </ol>
      </Section>
      <Section padding className="pointer-events-none relative">
        <div className="blur-sm">
          <StaticImage
            src="../images/panel-preview.png"
            alt=""
            placeholder="tracedSVG"
            layout="fullWidth"
          />
        </div>
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded">
          <div className="w-full max-w-lg p-4">
            <StaticImage
              src="../images/coming-soon.jpg"
              alt="Coming soon"
              layout="fullWidth"
              placeholder="blurred"
              className="shadow shadow-black rounded"
            />
          </div>
        </div>
      </Section>
      {/* <Section padding className="space-y-6">
        <h2>Lorem Ipsum Dolor Sit</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. In nisi ut sit tellus
          ultricies. Urna nunc ac nulla ac scelerisque sed arcu quis dignissim.
          Dignissim blandit arcu quis dapibus. Ultricies tristique tortor nisi
          lacus adipiscing pharetra nisl id velit. In turpis magna a nunc
          ultrices feugiat eu. Dolor scelerisque eget vitae condimentum quis
          gravida pellentesque ac felis. Dolor interdum accumsan hendrerit
          blandit. Eget turpis diam vulputate tortor condimentum enim pharetra.
          Adipiscing non tristique sed facilisis rhoncus amet fringilla purus.
          Tincidunt semper purus malesuada sit. Faucibus tempus rutrum leo
          cursus.
        </p>
        <p>
          Egestas accumsan pharetra proin risus ipsum. Ut eu viverra in libero
          dignissim varius ut. Nibh sed tellus fermentum commodo sapien. Vel sit
          commodo praesent curabitur urna imperdiet ornare maecenas. Ultricies
          morbi eu orci lobortis ornare cras. Blandit lacinia molestie duis
          dignissim leo dignissim urna quam in.
        </p>
        <p>
          Tortor consectetur ac odio bibendum tempor. Lacinia condimentum sit
          sagittis sed etiam eu et commodo enim. Praesent vel in egestas aenean
          eget eu id facilisi diam. Ut id sed blandit imperdiet velit at sit.
          Semper id ante praesent et amet viverra.
        </p>
      </Section> */}
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <SEO
    title="Home"
    description="FundingMadeEazy is a decentralized smart contract on the Binance Smart Chain (BSC). It is a Multiple of 3 through 7 Repetitions called the Easy Matrix (every member will have their own Easy Matrix within the main Easy Matrix)."
  />
);
