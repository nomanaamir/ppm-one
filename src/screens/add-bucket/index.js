import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import { setBucketTemplate, bucketTemplate } from '../../Store/Middlewares/middlewares'
import { connect } from 'react-redux';
function AddBucketScreen(props) {
    const location = useLocation();
    const [bucketName, setBucketName] = useState('');
    const [defaultBucket, setDefaultBucket] = useState('');
    const [bucketID, setBucketID] = useState('')

    useEffect(() => {
        // setBucketID(generateUniqueBucketID())
        console.log('add bucket location-=-=-', location);
        if (bucketTemplate.length > 0) {
            let lastIndex = bucketTemplate.length - 1
            if (bucketTemplate[lastIndex].bucketName === 'To Do bucket') {
                setDefaultBucket(bucketTemplate[lastIndex].bucketName)
            } else {
                setBucketName(bucketTemplate[lastIndex].bucketName)
            }
            setBucketID(bucketTemplate[lastIndex].bucketID)
        }
        console.log('bucketTemplate', bucketTemplate);

    }, []);
    const saveBucket = () => {
        const getBucketName = bucketName || defaultBucket;
        const bucket = {
            bucketName: getBucketName,
            bucketID

        }
        props.setBucketTemplateAction(bucket)
        console.log('bucketARRAY:', bucketTemplate);
    }
    const saveBucketDetails = () => {
        if (bucketName === '' && defaultBucket === '') {
            alert('Bucket name required!')
            return
        }
        saveBucket()
        props.history.push({
            pathname: '/home/add-new-project/add-task',
            state: 'add new task'
        })
    }
    const addAnotherBucket = () => {
        if (bucketName === '' && defaultBucket === '') {
            alert('Bucket name required!')
            return
        }
        saveBucket()
        setBucketName('')
        setDefaultBucket('')
    }
    const generateUniqueBucketID = () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
    // const setIDOfBucket = () => {
    //     setBucketID(generateUniqueBucketID())

    // }
    return (
        <div className="bucket-container">

            <div className="child-header">
                <span className="child-header_heading">
                    Add New Bucket
                </span>
            </div>

            <p>
                A bucket can be used to describe Phases or work streams with a project, or can be configured to
                reflect a Kanban board using an Agile Project Management approach.
            </p>

            <p>
                By selecting default bucket, all project Tasks will be created a To Do bucket. This can be modified later in Planner.
            </p>

            <p>
                Alternatively, you can create your bucket Names, so that in the next step you can add your Project Tasks to the buckets you create.
            </p>

            <p>
                If you're unsure, select Defualt Bucket.
            </p>

            <div className="bucket-container_actions">
                <div style={{ width: '50%' }}>
                    <div className="field-row">
                        <div className="field-row--label"> <span>Default Bucket</span></div>
                        <div className="field-row--input small">  <input type="radio" value={defaultBucket} checked={defaultBucket === 'To Do bucket'} onChange={e => { { setDefaultBucket('To Do bucket'); setBucketName(''); setBucketID(generateUniqueBucketID()) } }} /></div>
                    </div>
                    <div className="field-row">
                        <div className="field-row--label"> <span>Bucket Name</span></div>
                        <div className="field-row--input">  <input type="text" value={bucketName} onChange={e => { setBucketName(e.target.value); setDefaultBucket(''); setBucketID(generateUniqueBucketID()) }} /></div>
                    </div>

                </div>
            </div>

            <div className="widget-footer">
                <div className="widget-footer_actions">
                    <button className="widget-footer_actions--btn" onClick={() => props.history.push({
                        pathname: '/home/add-new-project/add-project',
                        state: 'add new project'
                    })}>Previous</button>

                    <button className="widget-footer_actions--btn"> Cancel</button>

                    <button className="widget-footer_actions--btn" onClick={() => addAnotherBucket()}>Add Another</button>

                    <button className="widget-footer_actions--btn" onClick={() => saveBucketDetails()}> Submit</button>

                </div>
            </div>

        </div>
    );
}


// function mapStateToProps(state) {
//     console.log('Redux State - add project widget', state.root.user_data)
//     return {
//         userData: state.root.user_data
//     }
// }
function mapDispatchToProps(dispatch) {
    return ({
        setBucketTemplateAction: (bucket) => { dispatch(setBucketTemplate(bucket)) },


    })
}
export default connect(null, mapDispatchToProps)(AddBucketScreen);

