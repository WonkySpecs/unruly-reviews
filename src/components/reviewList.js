import React from "react"
import GameTag from "./gameTag"
import styles from "../styles/review-list.module.css"
import { Link } from "gatsby"

export default ({gamePages}) => {
    return (
        <nav className={styles.reviewsListWrapper}>
            {gamePages.map(gamePage => (
                <div key={gamePage.title} className={styles.gameTileWrapper}>
                    <Link to={gamePage.fields.slug} className={styles.gameTile}>
                        <h3 className={styles.gameName}>
                            {gamePage.title}
                        </h3>
                        <div className={styles.tagsWrapper}>
                            {gamePage.tags.map(tag => (
                                <GameTag key={tag.id} tagData={tag} />
                                ))}
                        </div>

                        <div className={styles.taglineWrapper}>
                            {gamePage.tagline}
                        </div>

                        <div className={styles.footer}>
                            <div className={styles.reviewStatus}>
                                {gamePage.review == null ?
                                    "Summary Only" : "Full Review" }
                            </div>
                            <div className={styles.dateWrapper}>
                                {new Date(gamePage.added).toDateString()}
                            </div>
                        </div>
                    </Link>
                </div>
                ))}
        </nav>
    )
}
