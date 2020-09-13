import axios from 'axios'
import _ from 'lodash'
import { B2B_API_V1 } from 'helpers/Environment'

const auth = JSON.parse(localStorage.getItem('authUser'))

export const getData = (url, params) => {
  const options = {
    method: 'get',
    url: B2B_API_V1 + url,
    params,
    headers: {
      'Authorization': auth?.token || ''
    }
  }

  return axios(options)
}

export const postData = (url, data) => {
  const options = {
    method: 'post',
    url: B2B_API_V1 + url,
    data,
    headers: {
      'Authorization': auth?.token || ''
    }
  }

  return axios(options)
}

export const deleteData = (url) => {
  const options = {
    method: 'delete',
    url: B2B_API_V1 + url,
    headers: {
      'Authorization': auth?.token || ''
    }
  }

  return axios(options)
}

export const putData = (url, data) => {
  const options = {
    method: 'put',
    url: B2B_API_V1 + url,
    data,
    headers: {
      'Authorization': auth?.token || ''
    }
  }

  return axios(options)
}

export const fetchFormData = (method, url, data, param) => {
  const bodyFormData = new FormData()
  _.forEach(data, function(value, key) {
    if (typeof(value) === 'object') {
      _.each(value, function(valueNested, index) {
        _.forEach(valueNested, function(childValue, childKey) {
          bodyFormData.append(`${param}[${key}][${index}][${childKey}]`, childValue)
        })
      })
    } else {
      bodyFormData.append(`${param}[${key}]`, value)
    }
  })

  const options = {
    method: method,
    url: B2B_API_V1 + url,
    data: bodyFormData
  }

  return axios(options)
}