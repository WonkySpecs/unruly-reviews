const path = require('path');
exports.onCreateNode = ({ node, getNode, actions }) => {
    const {createNodeField} = actions;
    if (node.internal.type === "SummariesJson") {
        createNodeField({
            node,
            name: 'slug',
            value: '/reviews/' + getNode(node.parent).name
        });
    }
}

exports.createPages = async ({ graphql, actions }) => {
    const {createPage} = actions;
    const summaries = await graphql(`query {
      allSummariesJson {
        edges {
          node {
            fields {
              slug
            }
            good
            bad
            tagline
            note
            title
            review {
                html
            }
            tags {
                displayName
                type
                tooltip
            }
          }
        }
      }
    }`);
    summaries.data.allSummariesJson.edges.forEach(edge => {
        const pathParts = edge.node.fields.slug.split("/");
        createPage({
            path: edge.node.fields.slug,
            component: path.resolve('./src/templates/review.js'),
            context: {
                summary: edge.node,
                reviewName: pathParts[pathParts.length - 1]
            }
        });
    })
}
