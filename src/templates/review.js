import React from "react"
import Layout from "../components/layout"
import { useStaticQuery, graphql } from "gatsby"

const PointList = ({points}) => (
    <ul>
        {points.map(text => {
            return (<li>{text}</li>)
        })}
    </ul>
)

const SummaryList = ({points, color, headerText}) => (
    <div style={{
        "width": "50%",
        "background-color": color,
        "padding": "0 1rem 0 1rem",
        "margin": "0 1rem 0 0"}}>
        <h3>{headerText}:</h3>
        <PointList points={points} />
    </div>
)

const SummaryPoints = ({good, bad}) => {
    return (
        <div style={{"display": "flex", "align-items": "flex-start"}}>
            <SummaryList points={good} color="#99ea83" headerText="Get it for" />
            <SummaryList points={bad} color="#ea839b" headerText="Avoid if" />
        </div>
    )
}


export default props => {
    const summary = props.pageContext.summary;

    const query = useStaticQuery(
        graphql`
            query {
                allMarkdownRemark {
                    edges {
                        node {
                            html
                            fileAbsolutePath
                        }
                    }
                }
            }`);
    // I'm sure this should be done within a query, but I can't figure out how
    const reviewContent = getReviewContent(
        props.pageContext.reviewName, query.allMarkdownRemark.edges);
    return (
        <Layout>
            <h2>{summary.title}</h2>
            {summary.tagline != null && summary.tagline.length > 0 ?
                (<p>{summary.tagline}</p>)
                : null }
            <SummaryPoints good={summary.good} bad={summary.bad} />
            {summary.note != null && summary.note.length > 0 ? (
                <div>
                    <h3>Also notable:</h3>
                    <PointList points={summary.note} />
                </div>)
                : null
            }
            {reviewContent == null ? null
                : (
                <div>
                    <h2>Full Review</h2>
                    <div dangerouslySetInnerHTML={{__html: reviewContent }} />
                </div>

                )}
        </Layout>
    )
}

function getReviewContent(reviewName, allRemarks) {
    console.log("Looking for " + reviewName);
    for (let i = 0; i < allRemarks.length; i++) {
        const remark = allRemarks[i].node;
        if (remark.fileAbsolutePath.endsWith(reviewName + ".md")) {
            return remark.html;
        }
    }
    console.log("Couldn't find");
    return null;
}
