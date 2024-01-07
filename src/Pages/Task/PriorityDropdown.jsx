/* eslint-disable react/prop-types */
import styles from './Task.module.css';
import initialData from '../../initial-data';
import DropdownItem from './DropdownItem';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function PriorityDropdown({ handlePriority, selectedPriority }) {
    const priorityList = initialData.priority;

    return (
        <div className={styles['dropdown-container']}>
            {Object.entries(priorityList).map(([key, value]) => {
                return (
                    <DropdownItem
                        style={
                            selectedPriority === +key
                                ? { backgroundColor: 'var(--primary-bg)' }
                                : {}
                        }
                        key={key}
                        text={value.text}
                        onClick={() => handlePriority(key)}
                        Icon={priorityArrow}
                        id={key}
                    />
                );
            })}
        </div>
    );
}
function priorityArrow(priority) {
    switch (priority) {
        case 1:
            return <FaArrowUp color='var(--priority-1)' />;
        case 2:
            return <FaArrowUp color='var(--priority-2)' />;
        case 3:
            return <FaArrowDown color='var(--priority-3)' />;
        default:
            break;
    }
}

export default PriorityDropdown;
