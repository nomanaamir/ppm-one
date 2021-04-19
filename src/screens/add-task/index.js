import React, { useState, useEffect } from 'react';
import { bucketTemplate, tasks, setTasks, addProject, clearTemplates } from '../../Store/Middlewares/middlewares'
import { connect } from 'react-redux';


function AddTaskScreen(props) {
    const [checklist, setChecklist] = useState([])
    const [writeChecklist, setWriteChecklist] = useState('')
    const [taskName, setTaskName] = useState('')

    const [bucketList, setBucketList] = useState([])

    const [selectedBucket, setSelectedBucket] = useState({})


    const [startDateDisplay, setStartDateDisplay] = useState('');
    const [endDateDisplay, setEndDateDisplay] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

    const [buckets, setBuckets] = useState([])

    useEffect(() => {
        setBuckets([])

        setBucketList(bucketTemplate)
        setSelectedBucket(bucketTemplate[0]);
        setBuckets(tasks)

    }, []);
    const addNewCheckList = () => {
        if (taskName === '' || startDateDisplay === '' || endDateDisplay === '' || writeChecklist === '') {
            alert('all fields required before adding checklist')
            return
        }
        setChecklist(checklist => [...checklist, { checklist: writeChecklist, id: generateCheckListID(), active: false }])

        buckets.forEach(a => {
            if (selectedBucket.bucketID === a.bucketID) {

                if ((a.tasks.length === 0) || !(a.tasks.some(a => a.name === taskName))) {
                    a.tasks.push(Object.assign({}, { name: taskName, id: generateTaskID(), checklist: [{ checklist: writeChecklist, id: generateCheckListID(), active: false }] }))

                } else {
                    a.tasks.forEach(i => {
                        if (i.name === taskName) {

                            i.checklist.push({ checklist: writeChecklist, id: generateCheckListID(), active: false })
                        }
                    });

                }

            }
        })
        setBuckets(buckets)
        setWriteChecklist('')
    }
    function selectStartData(e) {

        const { value } = e.target


        setStartDate(value)
        const filteredDate = new Date(value)
        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        setStartDateDisplay(selectedDate)

        buckets.forEach(a => {
            if (selectedBucket.bucketID === a.bucketID) {
                a.startDate = value
                a.startDateDisplay = selectedDate;
            }
        })
    }

    function selectEndData(e) {


        const { value } = e.target

        setEndDate(value)
        const filteredDate = new Date(value)

        const getDate = filteredDate.getDate();
        const getMonth = months[filteredDate.getMonth()];
        const getYear = filteredDate.getFullYear();
        const selectedDate = getDate + '-' + getMonth + '-' + getYear
        setEndDateDisplay(selectedDate)

        buckets.forEach(a => {
            if (selectedBucket.bucketID === a.bucketID) {
                a.endDate = value;
                a.endDateDisplay = selectedDate;
            }
        })
    }
    function selectBucket(e) {
        setSelectedBucket(JSON.parse(e.target.value));
        setTaskName('');
        setChecklist([]);
        setEndDate('')
        setStartDate('')
        setEndDateDisplay('')
        setStartDateDisplay('')
    }
    const addAnotherNewTask = () => {

        props.setTasksAction(buckets)
        setTaskName('')
        setChecklist([])
    }
    const submit = () => {
        const nonDefaultBuckets = buckets.filter(a => {
            return a.bucketName !== "To Do bucket"
        })
        const isempty = nonDefaultBuckets.some((item) => item.tasks.length === 0)
        if (isempty) {
            alert('you must fill non default buckets!')
        } else {
            props.setTasksAction(buckets)
            props.addProjectAction()
            setTaskName('');
            setChecklist([]);
            setEndDate('')
            setStartDate('')
            setEndDateDisplay('')
            setStartDateDisplay('')
        }



    }
    const generateCheckListID = () => {
        return 'CL' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    const generateTaskID = () => {
        return 'TA' + Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    const cancel = () => {
        props.clearTemplatesAction();
        props.history.push({
            pathname: '/home/projects/project-list',
            state: 'project list'
        })
    }
    return (
        <div className="task-container">
            <div className="task-container_row">
                <div className="task-container_row--col">
                    <div className="field-row">
                        <div className="field-row--label"> <span>Bucket</span></div>
                        <div className="field-row--input">   <select name="buckets" onChange={selectBucket} value={JSON.stringify(selectedBucket)}>
                            {
                                bucketList.map((item, index) => {
                                    return (
                                        <option key={index} value={JSON.stringify(item)}>{item.bucketName}</option>
                                    )
                                })
                            }
                        </select></div>

                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>Task Name</span></div>
                        <div className="field-row--input">  <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)} /></div>
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
                                            <div className="checklist-item-row--contain">
                                                <span className="checklist-item-row_text">
                                                    {item.checklist}
                                                </span>
                                            </div>
                                        </div>

                                    )
                                })
                            }


                        </div>
                    </div>
                </div>

                <div className="task-container_row--col">
                    <div className="field-row">
                        <div className="field-row--label"> <span>start date</span></div>
                        <div className="field-row--input small date-picker-row" > <div className="display-date">{startDateDisplay}</div> <input className="date-picker" value={startDate} type="date" onChange={selectStartData} /> </div>
                    </div>

                    <div className="field-row">
                        <div className="field-row--label"> <span>end date</span></div>
                        <div className="field-row--input small date-picker-row"> <div className="display-date">{endDateDisplay}</div> <input className="date-picker" value={endDate} type="date" onChange={selectEndData} />  </div>
                    </div>
                </div>
            </div>


            <div className="widget-footer">
                <div className="widget-footer_actions">
                    <button className="widget-footer_actions--btn" onClick={() => props.history.push({
                        pathname: '/home/add-new-project/add-bucket',
                        state: 'add new bucket'
                    })}>Previous</button>

                    <button className="widget-footer_actions--btn" onClick={() => cancel()}> Cancel</button>

                    <button className="widget-footer_actions--btn" onClick={() => addAnotherNewTask()}>Add Another</button>

                    <button className="widget-footer_actions--btn" onClick={() => submit()}> Submit</button>

                </div>
            </div>

        </div>
    );
}


function mapDispatchToProps(dispatch) {
    return ({
        setTasksAction: (bucket) => { dispatch(setTasks(bucket)) },
        addProjectAction: () => { dispatch(addProject()) },
        clearTemplatesAction: () => { dispatch(clearTemplates()) },

    })
}
export default connect(null, mapDispatchToProps)(AddTaskScreen);

