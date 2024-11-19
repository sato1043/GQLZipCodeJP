郵便番号API
==========

NOTE: **2024.11 別件で使用するため公開見合わせ中。後日調整の予定**

GraphQL Yoga と graphql-codegen を使った、ESMのための node.js プロジェクトテンプレート。

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
  - 生成で上書きするファイルがあるため注意（作業前バックアップ等）
  - `npm run mnt:gql:gen`
  - GraphQLスキーマは SDL記述したのちコード変換
  - 対象は分割記述したSDL（src/schema/**/*.graphql）
  - 分割記述したSDLを graphql-codegen とプリセット仕様に則って変換処理
  - 設計の項で詳述

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
GraphQL Yoga と GraphQL codegen を組み合わせます。

スキーマファーストにしたい理由は、
要件や定義の把握容易さを重視するとシンプルな定義ファイル記述で済む手法が合目的だからです。

この節はそのための道具のコードジェネレータについて、生成部分のコード関連を把握するための説明です。

- [生成ファイルの概要](https://the-guild.dev/graphql/codegen/docs/guides/graphql-server-apollo-yoga-with-server-preset#generated-files-overview)
  - GraphQLサーバーは Yoga で、エントリーポイントは src/routes/graphqlRouters.ts の createYoga() で作られる。
  - codegen.ts が自動生成の設定で、スキーマは 'src/schema/**/*.graphql' としている。ジェネレータはここから書き出す。
  - Yogaサーバーのスキーマは createSchema() で作られる。そのパラメータが自動生成される。
  - `npm run mnt:gql:gen`
    - 生成で上書きするファイルがあるため注意（作業前バックアップ等）
    - typeDefs.generated.ts: 作成するスキーマに含む、独自スキーマ型のメタ情報一覧
    - 受信クエリに含まれた（プリミティブでない名前の）独自スキーマ型について、一致する値解決方法（＝リゾルバ）を探すことになる。
    - 自分で増やしたスキーマ型には値解決のためのリゾルバを書く必要がある。
    - resolvers.generated.ts: GQLスキーマ型をそれぞれ値解決するリゾルバ実装を、テンプレを交えて、ひと通り生成している。
    - 同様に、types.generated.ts には TypeScript 型を生成している。
    - プリミティブ以外のGQL型をすべて追加する必要があるが、とはいえ定義済みの補助的な型を 'graphql-scalars' から追加もしている。
  - リゾルバが返す値は連鎖的に解決される。Query リゾルバの返却が別のオブジェクト型だった場合、リゾルバメソッドが返した値を引数としてオブジェクト自体を解決するリゾルバが呼ばれる。
    - resolvers/Query 下や resolver/Mutaion 下の.ts はGraphQLサーバーがまず呼び出すべき（ルートレベルの）リゾルバとなる。
    - resolvers/直下の SomeType.ts がGQLオブジェクト型のリゾルバになっている。
    - オブジェクト型は主にインターフェイス変換のために存在する。変換で外部に整合させることができ、または内部データ型を隠すことができる。
    - Queryリゾルバの返却型は、なにもしないで生成すればGQL型一致で定義される。マッパーインターフェイスを自前で書いて内部データ型そのものを使うこともできる。

- 実装手順
  1. GQLスキーマ定義を書く
  2. mappers にインターフェイス変換型を書く
  3. ジェネレータで TSテンプレコードを生成する
  4. Query/Mutationリゾルバでは mappers の変換型の値をリターンする
  5. （4.がチェーンされるので）オブジェクトリゾルバでは外部インターフェイス通りの値をリターンする

- GQLスキーマ定義を書く
  - （ファイル名が変換結果に影響するので多少冗長な命名になる）

- mappers で内部データ型のモデル型を定義や別名して export interface する
  - （内部データモデル型を書く（DBクエリの戻り値型やJSONの型など）)
  - （内部データモデル型とGQLインターフェイス型との間の変換レイヤーになる）
  - （内部データモデル変更がGQLインターフェイスに影響しないためのクッションとしてこのレイヤーを持たせる）
  - （シンプルで変換不要なモデルの場合は冗長になる。）

- ジェネレータで tsテンプレコードを生成する
  - codegen.ts の設定で src/schema/ 下に生成させている
  - resolver/ 下の既存コードは、避けてから作り直すほうが問題になりにくい
    （モジュールにすでに書いてあることが優先されるとは謳われているが境界が危うい気はする）
  - `npm run mnt:gql:gen`

- テンプレコードをカスタマイズする

```text
  resolvers.generated.ts の Resolvers (aka. root resolver)
  ↓
  Resolvers['Query'] = QueryResolvers （→ baseSchema.graphql の type Query で導入される)
  ↓
  types.generated.ts の QueryResolvers['someQuery'] でリゾルバ関数を宣言する
      （→ zipCodeSchema.graphql の extend type Query { someQuery() } から導入される）

    - リゾルバ関数は Resolver<>型のメソッドで、
      - 引数型が Query_someQueryArgs
      - 戻り値型が ResolversTypes['SomeType'] および実体 SomeType 型
      - 結局作業としては、それぞれのリゾルバ関数を書くことになる

    - SomeType型に対して内部データ変換を折り込みたいなら SomeTypeMapper を書く
      （→ src/schema/zipCode/zipCodeSchema.mappers.ts)

      以下のような生成が追加される
        export type ResolversTypes = {
          SomeType: ResolverTypeWrapper<SomeTypeMapper>

        export type ResolversParentTypes = {
          SomeType: SomeTypeMapper
```

- なお spec.ts にクライアントコードを書くとき、graphql()で括られたクエリが別のクライアントコードの自動生成でタイプと紐付けされる。
  このクライアントコードの自動生成はクエリを書いてから自動生成するという順番でおこなう（生成しないと紐付けが書かれないので型不一致になる）。

ライセンス
---------

- GQLZipCodeJP は [MIT license](LICENSE) のもと提供

END
