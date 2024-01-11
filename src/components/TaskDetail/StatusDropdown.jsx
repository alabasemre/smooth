/* eslint-disable react/prop-types */
import styles from '../../Pages/Task/Task.module.css';
import initialData from '../../initial-data';

import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import DropdownItem from '../../Pages/Task/DropdownItem';

function StatusDropdown({ handleStatus, currentStatus }) {
    const statusList = initialData.status;

    return (
        <div className={styles['dropdown-container']}>
            {Object.entries(statusList).map(([key, value]) => {
                console.log(currentStatus);
                if (key === currentStatus) {
                    return;
                }
                return (
                    <DropdownItem
                        style={
                            currentStatus === +key
                                ? { backgroundColor: 'var(--primary-bg)' }
                                : {}
                        }
                        key={key}
                        text={value.text}
                        onClick={() => handleStatus(key)}
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

export default StatusDropdown;
