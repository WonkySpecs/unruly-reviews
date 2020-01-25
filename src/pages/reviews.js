import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import RefinableReviewList from "../components/refinableReviewList"

export default ({data}) => (
    <Layout title="Reviews">
        <h2>The reviews</h2>
        <RefinableReviewList gamePages={data.allSummariesJson.edges.map(edge => edge.node)} />
    </Layout>
)

export const query = graphql`
  query {
    allSummariesJson(sort: {fields: added, order: DESC}) {
      edges {
        node {
          fields {
            slug
          }
          title
          tagline
          added
          tags {
            id
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
  }
`
