import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import styles from "../styles/layout.module.css"
import SEO from "./seo"

const MainContainer = ({children}) => (
    <div className={styles.mainContainer}>
        {children}
    </div>
)

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
            <MainContainer>
                <h1>{data.site.siteMetadata.title}</h1>
                <nav>
                    <ul>
                        <HeaderLink to="/">Home</HeaderLink>
                        <HeaderLink to="/about">About</HeaderLink>
                        <HeaderLink to="/reviews-home">The Reviews</HeaderLink>
                        <HeaderLink to="/others">Others</HeaderLink>
                    </ul>
                </nav>
                <div className={styles.headerUnderline}/>
                <div className={styles.bodyContent}>
                    {children}
                </div>
            </MainContainer>
        </>
    )
}
