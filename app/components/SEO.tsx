import { Helmet } from "react-helmet-async";
import { HelmetProvider } from "react-helmet-async";


interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  schema?: object;
}

export function SEO({ title, description, canonical, type = "website", schema }: SEOProps) {
  const siteName = "NVS Travel Solutions";
  const fullTitle = `${title} | ${siteName}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      {canonical && <link rel="canonical" href={canonical} />}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}
