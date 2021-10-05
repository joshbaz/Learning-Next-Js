import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>Hi, my name is Joshua Kimbareeba and am in love with sofware development :)</p>
        <p>
          You can find my personal website -  {" "}
          <a href="https://joshuakimbareeba.co.ke">my portifolio</a>.
        </p>
      </section>
    </Layout>
  );
}
