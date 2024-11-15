** 2024.11 中断中 **


郵便番号API
==========

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
CONTENTS;

- [開発](#%E9%96%8B%E7%99%BA)
- [設計](#%E8%A8%AD%E8%A8%88)
  - [GQLスキーマ定義とジェネレータの関係](#gql%E3%82%B9%E3%82%AD%E3%83%BC%E3%83%9E%E5%AE%9A%E7%BE%A9%E3%81%A8%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AC%E3%83%BC%E3%82%BF%E3%81%AE%E9%96%A2%E4%BF%82)
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


設計
----

### GQLスキーマ定義とジェネレータの関係

本件はスキーマファーストの手法をとりたいので、
GraphQL Yoga と GraphQL codegen を組み合わせます

スキーマファーストにしたい理由は、
要件や定義の把握容易さを重視するとシンプルな定義ファイル記述で済む手法が合目的だからです

で、そのための道具のコードジェネレータですが、生成部分と各自のコードの、
コード間関連を把握しつつ追記することになりますので、この節はその説明です

- [生成ファイルの概要](https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga-with-server-preset#generated-files-overview)
  - types.generated.ts: TypeScript 型、自動生成
  - typeDefs.generated.ts: TS自体の構文解析用型定義
  - resolvers/Query 下や resolver/Mutaion 下の.ts:
    返却値解決のためのリゾルバ関数（実態を自分でコーディングする）
  - resolvers/直下の SomeType.ts:
    Typed object type resolvers of each module
  - resolvers.generated.ts: 自動生成型とコードの取りまとめのホルダー

- スキーマ定義の記述
  - まず、スキーマ定義を自分で書く
  - 本件では schema/zipCode/zipCodeSchema.graphql 
    （ファイル名が変換結果に影響するので多少冗長な命名になる）
  
 1. mappers に実体の値の型定義をおく
 2. QueryResolver で mappers 通りに実体の値を取得する
 3. 各個の Resolver で mappers な実体の値を GraphQL SDL 定義通りに当て直す（リマップする）

```text
  resolvers.generated.ts の Resolvers (aka. root resolver)
  ↓
  Resolvers['Query'] = QueryResolvers （→ baseSchema.graphql の type Query で導入される)
  ↓
  types.generated.ts の QueryResolvers['someQuery'] でリゾルバ関数を宣言する
      （→ zipCodeSchema.graphql の extend type Query { someQuery() } から導入される）
    - リゾルバ関数は Resolver<>型のメソッドで、
      - 引数型が Query_someQueryArgs
      - 戻り値型が ResolversTypes['SomeQuery'] および実体 SomeQuery 型
      - 結局作業としては、それぞれのリゾルバ関数を schema/zipCode/resolvers 下に書くことになる

    - SomeQuery型に対して SomeQueryMapper を書く
      （→ src/schema/zipCode/zipCodeSchema.mappers.ts)
  ↓
  src/schema/zipCode/resolvers/Query/someQuery.ts
    ここで mappers に沿った仕様で値を解決する

----
  Resolvers['ZipCode']
    = ZipCodeResolvers<
        parentType
          = ResolversParentTypes['ZipCode']
          = ZipCodeMapper.{ id, firstName, lastName }
      > = { id, fullName }
        → 返却タイプは zipCodeSchema.graphql の type ZipCode 同様の実体(にジェネレータが仕立てる)
  ↓
  src/schema/zipCode/ZipCode.ts
    このコードで ZipCodeMapper (=parentType) から返却タイプへリマップする
  ↓
  Query['zipCode'] => ZipCode.{ id, fullName }
```


ライセンス
---------

- GQLZipCodeJP は [MIT license](LICENSE) のもと提供

END
