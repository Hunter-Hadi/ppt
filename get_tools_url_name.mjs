import fs from 'fs'
import path from 'path'
//输出多语言路径下的结果

// 指定locales目录路径
const localesDir = path.join(process.cwd(), 'src/i18n/locales')

// 目标key
const targetKey = 'pages__pdf_tools__redact_pdf.title' // 例如：pages__pdf_tools__unlock_pdf
// 存储结果
const result = {}
// 函数：根据目标key提取值
function getValueByKey(data, key) {
  const keys = key.split('.') // 将key按'.'拆分成数组
  let value = data

  for (let k of keys) {
    // eslint-disable-next-line no-prototype-builtins
    if (value && value.hasOwnProperty(k)) {
      value = value[k] // 逐层获取值
    } else {
      return null // 如果某一层不存在，则返回null
    }
  }
  return value // 返回最后获取到的值
}

// 读取locales目录下的所有子文件夹
fs.readdir(localesDir, (err, folders) => {
  if (err) {
    console.error('读取目录出错:', err)
    return
  }

  //排序en文件夹到最前面  , 如果有语言没有生存i18,则使用en
  const sortFolders = folders.sort((a, b) => {
    if (a === 'en') {
      return -1 // Move 'en' to the front
    } else if (b === 'en') {
      return 1 // Move 'en' to the front
    } else {
      return a.localeCompare(b)
    }
  })
  let foldersProcessed = 0
  // 遍历每个文件夹
  console.log(sortFolders)
  sortFolders.forEach((folder) => {
    const folderPath = path.join(localesDir, folder)
    // 确保是目录
    fs.stat(folderPath, (err, stats) => {
      if (err) {
        console.error(`读取文件夹 ${folder} 出错:`, err)
        return
      }
      if (stats.isDirectory()) {
        const jsonFilePath = path.join(folderPath, 'index.json')
        // 读取index.json文件
        fs.readFile(jsonFilePath, 'utf8', (err, data) => {
          if (err) {
            return
          }

          // 解析JSON
          const jsonData = JSON.parse(data)
          // 根据目标key提取值
          let title = getValueByKey(jsonData, targetKey) //获取目标key的值
          if (title) {
            if (folder === 'zh-TW' || folder === 'zh-CN') {
              // 繁体中文和简体中文的标题去掉空格,不需要转换为-连接
              title = title.replace(/\s/g, '').toLowerCase()
            } else {
              title = title.replace(/\s/g, '-').toLowerCase()
            }
            result[folder] = title
          } else {
            result[folder] = result['en']
          }

          foldersProcessed++
          // 检查是否处理完成
          if (foldersProcessed === folders.length) {
            // 输出结果JSON
            console.log(JSON.stringify(result))
          }
        })
      } else {
        foldersProcessed++ // 增加计数，即使不是目录
      }
    })
  })
})
