import { json } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/cloudflare";
import { useLoaderData, Link } from "@remix-run/react";
import { motion } from "motion/react";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { QuotableSummary } from "~/components/QuotableSummary";
import { getAllBlogPosts } from "~/lib/blog";

export const meta: MetaFunction = () => {
  return [
    { title: "NVS Insights | School Transportation Blog & Safety Tips" },
    { name: "description", content: "Stay updated with the latest news, safety tips, and technology trends in school transportation from the NVS Travel Solutions team." },
  ];
};

export const loader = async () => {
  const posts = getAllBlogPosts();
  return json({ posts });
};

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <article className="pt-32 pb-24 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <BookOpen size={14} />
            NVS Insights
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-8 tracking-tight">Latest from <span className="text-primary">Our Blog</span></h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Expert insights on student safety, transportation technology, and the future of school commuting.
          </p>
        </header>

        <QuotableSummary text="The NVS Insights blog provides expert analysis on student transportation safety, economic benefits of outsourcing school bus services, and the role of AI in modern fleet management." />

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => {
            const summaryItems = (post.summary || "")
              .split("\n")
              .map((item) => item.replace(/^[\-\*]\s*/, "").trim())
              .filter(Boolean)
              .slice(0, 3);

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden hover:border-primary hover:shadow-2xl transition-all duration-300"
              >
                <Link to={`/blog/${post.slug}`} className="block aspect-video overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${post.slug}/600/400`} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </Link>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <User size={12} />
                      {post.author}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-primary transition-colors leading-tight">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="mb-8 rounded-3xl bg-slate-50 px-4 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary/70 mb-2">
                      TL;DR
                    </p>
                    <ul className="space-y-2 text-slate-500 text-sm leading-relaxed">
                      {summaryItems.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-2 w-2 rounded-full bg-primary/60" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link 
                    to={`/blog/${post.slug}`} 
                    className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                  >
                    Read or Listen <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </section>
      </div>
    </article>
  );
}
