import React, { useState } from "react"
import ReviewList from "./reviewList"
import styles from "../styles/refinable-review-list.module.css"
import { SortInput, FilterInput, FilterList } from "./refinableReviewListHeader"
import { containsNode, removeById } from "../utils/data"

export default ({gamePages}) => {
    const [sortField, setSortField] = useState("date");
    const [sortAsc, setSortAsc] = useState(false);
    const [filterTags, setFilterTags] = useState([]);

    const options = buildOptions()

    // Get all tags, unique by id, which exist on any gamePage
    const tags = []
    for (const tag of gamePages.flatMap(gamePage => gamePage.tags)) {
        if (!containsNode(tags, tag)) {
            tag.filteringBy = containsNode(filterTags, tag);
            tags.push(tag);
        }
    }

    return (
        <div>
            <div className={styles.controlsWrapper}>
                <SortInput
                    onfieldchange={ev => setSortField(ev.target.value)}
                    options={options}
                    toggledirection={() => setSortAsc(!sortAsc)}
                    sortingAsc={sortAsc} />

                <FilterInput
                    addFilter={
                        tag => setFilterTags(filterTags.concat([tag]))
                    }
                    tags={tags.filter(tag => !tag.filteringBy)} />

                <FilterList
                    tags={tags.filter(tag => tag.filteringBy)}
                    onClickTag={id => setFilterTags(removeById(filterTags, id))}/>
            </div>
            <ReviewList gamePages={
                filterBy(filterTags, gamePages)
                    .sort(compareFn(sortField, sortAsc))
                } />
        </div>
    )
}

const sortFields = {
    "date": {
        text: "Date Added",
        getter: page => page.added,
    },
    "name": {
        text: "Name",
        getter: page => page.title,
    }
};

function buildOptions() {
    let options = [];
    for (const opt in sortFields) {
        options.push({value: opt, text: sortFields[opt].text});
    }
    return options;
}

function compareFn(field, isAscending) {
    const getFieldValue = sortFields[field].getter;
    return isAscending ? (p1, p2) => getFieldValue(p1) > getFieldValue(p2)
                       : (p1, p2) => getFieldValue(p1) < getFieldValue(p2);
}

function filterBy (tags, pages) {
    if (tags.length === 0) { return pages }
    return pages.filter(page => tags.some(tag => containsNode(page.tags, tag)));
}
