import Head from 'next/head';

const SEO = ({ title, description }) => (
  <Head>
    <title>{title} | SkillBoost</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
  </Head>
);

export default SEO;