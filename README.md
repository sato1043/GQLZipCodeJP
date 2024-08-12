郵便番号API
==========

開発
-----

- 初回導入時
  - git v2
  - node v22
  - `brew install lefthook`
  - `npm ci`
  - `npm run mnt:add-requisites`

- パッケージ管理
  - `npm run mnt:pkg:add-dev <PACKAGE>`
  - `npm run mnt:pkg:add <PACKAGE>`
  - `npm run mnt:pkg:defcheck`
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

- API キー発行
  - `npm run mnt:api:keygen`
  - 発行された code を管理台帳に記録して .env の APIKEY_CODELIST に追記(JSON文字列)
  - 発行された apiKey を利用者に提示

END
