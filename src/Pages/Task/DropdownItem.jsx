/* eslint-disable react/prop-types */
import styles from './Task.module.css';

function DropdownItem({ img, text, onClick, Icon, id, style }) {
    return (
        <div
            className={`${styles['dropdown-item']}`}
            onClick={onClick}
            style={style}
        >
            {img && <img className={styles['dropdown-img']} src={img} alt='' />}
            {Icon && Icon(+id)}

            <p className={styles['dropdown-text']}>{text}</p>
        </div>
    );
}

export default DropdownItem;
