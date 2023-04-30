import * as React from 'react'
import classNames from 'classnames/bind'
import styles from '../../../../assets/scss/routes/hangman-game.scss'
import image1 from '../assets/img/s1.gif'
import image2 from '../assets/img/s2.gif'
import image3 from '../assets/img/s3.gif'
import image4 from '../assets/img/s4.gif'
import image5 from '../assets/img/s5.gif'
import image6 from '../assets/img/s6.gif'
import image7 from '../assets/img/s7.gif'
import image8 from '../assets/img/s8.gif'
const cx = classNames.bind(styles)

const images = {
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
}
interface WordProps {
    mistakes: number
}

class Image extends React.Component<WordProps, null> {
    render() {
        const { mistakes } = this.props

        return (
            <div className={cx('image')}>
                <img src={images['image' + mistakes]} alt="" />
            </div>
        )
    }
}

export default { Image }
export { Image }
