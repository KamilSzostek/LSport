import { FC } from 'react';
import EnglishFlag from '../../assets/englishflag.png'
import styles from './MainTitle.module.scss'
import LinkButton from '../LinkButton/LinkButton';

interface IMainTitleProps {
    buttonText: string
    link: string
}

const MainTitle: FC<IMainTitleProps> = (props) => {
    return(
        <section className={styles.title}>
        <h2>
            <img className={styles.iconFlag} src={EnglishFlag} alt="flaga Angli" />
            Anglia: Premier League
        </h2>
        <LinkButton {...props}/>
    </section>
    );
};

export default MainTitle;
