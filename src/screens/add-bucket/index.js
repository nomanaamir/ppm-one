import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'

function AddBucketScreen(props) {
    const location = useLocation();
    useEffect(() => {

        console.log('add bucket location-=-=-', location);

    }, []);
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
                        <div className="field-row--input small">  <input type="radio" /></div>
                    </div>
                    <div className="field-row">
                        <div className="field-row--label"> <span>Bucket Name</span></div>
                        <div className="field-row--input">  <input type="text" /></div>
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

                    <button className="widget-footer_actions--btn">Add Another</button>

                    <button className="widget-footer_actions--btn" onClick={() => props.history.push({
                        pathname: '/home/add-new-project/add-task',
                        state: 'add new task'
                    })}> Submit</button>

                </div>
            </div>

        </div>
    );
}


export default AddBucketScreen;

