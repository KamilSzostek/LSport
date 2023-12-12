import { FC } from 'react';
import { IGame } from '../../interfaces';
import Desktop from '../../assets/desktopicon.png'
import LinkButton from '../LinkButton/LinkButton';
import styles from './RoundTable.module.scss'

interface IRoundTableProps {
    round: IGame[]
}

const RoundTable: FC<IRoundTableProps> = ({ round }) => {
    const rows = round.map((row, key) => (<tr key={key}>
        <td className={styles.date}>{row.date}</td>
        <td className={styles.teams}>
            <div>
                <img src={row.homeTeamImage} alt={row.homeTeam} />
                <span>{row.homeTeam}</span>
                <span className={styles.goals}>{row.homeScore}</span>
            </div>
            <div>
                <img src={row.awayTeamImage} alt={row.awayTeam} />
                <span>{row.awayTeam}</span>
                <span className={styles.goals}>{row.awayScore}</span>
            </div>
        </td>
        <td className={styles.score}>
            <div>{row.homeScore}</div>
            <div>{row.awayScore}</div>
        </td>
        <td className={styles.controls}>
            <img src={Desktop} alt="ikona pulpitu" width={40} height={40} />
            <div>
                <LinkButton specialClass={styles.desktopBtn} buttonText='Szczegóły' />
            </div>
        </td>
    </tr>))
    return (
        <table className={styles.roundTable}>
            <thead>
                <tr>
                    <th colSpan={5}>Runda {round[0].round}</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

export default RoundTable;
