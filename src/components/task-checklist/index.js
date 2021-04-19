import React, { useState, useEffect } from 'react';
function TaskChecklist(props) {
    const { buckets, readOnlyFlag } = props
    const [checklist, setChecklist] = useState([])
    useEffect(() => {
        let totalTaskChecklist = []
        buckets.filter((bucket) => {
            if (bucket.tasks[0] === 'empty') {
                bucket.tasks = []

            }
            if (bucket.tasks.length !== 0) {
                bucket.tasks.filter(task => {
                    task.checklist.filter(a => {
                        let obj = a;
                        obj = Object.assign({}, obj, { taskID: task.id })
                        totalTaskChecklist.push(obj)

                        return null
                    })

                    return null
                })
                setChecklist(totalTaskChecklist);

            }
            return null
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const editCheckList = (taskID, checklistID) => {
        if (readOnlyFlag === false) {
            let newArr = checklist.map((item, i) => {
                if (checklistID === item.id) {
                    return { ...item, active: !item.active };
                } else {
                    return item;
                }
            });
            setChecklist(newArr);

            buckets.filter(bucket => {
                bucket.tasks.filter(task => {
                    if (task.id === taskID) {
                        task.checklist.filter(list => {
                            if (list.id === checklistID) {
                                list.active = !list.active
                            }
                            return null

                        })
                    }
                    return null

                })
                return null

            })
            props.onSelectCheckList(buckets)
        }

    }

    return (
        <div className="task-checklist scrollable">
            {
                checklist.map((item, index) => {
                    return (
                        <div className="checklist-item-row" key={index} onClick={() => editCheckList(item.taskID, item.id)}>
                            <div className={'checklist-item-row_circle ' + (item.active === true ? 'checked' : null)}>
                                {
                                    item.active ?
                                        'L'
                                        :
                                        null
                                }
                            </div>
                            <div className="checklist-item-row--contain">
                                <span className={'checklist-item-row_text ' + (item.active === true ? 'completed' : null)}>
                                    {item.checklist}
                                </span>
                            </div>
                        </div>

                    )
                })
            }
        </div>
    );
}


export default TaskChecklist;