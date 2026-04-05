import { json } from "@remix-run/cloudflare";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { QuotableSummary } from "~/components/QuotableSummary";
import { SEO } from "~/components/SEO";
import { AudioSummaryPlayer } from "~/components/AudioSummaryPlayer";
import { getBlogPostBySlug } from "~/lib/blog";

function getArticleImages(slug: string) {
  return [
    `https://picsum.photos/seed/${slug}-hero/1200/720`,
    `https://picsum.photos/seed/${slug}-inline-1/900/560`,
    `https://picsum.photos/seed/${slug}-inline-2/900/560`,
  ];
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const post = params.slug ? getBlogPostBySlug(params.slug) : null;

  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }

  return json({ post });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) return [{ title: "Post Not Found" }];
  return [
    { title: `${data.post.title} | NVS Insights` },
    { name: "description", content: data.post.summary },
  ];
};

export default function BlogPost() {
  const { post } = useLoaderData<typeof loader>();
  const summaryText = post.summary?.trim() || post.content.slice(0, 220);
  const summaryItems = summaryText
    .split("\n")
    .map((item) => item.replace(/^[\-\*]\s*/, "").trim())
    .filter(Boolean);
  const paragraphs = post.content
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const articleAudioText = [
    post.title,
    "Summary points.",
    ...summaryItems,
    "Full article.",
    ...paragraphs,
  ].join(" ");
  const [heroImage, firstInlineImage, secondInlineImage] = getArticleImages(post.slug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.summary,
    "author": {
      "@type": "Organization",
      "name": "NVS Travel Solutions"
    },
    "datePublished": post.publishedAt,
    "publisher": {
      "@type": "Organization",
      "name": "NVS Travel Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "/nvs-logo.svg"
      }
    }
  };

  return (
    <article className="pt-32 pb-24 min-h-screen">
      <SEO 
        title={post.title} 
        description={post.summary || ""} 
        schema={articleSchema}
        type="article"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-12 font-bold text-sm uppercase tracking-widest"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        <header className="mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.publishedAt).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              {post.author}
            </div>
          </div>
        </header>

        <figure className="mb-10 overflow-hidden rounded-[2.5rem] border border-slate-200 bg-slate-100 shadow-sm">
          <img
            src={heroImage}
            alt={post.title}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        </figure>

        <QuotableSummary text={summaryText} className="mb-6 rounded-[2.5rem] border border-primary/10" />
        <div className="mb-12">
          <AudioSummaryPlayer
            text={articleAudioText}
            label="Listen to the Article"
            description="Play the full article, including the TL;DR points, as audio in your browser."
          />
        </div>

        <section className="prose prose-lg prose-slate max-w-none">
          <div className="space-y-8 text-slate-600 leading-relaxed text-lg">
            {paragraphs.map((paragraph, index) => (
              <div key={`${post.id}-${index}`} className="space-y-8">
                <p>{paragraph}</p>
                {index === 0 ? (
                  <figure className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
                    <img
                      src={firstInlineImage}
                      alt={`${post.title} supporting visual 1`}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </figure>
                ) : null}
                {index === 2 ? (
                  <figure className="overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50">
                    <img
                      src={secondInlineImage}
                      alt={`${post.title} supporting visual 2`}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </figure>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
