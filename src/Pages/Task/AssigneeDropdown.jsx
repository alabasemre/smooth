/* eslint-disable react/prop-types */
import { FaPlus } from 'react-icons/fa6';
import DropdownItem from './DropdownItem';
import styles from './Task.module.css';
import { useState } from 'react';

function AssigneeDropdown({ workerList, assignees, handleAssignee }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={styles['assignees-container']}>
                {Object.entries(
                    JSON.parse(JSON.stringify(Array.from(assignees)))
                ).map(([key, value]) => {
                    return (
                        <DropdownItem
                            key={key}
                            img={value[1].img}
                            text={value[1].name}
                            onClick={() =>
                                handleAssignee(value[1].id, 'DELETE')
                            }
                        />
                    );
                })}
                <button
                    className={styles['assignees-button']}
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen((state) => !state);
                    }}
                >
                    <FaPlus />
                    {isOpen ? 'Menüyü Kapat' : 'Atama Yap'}
                </button>
            </div>
            {isOpen && (
                <div className={styles['dropdown-container']}>
                    {Object.entries(workerList).map(([key, value]) => {
                        if (assignees.has(+key)) {
                            return;
                        }

                        return (
                            <DropdownItem
                                key={key}
                                img={value.img}
                                text={value.name}
                                onClick={() => handleAssignee(value.id, 'ADD')}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default AssigneeDropdown;
