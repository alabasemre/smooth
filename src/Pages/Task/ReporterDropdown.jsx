/* eslint-disable react/prop-types */
import { FaPlus } from 'react-icons/fa6';
import DropdownItem from './DropdownItem';
import styles from './Task.module.css';
import { useState } from 'react';

function ReporterDropdown({ workerList, reporter, handleReporter }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className={styles['assignees-container']}>
                {reporter && (
                    <DropdownItem
                        img={reporter.img}
                        text={reporter.name}
                        onClick={() => handleReporter(reporter.id, 'DELETE')}
                    />
                )}

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
                        if (reporter && reporter.id === value.id) {
                            return;
                        }

                        return (
                            <DropdownItem
                                key={key}
                                img={value.img}
                                text={value.name}
                                onClick={() => handleReporter(value.id, 'ADD')}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default ReporterDropdown;
