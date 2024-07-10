import path from 'path';
import fs from 'fs';

const packagesPath = 'src/packages';
const i18nPath = 'src/i18n/locales/en/index.json';

const rootPath = process.cwd().split(' ')[0];

const safeReadJson = (filePath) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return null;
  }
};


const updateI18n = async (packageNames = []) => {
  if (packageNames.length === 0) {
    // 遍历 packages 文件夹
    const currentPackagesPath = path.join(rootPath, packagesPath);
    const packages = fs.readdirSync(currentPackagesPath);
    packageNames = packages.filter((name) => fs.statSync(path.join(currentPackagesPath, name)).isDirectory());
  }
  // 遍历 packageNames下的i18n文件夹
  let mergedI18n = {};
  let successPackages = [];
  let hasError = false;
  packageNames.forEach((packageName) => {
    const currentI18nPath = path.join(rootPath, packagesPath, packageName, 'i18n/index.json');
    if (fs.existsSync(currentI18nPath)) {
      const i18n = safeReadJson(currentI18nPath);
      if (!i18n) {
        hasError = true;
        console.log(`❌ Package [${packageName}] i18n 文件格式不正确`);
        return;
      }
      const keys = Object.keys(i18n);
      const packageKey = keys[0];
      // 如果 i18n 文件夹下的 index.json 文件不是以 package__ 开头，或者有多个 key，就不合并
      if (keys.length > 1 || !packageKey.startsWith('package__')) {
        hasError = true;
        console.log(`❌ Package [${packageName}] i18n 格式不正确, key: [${packageKey}], keys: [${keys}]`);
        return;
      }
      // 如果合并后的 i18n 文件中已经存在相同的 key，就不合并
      if (mergedI18n.hasOwnProperty(packageKey)) {
        hasError = true;
        console.log(`❌ Package [${packageName}] i18n key 重复, key: [${packageKey}]`);
        return;
      }
      successPackages.push(packageName);
      mergedI18n = {
        ...mergedI18n,
        ...i18n,
      };
    }
  });
  // 写入 i18n 文件
  const currentI18nPath = path.join(rootPath, i18nPath);
  const cache = safeReadJson(currentI18nPath);
  if (!cache) {
    hasError = true;
    console.log('❌ i18n 文件格式不正确');
    return;
  }
  if (hasError) {
    return;
  }
  // 删掉原来的 package__ 开头的 key
  Object.keys(cache).forEach((key) => {
    if (key.startsWith('package__')) {
      delete cache[key];
    }
  });
  // 排序mergedI18n
  const sortedKeys = Object.keys(mergedI18n).sort();
  const sortedMergedI18n = {};
  sortedKeys.forEach((key) => {
    sortedMergedI18n[key] = mergedI18n[key];
  });
  // 写入新的 i18n 文件
  const newI18n = {
    ...cache,
    ...sortedMergedI18n,
  };
  fs.writeFileSync(currentI18nPath, JSON.stringify(newI18n, null, 2));
  console.log(`✅ Package [${packageNames.join(', ')}] 合并成功`);
};

const params = process.argv.slice(2);

const startListening = () => {
  const isWatch = params.includes('--watch');
  // 检测是否存在 packages 文件夹
  const currentPackagesPath = path.join(rootPath, packagesPath);
  const currentI18nPath = path.join(rootPath, i18nPath);
  if (
    fs.existsSync(currentPackagesPath) &&
    fs.existsSync(currentI18nPath)
  ) {
    if (isWatch) {
      // 监听 packages/[package]/i18n 文件夹
      fs.watch(currentPackagesPath, { recursive: true }, (eventType, filename) => {
        if (filename) {
          if (eventType === 'change' && filename.endsWith('i18n/index.json')) {
            const [packageName, ...rest] = filename.split('/');
            console.log(`Package [${packageName}] i18n file changed`);
            updateI18n();
          }
        }
      });
    }
    updateI18n();
  } else {
    // 检测是否存在 i18n 文件夹
    console.log('packages/i18n 文件夹不存在');
  }
};

startListening();
