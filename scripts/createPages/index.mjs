import fs from 'fs';
import inquirer from 'inquirer';
import * as lodash from 'lodash-es';
import path from 'path';

import {
  DynamicRoutingPageComponentsTemplate,
  DynamicRoutingPageInLocaleTemplate,
  DynamicRoutingPageTemplate,
  PageComponentsTemplate,
  StaticPageInLocaleTemplate,
  StaticPageTemplate,
} from './templates.mjs';

var questions = [
  {
    type: 'list',
    name: 'pageType',
    message: '1. Choose your page routing type',
    choices: ['Static page', 'Dynamic routing page'],
  },
  {
    type: 'input',
    name: 'dynamicRoutingKey',
    message:
      'Please enter the routing parameters of the dynamic routing page. (e.g. id)',
    when: (answers) => answers.pageType === 'Dynamic routing page',
  },
  {
    type: 'list',
    name: 'needFolder',
    message: 'Do you need to create a separate folder for your page? (Y/N)',
    choices: ['Y', 'N'],
    when: (answers) => answers.pageType === 'Static page',
  },
  {
    type: 'input',
    name: 'name',
    message: 'Please enter your page name. (e.g. BlogDetails)',
  },
];

const createFileAndWrite = (folderPath, fileName, content) => {
  const filePath = path.join(folderPath, `${fileName}.tsx`);
  // 检查目录是否存在
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true }); // 如果目录不存在，则创建它
  }

  // 写入文件
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(true);
    });
  });
};

const replaceVariableInTemplate = (
  template,
  pageComponentsName,
  parameterKey,
) => {
  let newTemplate = template.replace(/{{NAME}}/g, pageComponentsName);

  if (parameterKey) {
    newTemplate = newTemplate.replace(/{{PARAMETER_KEY}}/g, parameterKey);
  }
  return newTemplate;
};

const generateStaticPagesAssets = async (answers) => {
  try {
    const { needFolder, name, dynamicRoutingKey } = answers;

    const pagesFilePath = './src/pages';
    const pageComponentsName = lodash.upperFirst(name);
    const routerPath = lodash.kebabCase(name);

    // 创建路由页面
    const folderPath =
      needFolder === 'Y'
        ? `${pagesFilePath}/${routerPath}/`
        : `${pagesFilePath}/`;

    const fileName = needFolder === 'Y' ? 'index' : routerPath;
    const step1 = await createFileAndWrite(
      folderPath,
      fileName,
      replaceVariableInTemplate(StaticPageTemplate, pageComponentsName),
    );

    // 创建 locale 文件夹 中的路由页面
    const localeFolderPath =
      needFolder === 'Y'
        ? `${pagesFilePath}/[locale]/${routerPath}/`
        : `${pagesFilePath}/[locale]/`;
    const step2 = await createFileAndWrite(
      localeFolderPath,
      fileName,
      replaceVariableInTemplate(StaticPageInLocaleTemplate, pageComponentsName),
    );

    // 创建 page_components 文件夹 中的页面组件
    const pageComponentsFolderPath = `./src/page_components/${pageComponentsName}Pages/`;
    const step3 = await createFileAndWrite(
      pageComponentsFolderPath,
      'index',
      replaceVariableInTemplate(
        PageComponentsTemplate,
        pageComponentsName,
        dynamicRoutingKey,
      ),
    );

    if (step1 && step2 && step3) {
      console.log(`\x1b[32mStatic page assets generated successfully!\x1b[0m
  1.\x1b[36m run pnpm dev \x1b[0m
  2.\x1b[36m open http://localhost:3001/${routerPath}\x1b[0m
    
`);
    }
  } catch (error) {
    console.error('ERROR:', error);
  }
};

const generateDynamicRoutingPagesAssets = async (answers) => {
  try {
    const { name, dynamicRoutingKey } = answers;

    const pagesFilePath = './src/pages';
    const pageComponentsName = lodash.upperFirst(name);

    // 创建路由页面
    const folderPath = `${pagesFilePath}/${lodash.kebabCase(name)}/`;
    const fileName = `[${dynamicRoutingKey}]`;
    const step1 = await createFileAndWrite(
      folderPath,
      fileName,
      replaceVariableInTemplate(
        DynamicRoutingPageTemplate,
        pageComponentsName,
        dynamicRoutingKey,
      ),
    );

    // 创建 locale 文件夹 中的路由页面
    const localeFolderPath = `${pagesFilePath}/[locale]/${lodash.kebabCase(
      name,
    )}/`;
    const step2 = await createFileAndWrite(
      localeFolderPath,
      fileName,
      replaceVariableInTemplate(
        DynamicRoutingPageInLocaleTemplate,
        pageComponentsName,
        dynamicRoutingKey,
      ),
    );
    // 创建 page_components 文件夹 中的页面组件
    const pageComponentsFolderPath = `./src/page_components/${pageComponentsName}Pages/`;
    const step3 = await createFileAndWrite(
      pageComponentsFolderPath,
      'index',
      replaceVariableInTemplate(
        DynamicRoutingPageComponentsTemplate,
        pageComponentsName,
        dynamicRoutingKey,
      ),
    );
    if (step1 && step2 && step3) {
      console.log(`\x1b[32mDynamic routing page assets generated successfully!\x1b[0m
  1.\x1b[36m Make sure your page routing component has the correct getStaticPaths \x1b[0m
  2.\x1b[36m run pnpm dev \x1b[0m

`);
    }
  } catch (error) {
    console.error('ERROR:', error);
  }
};

inquirer.prompt(questions).then((answers) => {
  const { pageType, needFolder, name, dynamicRoutingKey } = answers;

  if (pageType === 'Dynamic routing page' && needFolder === 'N') {
    console.error('ERROR: Dynamic routing page must use a separate folder');
    return;
  }

  if (pageType === 'Dynamic routing page' && !dynamicRoutingKey) {
    console.error('ERROR: Dynamic routing page must have a parameter key');
    return;
  }

  if (!name) {
    console.error('ERROR: Please enter your page name!!');
    return;
  }

  if (pageType === 'Static page') {
    generateStaticPagesAssets(answers);
  }

  if (pageType === 'Dynamic routing page') {
    generateDynamicRoutingPagesAssets(answers);
  }
});
