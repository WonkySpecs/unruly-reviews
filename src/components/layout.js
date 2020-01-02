import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import containerStyles from "../styles/main-container.module.css"
import SEO from "./seo"

const MainContainer = ({children}) => (
    <div className={containerStyles.mainContainer}>
        {children}
    </div>
)

const HeaderLink = props => (
    <li style={{ display: "inline-block", marginRight: "1rem" }}>
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
                <nav style={{ "align-self": "center" }}>
                    <ul>
                        <HeaderLink to="/">Home</HeaderLink>
                        <HeaderLink to="/about">About</HeaderLink>
                        <HeaderLink to="/reviews-home">The Reviews</HeaderLink>
                        <HeaderLink to="/others">Others</HeaderLink>
                    </ul>
                </nav>
                <div style= {{ "align-self": "start", "padding": "0 1rem" }}>
                    {children}
                </div>
            </MainContainer>
        </>
    )
}
