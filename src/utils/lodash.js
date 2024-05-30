import _ from 'lodash'

export const getDataByField = (object, fields) => {
    return _.pick(object, fields)
}