import { FC, useEffect, useState } from 'react';
import { IGame } from '../../interfaces';
import styles from './Home.module.scss'
import MainTitle from '../../components/MainTitle/MainTitle';
import RoundTable from '../../components/RoundTable/RoundTable';

const Home: FC = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [rounds, setRounds] = useState<IGame[][]>([])
    const countOfRoundsPerPage = 3

    useEffect(() => {
        const roundsOnPage: IGame[][] = []
        setIsLoading(true)
        fetch(`https://php74.appgo.pl/sport_api/api/public/api/games?page=${currentPage}&onPage=30&orderDirection=asc&orderBy=round`)
            .then(res => res.json())
            .then(gamesRes => {
                const firstRoundOnPage = (currentPage - 1) * countOfRoundsPerPage + 1
                const games: IGame[] = []
                for (const element of gamesRes.data) {
                    const game = {
                        id: element.id,
                        round: element.round,
                        date: element.date,
                        homeTeam: element.home_team,
                        awayTeam: element.away_team,
                        homeTeamImage: element.home_team_object.image,
                        awayTeamImage: element.away_team_object.image,
                        homeScore: element.home_score,
                        awayScore: element.away_score
                    }
                    games.push(game)
                }
                for (let index = firstRoundOnPage; index < firstRoundOnPage + countOfRoundsPerPage; index++) {
                    const round = games.filter((game: IGame) => game.round == index)
                    round.length > 0 && roundsOnPage.push(round)
                }
                setIsLoading(false)
                setRounds(roundsOnPage)
            }).catch(err => alert(err))
    },[currentPage])
    const roundTables = rounds.map((round, key) => (<RoundTable key={key} round={round} />))
    return (
        <>
            <section className={styles.nav}>
                <button>Wszystkie</button>
            </section>
            <MainTitle buttonText='Tabela' link='table' />
            {isLoading ? <p>ładowanie...</p> : roundTables}
            <div className={styles.pagination}>
                <button onClick={() => setCurrentPage(currentPage + 1)}>Dalej</button>
                <button onClick={() => setCurrentPage(currentPage - 1)}>Wstecz</button>
            </div>
        </>
    );
};

export default Home;
