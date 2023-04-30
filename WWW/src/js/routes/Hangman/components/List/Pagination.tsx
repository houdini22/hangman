import * as React from 'react'
import styles from '../../../../../assets/scss/components/_list.scss'
import classNames from 'classnames/bind'
import { Button, Col, Row, Select } from '../../../../components'

const cx = classNames.bind(styles)

interface PaginationProps {
    hasPrevPage: boolean
    setPage: Function
    page: number
    fetch: Function
    totalPages: number
    hasNextPage: boolean
}

class Pagination extends React.Component<PaginationProps, null> {
    render() {
        const { hasPrevPage, setPage, page, fetch, links, hasNextPage } =
            this.props
        return (
            <div className={cx('pagination')}>
                <Row className={cx('pagination')}>
                    <Col xs={2}>
                        <Button
                            disabled={!hasPrevPage}
                            color={'secondary'}
                            size={'xs'}
                            onClick={() => {
                                setPage(page - 1).then(() => {
                                    fetch()
                                })
                            }}
                        >
                            Previous
                        </Button>
                    </Col>
                    <Col xs={8} className={cx('pages')}>
                        {links.map(({ label, active }) => {
                            if (!label.match(/^[0-9]+$/)) {
                                return ''
                            }
                            return (
                                <Button
                                    color={'secondary'}
                                    disabled={active}
                                    key={label}
                                    size={'xs'}
                                    onClick={() => {
                                        setPage(Number(label)).then(() => {
                                            fetch()
                                        })
                                    }}
                                >
                                    {label}
                                </Button>
                            )
                        })}
                    </Col>
                    <Col xs={2} style={{ textAlign: 'right' }}>
                        <Button
                            disabled={!hasNextPage}
                            color={'secondary'}
                            size={'xs'}
                            onClick={() => {
                                setPage(page + 1).then(() => {
                                    fetch()
                                })
                            }}
                        >
                            Next
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default { Pagination }
export { Pagination }
