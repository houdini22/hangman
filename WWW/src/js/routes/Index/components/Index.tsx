import * as React from 'react'
import styles from '../../../../assets/scss/routes/index.scss'
import { LoginFormContainer } from '../../../components/common/LoginForm/LoginFormContainer'
import classNames from 'classnames/bind'
import { RouteManager } from '../../../containers/RouteManager'
import { Container } from '../../../components/ui/Container'

const cx = classNames.bind(styles)

interface IndexViewProps {
    setLoginError: Function
    loginError: boolean | string
    setIsLoading: Function
    isLoading: boolean
}

class IndexView extends React.Component<IndexViewProps, null> {
    render() {
        const { loginError, setLoginError, setIsLoading, isLoading } =
            this.props
        return (
            <div className={cx('route--index')}>
                <Container>
                    <div className={cx('route--index__login-form')}>
                        <RouteManager>
                            {({ navigate }) => (
                                <LoginFormContainer
                                    button
                                    navigate={navigate}
                                    setLoginError={setLoginError}
                                    loginError={loginError}
                                    isLoading={isLoading}
                                    setIsLoading={setIsLoading}
                                />
                            )}
                        </RouteManager>
                    </div>
                </Container>
            </div>
        )
    }
}

export default { IndexView }
export { IndexView }
