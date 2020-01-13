import React from "react"
import GameTag from "./gameTag"
import styles from "../styles/review-list.module.css"
import { Link } from "gatsby"

export default ({gamePages}) => {
    return (
        <div className={styles.reviewsListWrapper}>
            {gamePages.map(gamePage => (
                <div className={styles.gameTileWrapper}>
                    <Link to={gamePage.fields.slug} className={styles.gameTile}>
                        <h3 className={styles.gameName}>
                            {gamePage.title}
                        </h3>
                        <div className={styles.tagsWrapper}>
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
                    </Link>
                </div>
                ))}
        </div>
    )
}
