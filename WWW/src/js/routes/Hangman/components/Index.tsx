import * as React from 'react'
import styles from '../../../../assets/scss/routes/hangman.scss'
import classNames from 'classnames/bind'
import { Container } from '../../../components/ui/Container'
import { Button, Card } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'
import { Scores } from './Scores'
import { Statistics } from './Statistics'

const cx = classNames.bind(styles)

class IndexView extends React.Component<null, null> {
    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <div className={cx('route--hangman')}>
                        <Container>
                            <Button
                                className={cx('button--start-game')}
                                block
                                onClick={() => navigate('/hangman-game')}
                            >
                                Start Game
                            </Button>
                            <Card header={<h1>Scores</h1>}>
                                <Scores />
                            </Card>
                            <Card header={<h1>Your Statistics</h1>}>
                                <Statistics />
                            </Card>
                        </Container>
                    </div>
                )}
            </RouteManager>
        )
    }
}

export default { IndexView }
export { IndexView }
