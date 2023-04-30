import * as React from 'react'
import styles from '../../../../assets/scss/routes/hangman.scss'
import classNames from 'classnames/bind'
import { Container } from '../../../components/ui/Container'
import { Button } from '../../../components'
import { RouteManager } from '../../../containers/RouteManager'

const cx = classNames.bind(styles)

class IndexView extends React.Component<null, null> {
    componentDidMount() {}

    render() {
        return (
            <RouteManager>
                {({ navigate }) => (
                    <div className={cx('route--hangman')}>
                        <Container>
                            <Button
                                block
                                onClick={() => navigate('/hangman-game')}
                            >
                                Start Game
                            </Button>
                        </Container>
                    </div>
                )}
            </RouteManager>
        )
    }
}

export default { IndexView }
export { IndexView }
