/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: "Something to do with board games",
        description: "To-the-point reviews of really great board games",
        author: "Will Taylor",
    },
    plugins: [
        'gatsby-transformer-json',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './src/data',
            }
        },
        'gatsby-transformer-remark',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: './src/data',
            }
        },
        'gatsby-plugin-react-helmet',
    ],
    mapping: {
        "SummariesJson.review": "MarkdownRemark.frontmatter.gameId",
    },
}
