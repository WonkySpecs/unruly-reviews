import React from "react"
import Layout from "../components/layout"
import styles from "../styles/review.module.css"
import GameTag from "../components/gameTag"

const PointList = ({points}) => (
    <ul className={styles.pointList}>
        {points.map(text => {
            return (<li>{text}</li>)
        })}
    </ul>
)

const SummaryBox = ({points, color, headerText}) => (
    <div className={styles.summaryBox} style={{"background-color": color}}>
        <h3 className={styles.pointListTitle}>{headerText}:</h3>
        <PointList points={points} />
    </div>
)

const SummaryPoints = ({good, bad}) => {
    return (
        <div className={styles.summaryPointsContainer}>
            <SummaryBox points={good} color="#99ea83" headerText="Get it for" />
            <SummaryBox points={bad} color="#ea839b" headerText="Avoid if" />
        </div>
    )
}


export default props => {
    const summary = props.pageContext.summary;
    const reviewContent = summary.review != null ? summary.review.html : null;
    return (
        <Layout title={summary.title}>
            <span className={styles.titleWrapper}>
                <h2>{summary.title}</h2>
                {summary.tags != null && summary.tags.length > 0 ? (
                    <div className={styles.tagList}>
                        {summary.tags.map(tag => (
                            <GameTag tagData={tag} />
                            ))}
                    </div> )
                    : null }
            </span>
            {summary.tagline != null && summary.tagline.length > 0 ?
                (<p>{summary.tagline}</p>)
                : null }
            <SummaryPoints good={summary.good} bad={summary.bad} />
            {summary.note != null && summary.note.length > 0 ? (
                <div>
                    <h3 className={styles.pointListTitle}>Also notable:</h3>
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
