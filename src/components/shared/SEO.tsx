import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://dreamzautomation.lovable.app';

interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogType?: 'website' | 'article';
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SEO = ({
  title,
  description,
  path,
  ogType = 'website',
  image,
  jsonLd,
}: SEOProps) => {
  const url = `${SITE_URL}${path}`;
  const ldArr = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={ogType} />
      {image ? <meta property="og:image" content={image} /> : null}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image ? <meta name="twitter:image" content={image} /> : null}
      {ldArr.map((ld, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(ld)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
