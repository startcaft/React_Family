/**
 * Created by Administrator on 2018/4/26.
 */

import React from 'react';
import history from '../../Common/history';
import '../../asserts/css/listitem.css';

function ListItem({rowData, sectionID, rowID}){
    return (
        <div key={rowID} className="row_container" onClick={() => history.push(`/detail/${rowData.id}`)}>
            <div className="title">
                {rowData.articleTitle}
            </div>
            <div className="desc_container">
                <img src="http://crawl.nosdn.127.net/1a4a01fe547f722470a2019c53a11735.jpg" alt="" />
                <div className="text">
                    <div>{rowData.articleDesc}</div>
                </div>
            </div>
        </div>
    )
}

export default ListItem;