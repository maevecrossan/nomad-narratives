import React from "react";
import Dropdown from "react-bootstrap/dropdown";
import styles from "../styles/OptionsDropdown.module.css";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fas fa-ellipsis-v"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

export const OptionsDropdown = () => {
    return (
        <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={ThreeDots} />

        <Dropdown.Menu className="text-center">
            <Dropdown.Item eventKey="1">Red</Dropdown.Item>
            <Dropdown.Item eventKey="2">Blue</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    )
}
