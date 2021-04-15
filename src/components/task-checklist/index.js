import React, { useState, useEffect } from 'react';
import check from '../../assets/checked.png'
function TaskChecklist(props) {
    const { buckets, readOnlyFlag } = props
    const [checklist, setChecklist] = useState([])
    useEffect(() => {
        console.log('buckets:==>', buckets)
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
                        // console.log('objobj', obj)
                        totalTaskChecklist.push(obj)
                        // Object.assign({}, a, { taskID: task.id })
                    })
                    // totalTaskChecklist = totalTaskChecklist.concat(...task.checklist)

                })
                setChecklist(totalTaskChecklist);
                console.log('totalTaskChecklist', totalTaskChecklist)
            }
        })
    }, []);
    const editCheckList = (index, taskID, checklistID, selectedChecklist) => {
        if(readOnlyFlag === false){
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
                        })
                    }
                })
            })
            props.onSelectCheckList(buckets)
            console.log('update buckets', buckets)
        }
        
        // setChecklist([]);

        // console.log('selectedChecklist', selectedChecklist)
        // checklist.filter(item => {
        //     if (checklistID === item.id) {
        //         item.active = true


        //     }
        // })

        // setChecklist(checklist);
        // console.log('checklist', checklist)
    }

    return (
        <div className="task-checklist">
            {
                checklist.map((item, index) => {
                    return (
                        <div className="checklist-item-row" key={index} onClick={() => editCheckList(index, item.taskID, item.id, item)}>
                            <div className={'checklist-item-row_circle ' + (item.active === true ? 'checked' : null)}>
                                {
                                    item.active ?
                                        'L'
                                        // <img src={check} alt="check"/>
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