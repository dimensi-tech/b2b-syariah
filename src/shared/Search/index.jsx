import React, { useState } from 'react'
import { withRouter } from 'react-router'
import { Select, Spin, Form, Button } from 'antd'
import { EnvironmentFilled, SearchOutlined } from '@ant-design/icons'
import queryString from 'query-string'
import { getData } from 'helpers/FetchData'
import './style.scss'

const { Option } = Select

function Search(props) {
  const [data, setData] = useState([])
  const [value, setValue] = useState()
  const [fetching, setFetching] = useState(false)
  const [form] = Form.useForm()
  const { t, history, location } = props
  const params = queryString.parse(location.search)

  const fetchData = async value => {
    setData([])
    setFetching(true)
    const response = await getData('/autocomplete/search_products', {
      name: value
    })
    if (!response.data?.message) {
      setData(response.data?.slice(0, 6) || [])
      setFetching(false)
    } else {
      setFetching(false)
    }
  }

  const handleChange = value => {
    setValue(value)
    form.setFieldsValue({ search: value })
    setData([])
    setFetching(false)
  }

  const onFinish = () => {
    value && history.push(`/products?search=${value}`)
  }

  return (
    <Form
      className="search-form"
      onFinish={onFinish}
      form={form}
    >
      <Form.Item noStyle>
        <EnvironmentFilled />
        <Select
          showSearch
          showArrow={false}
          placeholder="Tentukan destinasi kamu"
          notFoundContent={fetching ? <Spin /> : null}
          filterOption={false}
          onSearch={fetchData}
          onChange={handleChange}
          value={value || params.search}
          style={{ width: '100%' }}
          dropdownClassName="search-dropdown"
        >
          {data.length > 0 ? (
            data.map(d => (
              <Option key={d.name}>{d.name}</Option>
            ))
          ) : (
            ((value || params.search) && !fetching) && <Option key={value || params.search}>{value || params.search}</Option>
          )}
        </Select>
      </Form.Item>
      <Button type="default" htmlType="submit" icon={<SearchOutlined />}>
        {t('search.submit')}
      </Button>
    </Form>
  )
}

export default withRouter(Search)