import * as React from 'react'
import styles from '../../../../assets/scss/routes/hangman.scss'
import classNames from 'classnames/bind'
import { Container } from '../../../components/ui/Container'
import { Card, Col, Row } from '../../../components'
import { Scores } from './Scores'
import { Statistics } from './Statistics'

const cx = classNames.bind(styles)

class IndexView extends React.Component<null, null> {
    render() {
        return (
            <div className={cx('route--hangman')}>
                <Container>
                    <Row>
                        <Col xs={6}>
                            <Card header={<h1>Leaderboard</h1>}>
                                <Scores />
                            </Card>
                        </Col>
                        <Col xs={6}>
                            <Card header={<h1>Your Statistics</h1>}>
                                <Statistics />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
