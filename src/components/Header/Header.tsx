import { FC } from 'react';
import Logo from '../../../src/assets/logo.png'
import styles from './Header.module.scss'

const Header: FC = () => {
    return (
        <header className={styles.header}>
            <figure>
                <img src={Logo} alt="l sport logo" />
            </figure>
        </header>
    );
};

export default Header;
