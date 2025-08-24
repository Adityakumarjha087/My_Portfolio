import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

// Blog post interface
type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  image: string;
};

// Sample blog posts data
const blogPosts: BlogPost[] = [
  {
    title: 'Getting Started with Next.js 13',
    excerpt: 'Learn the basics of Next.js 13 and how to leverage its new features in your projects.',
    date: 'May 15, 2023',
    readTime: '5 min read',
    category: 'Web Development',
    slug: 'getting-started-with-nextjs-13',
    image: '/images/blog/nextjs.jpg' // This image might not exist
  },
  {
    title: 'Mastering React Hooks',
    excerpt: 'A comprehensive guide to understanding and using React Hooks effectively.',
    date: 'April 28, 2023',
    readTime: '8 min read',
    category: 'React',
    slug: 'mastering-react-hooks',
    image: '/images/blog/react-hooks.jpg' // This image might not exist
  },
  {
    title: 'The Future of Web Development',
    excerpt: 'Exploring the latest trends and technologies shaping the future of web development.',
    date: 'April 10, 2023',
    readTime: '6 min read',
    category: 'Web Development',
    slug: 'future-of-web-development',
    image: '/images/blog/web-dev.jpg' // This image might not exist
  },
];

// Fallback component for blog post images
const BlogImage = ({ src, alt }: { src: string; alt: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 overflow-hidden relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
        </div>
      )}
      <Image 
        src={imgSrc}
        alt={alt}
        width={400}
        height={250}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setImgSrc('/images/blog/nextjs.jpg');
          setIsLoading(false);
        }}
      />
    </div>
  );
};

export const Blog = () => {
  return (
    <section id="blog" className="py-20 bg-black">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left">
            Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Blog</span> Posts
          </h2>
          <Link 
            href="/blog" 
            className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            View All Posts
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <BlogImage src={post.image} alt={post.title} />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span>{post.date}</span>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex justify-between items-center">
                  <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                    {post.category}
                  </span>
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium flex items-center"
                  >
                    Read More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </div>
    </section>
  );
};

export default Blog;
