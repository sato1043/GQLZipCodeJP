郵便番号API
==========

開発
-----

- 導入
  - git v2
  - node v22
  - `brew install lefthook`
  - `npm ci`

- パッケージ管理
  - `npm run mnt:pkg:add-dev <PACKAGE>`
  - `npm run mnt:pkg:add <PACKAGE>`
  - `npm run mnt:pkg:depcheck`
  - `npm run mnt:pkg:updcheck`

- TS設定
  - トランスパイラは tsc
    - トランスパイルターゲットは es2021
    - モジュール形式は commonjs
    - 出力先は ./dist
  - 逐次実行のランタイムは tsx

- リント
  - `npm run lint`


END
