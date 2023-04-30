import * as React from 'react'
import styles from '../../../../../assets/scss/components/_list.scss'
import classNames from 'classnames/bind'
import { Button, Select } from '../../../../components'

const cx = classNames.bind(styles)

interface FilterProps {
    name: string
    options: Array<{ label: string; value: string }>
    filters: Object
    setFilter: Function
    fetch: Function
    type: string
    label: string
}

class Filter extends React.Component<FilterProps, null> {
    renderRadio() {
        const { name, options, filters, setFilter, fetch } = this.props

        return options.map(({ label, value }) => {
            return (
                <Button
                    key={`${name}${value}`}
                    color={filters[name] === value ? 'warning' : 'secondary'}
                    size={'xs'}
                    onClick={() => {
                        setFilter(name, value).then(() => fetch())
                    }}
                >
                    {label}
                </Button>
            )
        })
    }
    renderOrderByColumn() {
        const { options, filters, setFilter, fetch } = this.props

        return (
            <Select
                options={options}
                defaultValue={filters['order_by']}
                onChange={({ target: { value } }) => {
                    setFilter('order_by', value).then(() => fetch())
                }}
            />
        )
    }
    renderOrderDirection() {
        const { filters, setFilter, fetch } = this.props
        const options = [
            {
                label: 'Ascending',
                value: 'asc',
            },
            {
                label: 'Descending',
                value: 'desc',
            },
        ]

        return (
            <Select
                options={options}
                defaultValue={filters['order_direction']}
                onChange={({ target: { value } }) => {
                    setFilter('order_direction', value).then(() => fetch())
                }}
            />
        )
    }
    renderFilterLabel() {
        const { type, label } = this.props

        if (type === 'order') {
            return 'Sort by'
        }

        return label
    }
    render() {
        const { label, type } = this.props
        return (
            <div className={cx('filter')}>
                <span>{this.renderFilterLabel()}:</span>
                {type === 'radio' && this.renderRadio()}
                {type === 'order' && (
                    <>
                        {this.renderOrderByColumn()}
                        {this.renderOrderDirection()}
                    </>
                )}
            </div>
        )
    }
}

export default { Filter }
export { Filter }
