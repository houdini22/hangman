import * as React from 'react'
import styles from '../../../../assets/scss/routes/index.scss'
import { LoginFormContainer } from '../../../components/common/LoginForm/LoginFormContainer'
import classNames from 'classnames/bind'
import { RouteManager } from '../../../containers/RouteManager'

const cx = classNames.bind(styles)

class IndexView extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {}

    render() {
        return (
            <div className={cx('route--index')}>
                <RouteManager>
                    {({ navigate }) => (
                        <LoginFormContainer button navigate={navigate} />
                    )}
                </RouteManager>
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
