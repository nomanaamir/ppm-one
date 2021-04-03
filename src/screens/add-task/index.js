import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

function AddTaskScreen(props) {
    const location = useLocation();
    const [checklist, setChecklist] = useState(['list'])
    useEffect(() => {

        console.log('add task location-=-=-', location);

    }, []);
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
                            {
                                checklist.map((item, index) => {
                                    return (
                                        <input type="text" key={index} />
                                    )
                                })
                            }
                            <p className="add-task-btn" onClick={() => setChecklist(checklist => [...checklist, 'list'])}>Add new checklist item...</p>
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

