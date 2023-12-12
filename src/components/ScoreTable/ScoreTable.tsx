import { FC, useEffect, useState } from 'react';
import { IScore } from '../../interfaces';
import Loader from '../Loader/Loader';
import styles from './ScoreTable.module.scss'

const ScoreTable: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [scoreArr, setScoreArr] = useState<IScore[]>([])
    useEffect(() => {
        setIsLoading(true)
        fetch('https://php74.appgo.pl/sport_api/api/public/api/table')
            .then(res => res.json())
            .then(table => {
                const limit = 8
                const tmpArr: IScore[] = []
                for (const element of table.slice(0, limit)) {
                    const newScore = {
                        teamId: element.team.id,
                        teamName: element.team.name,
                        teamImage: element.team.image,
                        games: element.games,
                        goalsConceded: element.goals_conceded,
                        goalsScored: element.goals_scored,
                        goalsRatio: element.goals_ratio,
                        points: element.points
                    }
                    tmpArr.push(newScore)
                }
                setScoreArr(tmpArr)
                setIsLoading(false)
            })
    }, [])
    function chooseBoxColor(key: number) {
        if (key > 0 && key <= 4)
            return styles.color1
        switch (key) {
            case 5: return styles.color2
            case 7: return styles.color3
            case 8: return styles.color3
            default: return ''
        }
    }
    const tableRows = scoreArr.map((team, key) => (<tr key={key}>
        <td className={styles.position}><div className={chooseBoxColor(key + 1)}>{key + 1}</div></td>
        <td className={styles.name}>
            <img src={team.teamImage} alt={`${team.teamName} herb`} />{team.teamName}</td>
        <td className={styles.games}>{team.games}</td>
        <td className={styles.goals}>{team.goalsScored}:{team.goalsConceded}</td>
        <td className={styles.ratio}>{team.goalsRatio}</td>
        <td className={styles.points}>{team.points}</td>
    </tr>))
    return (
        <table className={styles.score}>
            {isLoading ? <tbody><tr><td><Loader/></td></tr></tbody> :
                <>
                    <thead>
                        <tr>
                            <th>lp.</th>
                            <th>drużyna</th>
                            <th>m</th>
                            <th>b</th>
                            <th>rb</th>
                            <th>p</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <div>
                                    <div className={styles.colorBox} />
                                    <span>Awans - Liga Mistrzów (Runda grupowa)</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <div className={`${styles.colorBox} ${styles.color2}`} />
                                    <span>Awans - Liga Europy (Runda grupowa)</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div>
                                    <div className={`${styles.colorBox} ${styles.color3}`} />
                                    <span>Spadek - Championship (Runda grupowa)</span>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </>
            }
        </table>
    );
};

export default ScoreTable;
