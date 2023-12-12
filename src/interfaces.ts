export interface IGame {
    id: number
    round: number
    date: string
    homeTeam: string
    awayTeam: string
    homeTeamImage: string
    awayTeamImage: string
    homeScore: number
    awayScore: number
}
export interface IScore{
    teamId: number
    teamName: string
    teamImage: string
    games: number
    goalsConceded: number
    goalsScored: number
    goalsRatio: number
    points: number
}