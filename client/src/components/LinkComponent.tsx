import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { LinkProps } from "../AppTypes";

const LinkComponent: FunctionComponent<LinkProps> = ({
    to,
    className,
    children,
}) => (
    <Link to={to} className={className}>
        {children}
    </Link>
);

export const StyledLink = styled(LinkComponent)`
    display: block;
    color: white;
    width: 80%;
    border: 1px solid #616161;
    margin: 5px;
    text-decoration: none;
    padding-left: 10px;
    :hover {
        color: #c5e1a5;
        font-weight: bold;
    }
`;

export const StyledHighlightedLink = styled(LinkComponent)`
    display: block;
    color: white;
    width: 80%;
    border: 1px solid #616161;
    background-color: #7cb342;
    margin: 5px;
    text-decoration: none;
    padding-left: 10px;
    :hover {
        color: #c5e1a5;
        font-weight: bold;
    }
`;

export const StyledButtonLink = styled(LinkComponent)`
    display: block;
`;

export const StyledMarginButtonLink = styled(LinkComponent)`
    display: block;
    margin: 10px 10px !important;
`;
