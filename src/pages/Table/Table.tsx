import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import MainTitle from '../../components/MainTitle/MainTitle';
import TableLayout from '../../components/TableLayout/TableLayout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Table.module.scss'
import ScoreTable from '../../components/ScoreTable/ScoreTable';

const Table: FC = () => {
  const navigate = useNavigate()
  return (
    <main className={styles.table}>
      <nav>
        <span onClick={() => navigate('/')}>Piłka nożna</span>
        <FontAwesomeIcon icon={faChevronRight} />
        <span>Tabela</span>
      </nav>
      <TableLayout>
        <>
          <MainTitle buttonText='Mecze' link='/' />
          <ScoreTable />
        </>
      </TableLayout>
    </main>
  );
};

export default Table;
