import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"
import ReviewList from "../components/reviewList"

export default ({data}) => (
    <Layout title="Reviews">
        <h2>The reviews</h2>
        <ReviewList gamePages={data.allSummariesJson.edges.map(edge => edge.node)} />
    </Layout>
)

export const query = graphql`
  query {
    allSummariesJson {
      edges {
        node {
          fields {
            slug
          }
          title
          tagline
          added
          tags {
            displayName
            type
            tooltip
          }
        }
      }
    }
  }
`
