import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/layout/_layout.scss'
import { Button } from '../../components'
import { RouteManager } from '../../containers/RouteManager'

const cx = classNames.bind(styles)

interface BlankPageLayoutProps {
    children: any
    common: object
    setConnectionErrorModalVisible(): any
    logoff: Function
}

class BlankPageLayout extends React.Component<BlankPageLayoutProps> {
    render() {
        const {
            children,
            logoff,
            user: { email },
            isLoggedIn,
        } = this.props
        return (
            <RouteManager>
                {({ navigate }) => (
                    <div
                        className={cx({
                            'layout--blank-page': true,
                            layout: true,
                        })}
                    >
                        <div className={cx('toolbar')}>
                            {isLoggedIn && (
                                <>
                                    <p>{email}</p>
                                    <Button
                                        onClick={() => {
                                            logoff().then(() => {
                                                navigate('/')
                                            })
                                        }}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </div>
                        {children}
                    </div>
                )}
            </RouteManager>
        )
    }
}

export { BlankPageLayout }
export default { BlankPageLayout }
