## GymSearch - 搜索
  一般配合table使用
## API
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| searchItem | 表单项，见下详细说明 | `array` | [] |
| onSearch | 搜索事件 | `Function(values)` | - |
| onReset | 重置事件 | `Function(values)` | - |
## searchItem
| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 表单名称 | `string` | - |
| key | 表单key | `string` | - |
| render | 表单组件 | `Function` | - |
| options | 同form组件的Form.create(options) | `string` | - |