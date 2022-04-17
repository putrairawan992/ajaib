import { Breadcrumb, Button, Card, Input, Select, Space, Table } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { actionRandomUser } from './stores/actions/random-users';
import { filterRandomUserScema } from './utils/filterRandomUserScema';

const { Option } = Select;

function App() {
  const dispatch = useDispatch()
  const [parameter, setParameter] = useState(filterRandomUserScema)
  const randomUsers = useSelector(state => state.randomUsers?.randomUsers);
  const [sortedInfo, setSortedInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    dispatch(actionRandomUser(parameter, setLoading))
  }, [])

  useEffect(() => {

    const delayDebounceFn = setTimeout(() => {
      if (parameter?.keywoard !== undefined) {
        dispatch(actionRandomUser(parameter, setLoading))
      } else {
        delete parameter.keywoard
        dispatch(actionRandomUser(parameter, setLoading))
      }
    }, 700);
    return () => clearTimeout(delayDebounceFn);

  }, [parameter?.keywoard]);

  useEffect(() => {
    dispatch(actionRandomUser(parameter, setLoading))
  }, [parameter.sortOrder, parameter.page, parameter.pageSize, parameter.gender])


  const columns = [
    {
      title: 'Username',
      dataIndex: 'login',
      render: data => data?.username,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      render: data => data?.first,
      sortOrder: sortedInfo?.column?.dataIndex === 'name' && sortedInfo.order,
      sorter: (a, b) => a.first - b.first
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sortOrder: sortedInfo?.column?.dataIndex === 'email' && sortedInfo.order,
      sorter: (a, b) => a.email - b.email
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      sortOrder: sortedInfo?.column?.dataIndex === 'gender' && sortedInfo.order,
      sorter: (a, b) => a.gender - b.gender
    }, 
    {
      title: 'Registred Date',
      dataIndex: 'registered',
      render: data => moment(data?.date).format('DD-MM-YYYY hh:mm'),
      sortOrder: sortedInfo?.column?.dataIndex === 'registered' && sortedInfo.order,
      sorter: (a, b) => a.date - b.date
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    setParameter({ ...parameter, sortOrder: sorter?.order, page: pagination?.current, pageSize: pagination?.pageSize })
    setSortedInfo(sorter)
  }

  const onSearch = event => setParameter({ ...parameter, keywoard: event.target.value.length > 0 ? event.target.value : undefined });

  const handleChange = (value) => {
    setParameter({ ...parameter, gender: value });
  }

  const actonResetFilter = () => {
    setSortedInfo(null)
    setParameter({
      ...parameter,
      keywoard: undefined,
      page: 1,
      results: 50,
      sortOrder: undefined,
      pageSize: undefined,
      gender: undefined
    })
  }

  return <Card>
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Example Page</a></Breadcrumb.Item>
    </Breadcrumb>
    <Space style={{ marginBottom: 20, marginTop: 20 }}>
      <Input placeholder="Search" size='large' value={parameter.keywoard} onChange={onSearch} />
      <Select style={{ width: 150 }} value={parameter.gender} size='large' placeholder='Select Gender' onChange={handleChange}>
        <Option value={undefined}>Semua</Option>
        <Option value="male">Male</Option>
        <Option value="female">Female</Option>
      </Select>
      <Button size='large' onClick={actonResetFilter}>
        Reset Filter
      </Button>
    </Space>
    <Table columns={columns} dataSource={randomUsers?.results} loading={loading} rowKey={record => record.username} onChange={onChange} />
  </Card>

}

export default App;
