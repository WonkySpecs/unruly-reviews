import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styles from "../styles/layout.module.css"
import SEO from "./seo"

const HeaderLink = props => (
    <li>
        <Link to={props.to}>{props.children}</Link>
    </li>
)

export default ({title, children}) => {
    const data = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }`)
    return (
        <>
            <SEO title={title || ""}/>
            <div className={styles.mainContainer}>
                <h1 className={styles.headerTitle}>{data.site.siteMetadata.title}</h1>
                <nav className={styles.headerLinks}>
                    <ul>
                        <HeaderLink key="home" to="/">Home</HeaderLink>
                        <HeaderLink key="about" to="/about">About</HeaderLink>
                        <HeaderLink key="reviews" to="/reviews">The Reviews</HeaderLink>
                        <HeaderLink key="others" to="/others">Others</HeaderLink>
                    </ul>
                </nav>
                <div className={styles.headerUnderline}/>
                <div className={styles.bodyContent}>
                    {children}
                </div>
            </div>
        </>
    )
}
