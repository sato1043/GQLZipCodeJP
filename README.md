郵便番号API
==========

開発
-----

- 導入
  - git v2
  - node v22
  - `brew install lefthook`
  - `npm ci`
    - package-lock.json に厳密にパッケージを導入ならびに、
    - 開発環境用の自己署名証明書を生成
    - scripts下のデータファイルzip を展開

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

- dev環境
  - `npm run dev` (tsxをランタイムにTSを配信)
  - <https://localhost:3000> を自己署名証明書でホスト 

END
