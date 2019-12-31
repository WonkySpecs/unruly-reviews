import React from "react"
import Layout from "../components/layout"
import { Link } from "gatsby"

export default ({data}) => {
    let summaryNodes = data.allFile.edges.map(edge => edge.node);
    summaryNodes.sort((s1, s2) => s1.mtime < s2.mtime);
    return (
    <Layout>
        <div dangerouslySetInnerHTML={introText(data)} />
        {summaryNodes.map(node => {
            const summary = node.childSummariesJson;
            return (
                <div>
                    <Link to={summary.fields.slug}>{summary.title}</Link>
                    {summary.tagline != null && summary.tagline.length > 0 ? (
                        <span> - {summary.tagline} </span>)
                        : null}
                </div>)
        })}
    </Layout>
)}

export const query = graphql`
    query {
        allMarkdownRemark(filter: {fileAbsolutePath: {regex: "/home.md$/"}}) {
            edges {
                node {
                    html
                }
            }
        }
        allFile(filter: {childSummariesJson: {title: {ne: null}}}) {
            edges {
                node {
                    mtime
                    childSummariesJson {
                        title
                        tagline
                        fields {
                            slug
                        }
                    }
                }
            }
        }
    }
`

function introText(data) {
    return { __html: data.allMarkdownRemark.edges[0].node.html };
}
