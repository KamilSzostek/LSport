import { FC } from 'react';
import { Triangle } from 'react-loader-spinner';
import styles from './Loader.module.scss'

const Loader: FC = () => {
    return (
        <div className={styles.loader}>
            <Triangle
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                visible={true}
            />
        </div>
    );
};

export default Loader;
