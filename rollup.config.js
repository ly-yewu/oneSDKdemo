import vue from 'rollup-plugin-vue'
import typescript from 'rollup-plugin-typescript2'
import {nodeResolve} from '@rollup/plugin-node-resolve'
import pkg from './package.json'
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel'
import json from '@rollup/plugin-json'
import alias from '@rollup/plugin-alias'
import path from 'path'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
const resolvePath = (dir) => path.resolve(__dirname, dir)
const file = type => `dist/${pkg.name}.${type}.js`
const name=pkg.name
export default {
    input: 'src/main.ts',
    output: [
      {
        name,
        file: file('esm'),
        format: 'es',
        inlineDynamicImports: true,  // 启用内联动态导入,不单独生成文件
      },
      {
        name,
        file: file('umd'),
        format: 'umd',
        globals: {
          vue: 'Vue'
        }
      }
    ],
    plugins: [
        json(),
        alias({
          entries:[{find:'@',replacement:resolvePath('src')}]
        }),
        nodeResolve({
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.vue'],  // 解析相关文件类型
        }),
        vue({
          css: true, // 提取 CSS
          // preprocessStyles: true, // 开启样式预处理
        }),
        postcss({
          extensions: ['.css','.less'],
          plugins:[
            postcssImport()
          ],
          use:[
            ['less',{
              modifyVars: {
                hack: `true; @import (reference) "${resolvePath('./src/style/variable.less')}";`
              },
              javascriptEnabled: true
            }]
          ],
        }),
        typescript({
          tsconfig: resolvePath('tsconfig.json'),
          include: ['src/**/*.ts', 'src/**/*.tsx'],  // 编译 TypeScript 文件
        }),
        babel({
          presets: [
            '@babel/preset-env',
            '@babel/preset-typescript',  // 编译 TypeScript
            '@babel/preset-react',  // 编译 JSX (支持 TSX)
          ],
          babelHelpers: 'runtime',
          exclude: 'node_modules/**',
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          plugins:[
            '@babel/plugin-transform-runtime'
          ]
        }),
        commonjs(),
    ],
    external: ['vue']
}
