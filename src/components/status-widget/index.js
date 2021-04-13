import React, { useState, useEffect } from 'react';
function StatusWidget(props) {
    const { data, activeValue, readOnlyFlag, statusSummary } = props
    useEffect(() => {
        console.log('data, activeValue', data, activeValue, readOnlyFlag)
    }, []);


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
                                            <input type="radio" value={item.name} checked={activeValue === item.name} readOnly={readOnlyFlag} />
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