import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../assets/scss/layout/_layout.scss'
import { Button, Dropdown, Modal } from '../../components'
import { RouteManager } from '../../containers/RouteManager'

const cx = classNames.bind(styles)

interface BlankPageLayoutProps {
    children: any
    common: object

    setConnectionErrorModalVisible(visible, error): any

    logoff: Function
    isConnectionErrorModalVisible: boolean
    connectionError: Object
}

class BlankPageLayout extends React.Component<BlankPageLayoutProps, null> {
    render() {
        const {
            children,
            logoff,
            user: { email },
            isLoggedIn,
            setConnectionErrorModalVisible,
            connectionError,
            connectionErrorModalVisible,
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
                                    <Dropdown.Container placement={'right'}>
                                        <Dropdown.Trigger component={Button}>
                                            {email}
                                        </Dropdown.Trigger>
                                        <Dropdown.Menu>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    navigate('/change_password')
                                                }}
                                            >
                                                Change password
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    logoff().then(() => {
                                                        navigate('/')
                                                    })
                                                }}
                                            >
                                                Logout
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Container>
                                </>
                            )}
                        </div>
                        {children}
                        {connectionErrorModalVisible && (
                            <Modal.Container
                                visible={connectionErrorModalVisible}
                            >
                                <Modal.Header
                                    closeIcon
                                    close={() => {
                                        setConnectionErrorModalVisible(
                                            false,
                                            null,
                                        )
                                    }}
                                >
                                    Error
                                </Modal.Header>
                                <Modal.Body>
                                    <p>Error details:</p>
                                    <div>
                                        {Object.keys(connectionError).map(
                                            (key) => {
                                                return (
                                                    <code key={key}>
                                                        {key}:{' '}
                                                        {typeof connectionError[
                                                            key
                                                        ] === 'string'
                                                            ? `${connectionError[key]} `
                                                            : ''}
                                                    </code>
                                                )
                                            },
                                        )}
                                    </div>
                                </Modal.Body>
                            </Modal.Container>
                        )}
                    </div>
                )}
            </RouteManager>
        )
    }
}

export { BlankPageLayout }
export default { BlankPageLayout }
