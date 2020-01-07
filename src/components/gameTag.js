import React from "react"
import styles from "../styles/game-tag.module.css"

function classForTagType(tagType) {
    switch (tagType) {
        case "genre":
            return styles.genreTag;

        case "theme":
            return styles.themeTag;

        default:
            return styles.gameTag;
    }
}

export default ({displayName, tagType}) => (
    <div className={classForTagType(tagType)}>{displayName}</div>
)
