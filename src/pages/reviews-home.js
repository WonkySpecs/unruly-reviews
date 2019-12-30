import React from "react"
import Layout from "../components/layout"
import { Link, graphql } from "gatsby"

export default ({data}) => (
    <Layout>
        <h2>The reviews</h2>
        {data.allSummariesJson.edges.map(({node}) => (
            <div>
                <Link to={node.fields.slug}>{node.title}</Link>
            </div>
        ))}
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
        }
      }
    }
  }
`
