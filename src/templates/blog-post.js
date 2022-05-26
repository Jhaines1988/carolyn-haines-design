import React from 'react';
import { Link, graphql } from 'gatsby';
import * as styles from './blog-post.modules.css';
import Seo from '../components/SEO/seo';
const BlogPostTemplate = ({ data }) => {
  const name = data.contentfulBlogPost.author.name;
  const slug = data.contentfulBlogPost.slug;
  const title = data.contentfulBlogPost.title;
  const date = data.contentfulBlogPost.date;
  const heroData = data.contentfulBlogPost.heroImage;
  const body = data.contentfulBlogPost.body.raw;
  const seo = data.contentfulBlogPost.seo;
  return (
    <div>
      <Seo title={seo.title} description={seo.description.description} />
      <span>{title}</span>
      <span>Author: {name}</span>
    </div>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug(
    $slug: String!
    $previousPostSlug: String
    $nextPostSlug: String
  ) {
    contentfulBlogPost(slug: { eq: $slug }) {
      slug
      title
      author {
        name
      }
      date(formatString: "MMMM Do YYYY")
      heroImage {
        image {
          gatsbyImageData(
            layout: FULL_WIDTH
            placeholder: TRACED_SVG
            width: 1280
          )
          resize(height: 630, width: 1200) {
            src
          }
        }
        artistName
        artistUrl
        sourceName
        sourceUrl
      }
      body {
        raw
      }
      seo {
        description {
          description
        }
        title
      }
    }
    previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
      slug
      title
    }
    next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
      slug
      title
    }
  }
`;
