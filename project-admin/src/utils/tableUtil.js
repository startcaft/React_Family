
/**
 * 主要用于定义 antd table 的 column 数组。
 */

 const getRoleCols = () => {
    const columns = [{
        title: '角色名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '别名(授权标识)',
        dataIndex: 'alias',
        key: 'alias',
    }, {
        title: '职责描述',
        dataIndex: 'desc',
        key: 'desc',
    }];
    return columns;
 };


 export { getRoleCols };