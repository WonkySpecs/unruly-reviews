import React from "react"
import styles from "../styles/refinable-review-list.module.css"
import GameTag from "./gameTag" 
import { getFromId } from "../utils/data"

const SortInput = props => (
    <div className={styles.inputWrapper + " " + styles.sortInput}>
        <label htmlFor="sortFieldSelect">Order by</label>
        <select id="sortFieldSelect" onChange={props.onfieldchange}>
            {props.options.map(option => (
                <option key={option.value} value={option.value}>{option.text}</option>
            ))}
        </select>
        <button
            id="ascendingCheck"
            type="checkbox"
            onClick={props.toggledirection}>
            {props.sortingAsc ? "↑" : "↓"} 
        </button>
    </div>
)

const FilterInput = ({tags, addFilter}) => {
    const tagGroups = tags.reduce((groups, tag) => {
        groups[tag.type] = groups[tag.type] || [];
        groups[tag.type].push(tag);
        return groups;
    }, {});

    const nameCmp = (tag1, tag2) => tag1.displayName > tag2.displayName;

    const tagSelector = (
        <select id="filterSelect">
            {Object.entries(tagGroups).map(([type, tags]) => {
                const options = tags.sort(nameCmp).map(tag => (
                    <option key={tag.id} value={tag.id}>{tag.displayName}</option>
                ));
                return (
                    <optgroup key={type} label={type}>
                        {options}
                    </optgroup>
                );
            })}
        </select>
    )

    const onAddClick = () => {
        const selected = document.getElementById("filterSelect").value;
        addFilter(getFromId(selected, tags));
    }

    return (
        <div className={styles.inputWrapper}>
            <label htmlFor="filterSelect">Filter by</label>
            {tagSelector}
            <button onClick={onAddClick}>Add</button>
        </div>
    )
}

const FilterList = ({tags, onClickTag}) => {
    if (tags === null || tags.length === 0) {return null}
    return (
        <div className={styles.filterTagsWrapper}>
            {tags.map(tag => (
                <GameTag 
                    key={tag.id}
                    tagData={tag} 
                    tooltipDisabled
                    onClick={() => onClickTag(tag.id)}/>
            ))}
        </div>
    )
}

export { SortInput, FilterInput, FilterList }
