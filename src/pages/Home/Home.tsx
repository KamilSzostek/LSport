import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TableLayout from '../../components/TableLayout/TableLayout';
import { IGame } from '../../interfaces';
import MainTitle from '../../components/MainTitle/MainTitle';
import RoundTable from '../../components/RoundTable/RoundTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateBack, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loader from '../../components/Loader/Loader';
import styles from './Home.module.scss'

const Home: FC = () => {
    const { pageNumber } = useParams()
    const [pagesLimit, setPagesLimit] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [currentPage, setCurrentPage] = useState(pageNumber ? +pageNumber : 1)
    const [rounds, setRounds] = useState<IGame[][]>([])
    const navigate = useNavigate()
    const countOfRoundsPerPage = 3

    useEffect(() => {
        setIsLoading(true)
        fetch(`https://php74.appgo.pl/sport_api/api/public/api/games?page=${currentPage}&onPage=30&orderDirection=asc&orderBy=round`)
            .then(res => res.json())
            .then(gamesRes => {
                setPagesLimit(gamesRes.pages)
                const roundsOnPage: IGame[][] = []
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
                divideRounds((currentPage - 1) * countOfRoundsPerPage + 1, games, 4, roundsOnPage)
                setIsLoading(false)
                setRounds(roundsOnPage)
            }).catch(err => alert(err))
    }, [currentPage])

    const roundTables = rounds.map((round, key) => (<RoundTable key={key} round={round} />))

    function divideRounds(numberOfFirstRound: number, games: IGame[], gamesLimit: number, rounds: IGame[][]) {
        for (let index = numberOfFirstRound; index < numberOfFirstRound + countOfRoundsPerPage; index++) {
            const round = games.filter((game: IGame) => game.round == index).slice(0, gamesLimit)
            round.length > 0 && rounds.push(round)
        }
    }
    const onNextPage = () => {
        setCurrentPage(currentPage + 1)
        navigate(`/page/${currentPage + 1}`)
    }
    const onPreviousPage = () => {
        setCurrentPage(currentPage - 1)
        navigate(`/page/${currentPage - 1}`)
    }
    return (
        <main>
            <TableLayout>
                {
                    currentPage < 1 && currentPage > pagesLimit && rounds.length > 0 ? (<div className={styles.error}><p >Brak danych do wyświetlenia. <button onClick={() => { navigate('/'); setCurrentPage(1) }}>Wróć na stronę główną <FontAwesomeIcon icon={faArrowRotateBack} /></button> </p></div>)
                        : (<>
                            <section className={styles.nav}>
                                <button>Wszystkie</button>
                            </section>
                            <MainTitle buttonText='Tabela' link='table' />
                            {isLoading ? <Loader /> : roundTables}
                        </>)
                }
            </TableLayout>
            {
                rounds.length > 0 && <div className={styles.pagination}>
                    <button onClick={onPreviousPage} disabled={currentPage <= 1 && true}><FontAwesomeIcon icon={faChevronLeft} />Wstecz</button>
                    <button onClick={onNextPage} disabled={currentPage >= pagesLimit && true}>Dalej<FontAwesomeIcon icon={faChevronRight} /></button>
                </div>
            }

        </main>
    );
};

export default Home;
