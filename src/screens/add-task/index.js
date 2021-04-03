import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

function AddTaskScreen(props) {
    const location = useLocation();
    const [checklist, setChecklist] = useState([])
    const [writeChecklist, setWriteChecklist] = useState('')

    useEffect(() => {

        console.log('add task location-=-=-', location);

    }, []);
    const addNewCheckList = () => {
        setChecklist(checklist => [...checklist, { checklist: writeChecklist, active: false }])

        setWriteChecklist('')
    }
    return (
        <div className="task-container">
            <div className="child-header">
                <span className="child-header_heading">
                    Add New Task
                </span>
            </div>
            <div className="task-container_row">
                <div className="task-container_row--col">
                    <div className="field-row">
                        <div className="field-row--label"> <span>Bucket</span></div>
                        <div className="field-row--input">   <select name="buckets">
                            <option>Bucket 1</option>
                            <option>Bucket 2</option>
                            <option>Bucket 3</option>
                            <option>Bucket 4</option>
                        </select></div>

                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>Task Name</span></div>
                        <div className="field-row--input">  <input type="text" /></div>
                    </div>

                    <div className="field-row checklist">
                        <div className="field-row--label checklist-label"> <span>Task checklist</span></div>
                        <div className="field-row--input checklist-input">
                            <input type="text" value={writeChecklist} onChange={(e) => setWriteChecklist(e.target.value)} />
                            <p className="add-task-btn" onClick={() => addNewCheckList()}>Add new checklist item...</p>
                            {
                                checklist.map((item, index) => {
                                    return (
                                        <div className="checklist-item-row" key={index}>
                                            <div className="checklist-item-row_circle">

                                            </div>
                                            <span className="checklist-item-row_text">
                                                {item.checklist}
                                            </span>
                                        </div>

                                    )
                                })
                            }


                        </div>
                        {/* <p>Add new task...</p> */}
                    </div>
                </div>

                <div className="task-container_row--col">
                    <div className="field-row">
                        <div className="field-row--label"> <span>start date</span></div>
                        <div className="field-row--input small date-picker-row" > <div className="display-date">14-May-2021</div> <input className="date-picker" type="date" /> </div>
                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>end date</span></div>
                        <div className="field-row--input small date-picker-row"> <div className="display-date">14-May-2021</div> <input className="date-picker" type="date" /> </div>
                    </div>
                </div>
            </div>


            <div className="widget-footer">
                <div className="widget-footer_actions">
                    <button className="widget-footer_actions--btn" onClick={() => props.history.push({
                        pathname: '/home/add-new-project/add-bucket',
                        state: 'add new bucket'
                    })}>Previous</button>

                    <button className="widget-footer_actions--btn"> Cancel</button>

                    <button className="widget-footer_actions--btn">Add Another</button>

                    <button className="widget-footer_actions--btn"> Submit</button>

                </div>
            </div>

        </div>
    );
}


export default AddTaskScreen;

