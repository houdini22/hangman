import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/components/_table.scss'
import { Row } from '../Row'
import { Col } from '../Col'

const cx = classNames.bind(styles)

interface TableProps {
    bordered?: boolean
    size?: string
    striped?: boolean
    color?: string
}

class Table extends React.Component<TableProps> {
    render() {
        const { children, bordered, striped, size = 'md', color } = this.props

        return (
            <div
                className={cx('component-table', {
                    'component-table--bordered': bordered,
                    'component-table--striped': striped,
                    [`component-table--size-${size}`]: size,
                    [`component-table--color-${color}`]: color,
                })}
            >
                {children}
            </div>
        )
    }
}

class THead extends React.Component {
    render() {
        const { children } = this.props

        return <div className={cx('component-table__thead')}>{children}</div>
    }
}

class TBody extends React.Component {
    render() {
        const { children } = this.props

        return <div className={cx('component-table__tbody')}>{children}</div>
    }
}

class TFoot extends React.Component {
    render() {
        const { children } = this.props

        return <div className={cx('component-table__tfoot')}>{children}</div>
    }
}

interface TrProps {
    color?: string
    children: any
}

class Tr extends React.Component<TrProps> {
    render() {
        const { children, color, ...props } = this.props

        return (
            <Row
                {...props}
                className={cx('component-table__tr', {
                    [`component-table__tr--color-${color}`]: color,
                })}
            >
                {children}
            </Row>
        )
    }
}

interface ThProps {
    xs?: number
    alignCenter?: boolean
}

class Th extends React.Component<ThProps> {
    render() {
        const { children, xs = 12, alignCenter } = this.props

        return (
            <Col
                className={cx(
                    'component-table__thead__th',
                    `component-table__thead__th--xs-${xs}`,
                    {
                        'component-table__thead__th--align-center': alignCenter,
                    },
                )}
                xs={xs}
            >
                {children}
            </Col>
        )
    }
}

interface TdProps {
    xs?: number
    alignCenter?: boolean
}

class Td extends React.Component<TdProps> {
    render() {
        const { children, xs = 12, alignCenter } = this.props

        return (
            <Col
                className={cx(
                    'component-table__tbody__td',
                    `component-table__tbody__td--xs-${xs}`,
                    {
                        'component-table__tbody__td--align-center': alignCenter,
                    },
                )}
                xs={xs}
            >
                {children}
            </Col>
        )
    }
}

export { Table, THead, Th, TBody, Td, Tr, TFoot }
export default { Table, THead, Th, TBody, Td, Tr, TFoot }
