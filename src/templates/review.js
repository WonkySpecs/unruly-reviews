import React from "react"
import Layout from "../components/layout"

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
    return (
        <Layout>
            <h2>{summary.title}</h2>
            <SummaryPoints good={summary.good} bad={summary.bad} />
            { summary.note != null && summary.note.length > 0 ? (
                <div>
                    <h3>Also notable:</h3>
                    <PointList points={summary.note} />
                </div>)
                : null
            }
        </Layout>
    )
}
