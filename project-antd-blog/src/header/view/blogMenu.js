/**
 * Created by startcaft on 2018/4/29.
 */

import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BlogMenu = ({menuArray}) => {
    return (

        <Menu mode="horizontal" defaultSelectedKeys={[menuArray[0].key]}>
            {
                menuArray.map((item) => {
                    return (
                        <Menu.Item
                            key={item.key}
                        >
                            <Link to={item.link}>
                                <Icon type={item.icon} />
                                <span className="nav-text">{item.title}</span>
                            </Link>
                        </Menu.Item>
                    )
                })
            }
        </Menu>
    )
}

BlogMenu.propTypes = {
    menuArray:PropTypes.array.isRequired
}

export default BlogMenu;