import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import {getSortedPostsData} from '../lib/posts';

export async function getStaticProps(){
  const allPostsData = getSortedPostsData()

  return {
    props : {
      allPostsData
    }
  }
}

export default function Home({allPostsData}) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={utilStyles.headingMd}>
        <p>
          Hi, my name is Joshua Kimbareeba and am in love with software
          development :)
        </p>
        <p>
          You can find all my works on my personal website -{" "}
          <a href="https://joshuakimbareeba.co.ke">my portifolio</a>.
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
