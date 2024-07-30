import fs from 'fs'
import path from 'path'
//输出多语言路径下的结果

// 指定locales目录路径
const localesDir = path.join(process.cwd(), 'src/i18n/locales')

// 目标key
const targetKey = 'pages__pdf_tools__unlock_pdf' // 例如：pages__pdf_tools__unlock_pdf
const targetTitleKey = 'title' // 例如：title
// 存储结果
const result = {}

// 读取locales目录下的所有子文件夹
fs.readdir(localesDir, (err, folders) => {
  if (err) {
    console.error('读取目录出错:', err)
    return
  }
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
          const title = jsonData[targetKey]
            ? jsonData[targetKey][targetTitleKey]
            : null
          if (title) {
            result[folder] = title.replace(/\s/g, '-').toLowerCase() // 存储到结果对象中，将空格替换为-并转换为小写
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
