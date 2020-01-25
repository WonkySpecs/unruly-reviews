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

export default ({tagData, tooltipDisabled, onClick}) => {
    const { displayName, type, tooltip } = tagData;
    return (
        <div className={classForTagType(type)} onClick={onClick}>
            {displayName}
            {tooltipDisabled ? null : (
                <div className={styles.tooltip}>
                    {type}: {tooltip}
                </div>
            )}
        </div>
    )
}
