import { FC } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import styles from './LinkButton.module.scss'

interface ILinkButtonProps {
    buttonText: string
    link?: string
}

const LinkButton: FC<ILinkButtonProps> = ({ buttonText, link }) => {
    return (<Link className={styles.link} to={link ? link : ''}>{buttonText}<FontAwesomeIcon icon={faCircleArrowRight} /></Link>);
};

export default LinkButton;
