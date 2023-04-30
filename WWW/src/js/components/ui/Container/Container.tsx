import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_container.scss'

const cx = classNames.bind(styles)

class Container extends React.Component<null, null> {
    render() {
        const { children } = this.props

        return <div className={cx('component-container')}>{children}</div>
    }
}

export { Container }
export default { Container }
