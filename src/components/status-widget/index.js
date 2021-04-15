import React, { useState, useEffect } from 'react';
function StatusWidget(props) {
    const { data, activeValue, readOnlyFlag, statusSummary, name } = props
    const [activeStatus, setActiveStatus] = useState('')
    useEffect(() => {
        console.log('data, activeValue', data, activeValue, readOnlyFlag)
        setActiveStatus(activeValue)
    }, []);
    function changeStatus(e) {
        if(readOnlyFlag === false){

            setActiveStatus(e.target.value)
            props.onSelectStatus({ name: name, value: e.target.value })
        }

    }

    return (
        <div className="status-widget">
            {
                data.length > 0 ?
                    data.map((item, index) => {
                        return (
                            <div className="status-widget_row" key={index}>
                                <div>
                                    <span>{item.name}</span>
                                </div>
                                {
                                    statusSummary ?
                                        <div className="status-widget--indicator">
                                            <div className={'status-widget--indicator_bg ' + item.value.replace(/\s/g, '')}></div>
                                            <div className="status-widget--indicator_label"><span>{item.value}</span></div>
                                        </div>
                                        :
                                        <div>
                                            <input type="radio" value={item.name} checked={activeStatus === item.name} readOnly={readOnlyFlag} onChange={changeStatus} />
                                        </div>
                                }
                            </div>

                        )
                    })
                    :
                    null
            }
        </div>
    );
}


export default StatusWidget;