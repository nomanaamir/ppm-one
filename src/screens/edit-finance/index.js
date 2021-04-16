import React from 'react';

//components
import AddProjectWidget from '../../components/add-project-widget/index';
function EditFinanceScreen(props) {

    return (
        <div className="add-project-container" style={{ height: '100%' }}>
            <AddProjectWidget getProps={props} editFinance={true}/>
        </div>
    );
}


export default EditFinanceScreen;

