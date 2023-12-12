import { FC } from 'react';
import styles from './MainLayout.module.scss';

interface IMainLayoutProps {
    children: React.ReactElement
}

const MainLayout: FC<IMainLayoutProps> = ({ children }) => {
    return <main className={styles.layout}>
        {children}
    </main>;
};

export default MainLayout;
