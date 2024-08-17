郵便番号API
==========

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
CONTENTS;

- [開発](#%E9%96%8B%E7%99%BA)
- [ライセンス](#%E3%83%A9%E3%82%A4%E3%82%BB%E3%83%B3%E3%82%B9)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

開発
-----

- 初回導入時
  - git v2
  - node v22
  - `brew install lefthook`
  - `brew install graphviz`
  - `npm ci`
  - `npm run mnt:add-requisites`
  - IDE は JetBrains IntelliJ IDEA Ultimate を使用

- パッケージ管理
  - `npm run mnt:pkg:add <PACKAGE>`
  - `npm run mnt:pkg:add-dev <PACKAGE>`
  - `npm run mnt:pkg:rm <PACKAGE>`
  - `npm run mnt:pkg:rm-dev <PACKAGE>`
  - `npm run mnt:pkg:defcheck`
  - `npm run mnt:pkg:depcheck`
  - `npm run mnt:pkg:updcheck`
  - lefthook.yaml 変更時 `npm run mnt:requisite:lefthook` 再実行

- TS設定
  - トランスパイラは tsc
    - トランスパイルターゲットは es2023
    - モジュール形式は ESM / Node16
    - 出力先は ./dist
  - 逐次実行のランタイムは tsx
  - Fake ESMを避けるため、ファイルの import に対して以下を行う
    - 相対ディレクトリパスおよび拡張子までを含めた完全なファイル名の指定
    - パスエイリアス・compilerOptions.(paths|baseUrl) 利用しない

- GraphQLスキーマ定義言語(GQL SDL)コード変換
  - `npm run mnt:gql:gen`
  - GraphQLスキーマは SDL記述したのちコード変換
  - 対象は分割記述したSDL（src/schema/**/*.graphql）
  - 分割記述したSDLを graphql-codegen とプリセット仕様に則って変換処理
  - 変換処理は次を生成； 1.各リゾルバー雛形と参照情報、2.TS型定義
  - 生成で上書きするファイルがあるため注意（作業前バックアップ等）

- 編集
  - 大きすぎるぐらいのモニターを大きめポイントのソースコード用フォントで使う
  - コードフォルディングでデフォルト「すべて折りたたみ」する
  - タグジャンプで移動する。find usages/find in files する
  - テキストの複製はコピー＆ペーストする。 IDE のリファクタ機能と AI 補完を使う。できるときは自分で入力しない
  - 成果物をひとつの構造物と見なし、WBSを前提にして、ひとつ上の抽象度で意味のあるまとまりを作る
  - 分割は WBS のうえの意味を根拠におこなう。手段で分割しない
  - WBS 自体、そのどの部分なのか、根拠・用途・仕様・スペックをざっと記録する
  - まずざっとスペックを書いて合意確認し、実装し、テスト・リファクタする（テスト・リファクタも予定工数に含める）

- リント
  - フォーマット・リントはファイル保存時におこなう
  - 手動チェック `npm run lint`
  - 自動フォーマット `npm run mnt:format` 

- ドキュメント
  - README でレベル〜３のセクション追加の際には目次再生成 `npm run mnt:doc:toc`

- コミット
  - pre-commit はチェックのみ（変更はプログラマ）
  - コミットメッセージ
    - 機械処理のために[Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/#summary)へ倣う
    - メッセージ１行目をメッセージヘッドと呼ぶ。書式「<コミットタイプ>: 概要テキスト」
    - メッセージヘッド冒頭に[コミットタイプ](https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-conventional#rules)を含める
    - コミットタイプは以下から； build chore ci docs feat fix perf refactor revert style test
    - (必要に応じて)空行を挟んでから詳細テキスト

- リリース
  - `npm run rel:patch:rc` パッチリリース候補 タグ打ち
  - `npm run rel:patch`    パッチリリース タグ打ち
  - `npm run rel:minor:rc` パッチリリース候補 タグ打ち
  - `npm run rel:minor`    パッチリリース タグ打ち
  - `npm run rel:major:rc` パッチリリース候補 タグ打ち
  - `npm run rel:major`    パッチリリース タグ打ち

- dev環境
  - `npm run dev` (tsxをランタイムにTSを配信)
  - <https://localhost:3000> を自己署名証明書でホスト 

- API キー発行
  - `npm run mnt:api:keygen`
  - 発行された code を管理台帳に記録して .env の APIKEY_CODELIST に追記(JSON文字列)
  - 発行された apiKey を利用者に提示


ライセンス
---------

- GQLZipCodeJP は [MIT license](LICENSE) のもと提供

END
