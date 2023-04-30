import * as React from 'react'
import _ from 'lodash'

export interface OptionsFields {
    label: string
    value: string
}

interface SelectProps {
    type: string
    placeholder: boolean | string
    error: string
    loading: boolean
    options: () => OptionsFields[] | OptionsFields[]
}

class Select extends React.Component<SelectProps> {
    renderPlaceholder() {
        const { placeholder } = this.props
        const caption = placeholder === true ? '--- choose ---' : placeholder
        return <option value="">{caption}</option>
    }

    render() {
        const {
            error,
            options,
            loading,
            placeholder,
            defaultValue,
            onChange,
            ...props
        } = this.props
        const _options = _.isFunction(options) ? options() : options

        return (
            <select {...props} defaultValue={defaultValue} onChange={onChange}>
                {placeholder && this.renderPlaceholder()}
                {_options.map(({ label: l, value: v }) => {
                    return (
                        <option key={`${l}${v}`} value={v}>
                            {l}
                        </option>
                    )
                })}
            </select>
        )
    }
}

export { Select }
export default { Select }
