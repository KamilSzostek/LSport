import { FC } from 'react';
import styles from './TableLayout.module.scss';

interface ITableLayoutProps {
    children: React.ReactElement
}

const TableLayout: FC<ITableLayoutProps> = ({ children }) => {
    return <section className={styles.layout}>
        {children}
    </section>;
};

export default TableLayout;
