import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import ReviewList from "../components/reviewList"

export default ({data}) => {
    let gamePages = data.allSummariesJson.edges.map(edge => edge.node);
    return (
        <Layout title="Home">
            <div dangerouslySetInnerHTML={introText(data)} />
            <ReviewList gamePages={gamePages} />
        </Layout>
    )
}

export const query = graphql`
    query {
      allSummariesJson(sort: {fields: added, order: DESC}, limit: 3) {
        edges {
          node {
            fields {
              slug
            }
            tagline
            title
            added
            tags {
              displayName
              type
              tooltip
            }
            review {
                id
            }
          }
        }
      }
      allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/home.md$/"}}) {
        edges {
          node {
            html
          }
        }
      }
    }
`

function introText(data) {
    return { __html: data.allMarkdownRemark.edges[0].node.html };
}
