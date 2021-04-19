import React from 'react';

import { Route } from 'react-router-dom';

// screens
import AddProjectScreen from '../add-project/index';
import AddBucketScreen from '../add-bucket/index';
import AddTaskScreen from '../add-task/index';
import EditFinanceScreen from '../edit-finance/index'

function AddNewProjectScreen() {
    return (
        <div className="add-new-project-container" style={{ height: '100%' }}>
         
            <Route path="/home/add-new-project/add-project" component={AddProjectScreen} />
            <Route path="/home/add-new-project/add-bucket" component={AddBucketScreen} />
            <Route path="/home/add-new-project/add-task" component={AddTaskScreen} />
            <Route path="/home/add-new-project/edit-finance" component={EditFinanceScreen} />

        </div>
    );
}


export default AddNewProjectScreen;
