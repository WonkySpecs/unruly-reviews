import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default ({data}) => (
    <Layout>
        <div dangerouslySetInnerHTML={{__html: data.allMarkdownRemark.edges[0].node.html }} />
    </Layout>
)

export const query = graphql`
    query {
        allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/about.md$/"}}) {
            edges {
                node {
                    html
                }
            }
        }
    }
`
