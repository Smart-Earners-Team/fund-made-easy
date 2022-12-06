import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import Layout from "../components/Layout";
import Section from "../components/Section";

const IndexPage = () => {
  return (
    <Layout>
      <Section padding>
        <h1>Lorem Ipsum Dolor Sit</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur. In nisi ut sit tellus
          ultricies. Urna nunc ac nulla ac scelerisque sed arcu quis dignissim.
          Dignissim blandit arcu quis dapibus. Ultricies tristique tortor nisi
          lacus adipiscing pharetra nisl id velit.
        </p>
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
              alt=""
              layout="fullWidth"
              placeholder="blurred"
              className="shadow shadow-black rounded"
            />
          </div>
        </div>
      </Section>
      <Section padding className="space-y-6">
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
      </Section>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;
