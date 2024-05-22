const fs = require('fs');
const path = require('path');

const iconsAddress = ['src/components/CustomIcon']; //输入你的图标地址
iconsAddress.forEach((address) => {
  // 要检索的文件路径（相对于脚本文件的位置或绝对路径）
  const iconsDirectory = path.join(__dirname, `${address}/icons`);

  // 生成 TypeScript 代码文件的路径
  const outputFile = path.join(__dirname, `${address}/index.tsx`);

  // 读取 icons 目录下的所有文件名
  fs.readdir(iconsDirectory, (err, files) => {
    if (err) {
      console.error('读取文件夹时出错：', err);
      return;
    }

    // 过滤出 .svg 文件
    const svgFiles = files.filter((file) => file.endsWith('.tsx'));

    // 提取无扩展名的文件名（也就是图标类型）
    const iconTypes = svgFiles.map((file) => path.basename(file, '.tsx'));

    // 创建类型定义
    const iconTypeDefinition = `export type ICustomIconType =\n  | '${iconTypes.join(
      "'\n  | '",
    )}'\n`;

    // 创建 icon 映射对象
    const iconMapEntries = iconTypes
      .map((iconName) => {
        return `  ${iconName}: dynamic(() => import('./icons/${iconName}')),`;
      })
      .join('\n');

    const iconsMap = `const iconsMap: {
    [key in ICustomIconType]: React.ComponentType<SvgIconProps>;
  } = {\n${iconMapEntries}\n};\n`;

    // 生成最终的 TypeScript 文件的内容
    const content = `import { Skeleton, SvgIconProps, SxProps } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { FC, Suspense, useMemo } from 'react';
//！！！该组件由updata_icons.js生成，请勿在此修改代码，将会无效改动！！！
${iconTypeDefinition}

${iconsMap}

interface IconType {
  icon: ICustomIconType;
  sx?: SxProps; // 假设 sx 是可选的对象
  fontSize?: number | string;

}
//！！！该组件由updata_icons.js生成，请勿在此修改代码，将会无效改动！！！
const CustomIcon: FC<IconType> = ({ icon, sx, fontSize }) => {
  const IconComponent = iconsMap[icon];
  const sxCache = useMemo(() => {
    return {
      fontSize,
      ...sx,
    };
  }, [sx, fontSize]);

  const fontSizeCache = useMemo(() => {
    return (sxCache?.fontSize as number) || 24;
  }, [sxCache]);
  if (IconComponent) {
    return (
      <Suspense
        fallback={
          <Skeleton
            variant='rounded'
            width={fontSizeCache ?? 24}
            height={fontSizeCache ?? 24}
          />
        }
      >
        <IconComponent sx={sx} />
      </Suspense>
    );
  } else {
    return null;
  }
};

export default CustomIcon;
`;

    // 将生成的内容写入到指定的文件
    fs.writeFile(outputFile, content, (err) => {
      if (err) {
        console.error('写入文件时出错：', err);
      } else {
        console.log(`文件已经生成在: ${outputFile}`);
      }
    });
  });
});
