import React from "react"
import { Link } from "gatsby"
import GameTag from "./gameTag"
import styles from "../styles/review-list.module.css"

export default ({gamePages}) => {
    return (
        <div className={styles.reviewsListWrapper}>
            {gamePages.map(gamePage => (
                <div className={styles.reviewRow}>
                    <div className={styles.nameAndTagsWrapper}>
                        <Link to={gamePage.fields.slug} className={styles.gameName}>
                            {gamePage.title}
                        </Link>
                            {gamePage.tags.map(tag => (
                                <GameTag tagData={tag} />
                                ))}
                    </div>

                    <div className={styles.taglineWrapper}>
                        {gamePage.tagline}
                    </div>

                    <div className={styles.dateWrapper}>
                        {new Date(gamePage.added).toDateString()}
                    </div>
                </div>))}
        </div>
    )
}
