import { LatLngExpression } from "leaflet";
type ShopDataType = {
  lat: number,
  lng: number,
  name: string,
}
const functions = () => {
  //場所情報を受け取って座標を返す。
  const getLatLng = (p: any) => {
    const latLngStr: string = p["Geometry"]["Coordinates"];
    const latLng = latLngStr.split(",");
    const exp: LatLngExpression = [parseFloat(latLng[1]), parseFloat(latLng[0])];
    return exp;
  };

  //カテゴリー文字列を,・で区切ってランダムに返す
  const splitCateg = (categ: string) => {
    const categs = categ.split("・");
    const categs1 = categs[Math.floor(Math.random() * categs.length)];
    const categs2 = categs1.split(",");
    return categs2[Math.floor(Math.random() * categs2.length)];
  }

  //出題用のカテゴリー抽出
  const extractCateg = (p: any[]) => {
    var categorys: string[] = []

    p.forEach((item) => {
      const list: string[] = item["Category"]
      categorys = categorys.concat(list);
    })

    // console.log(categorys);
    const selectedCateg = categ1[Math.floor(Math.random() * categorys.length)];


    //該当カテゴリーがなかった場合
    if (!categorys) {
      return splitCateg(selectedCateg);
    }
    else {
      // console.log(categorys);
      // return categorys[Math.floor(Math.random() * categorys.length)];
      return splitCateg(selectedCateg);
    }
  }

  //経緯を受け取って距離を返す
  const distance = (p1: [number, number], p2: [number, number]) => {
    const R = Math.PI / 180;
    const lat1 = p1[0] * R;
    const lng1 = p1[1] * R;
    const lat2 = p2[0] * R;
    const lng2 = p2[1] * R;
    return 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
  }

  //適切な単位をつけた文字列を返す
  const strDist = (d: number) => {
    if (d < 1) {
      return Math.round(d * 1000).toFixed() + "m";
    }
    return d.toFixed(2) + "km";
  }

  //目標地点、目標クエリで最も近かった店のデータ抽出
  const extractNearest = (p: any[]) => {
    console.log(p);
    if (true) {
      const first = p[0];
      const latLngStr: string = first["Geometry"]["Coordinates"];
      const latLng = latLngStr.split(",")
      console.log(latLng);
      const res: ShopDataType = {
        lat: parseFloat(latLng[1]),
        lng: parseFloat(latLng[0]),
        name: first["Name"]
      }
      return res;
    }
  }

  return {
    getLatLng,
    extractCateg,
    extractNearest,
    distance,
    strDist,
  };
}

export default functions;

//何もカテゴリーがなかった場合のダミーデータ
const categ1 = ['イタリア料理店,レストラン関連', 'うなぎ料理店', '食堂', '電話取引業,機械修理業', '精密機械器具・測量機器製造業', '弁護士事務所', '経営コンサルタント業', 'キリスト教教会', '衣料関連小売業関連', '牛乳小売業', '電子機器・計測器製造業,電気機械器具製造・修理業,電気計測器製造業', 'ローソン', '団体・組合', '日用雑貨小売業,カレンダー印刷業,うちわ製造業', '不動産取引業', 'プラント設計・機械設計業', '写真業', '出版社', '大学院・大学', 'デイリーヤマザキ', '教育団体', 'ショッピングセンター・モール、複合商業施設', 'ゴム製造業,自動車部分品製造業', '食肉小売業', 'レストラン関連', 'ソフトウェアコンサルタント業', '出版社', '不動産取引業', '学習塾', '精密機械器具・測量機器製造業', '商社', '計量器製造業,電気計測器製造業', '薬店', 'ドラッグストア', '缶・管工事業', 'レストラン関連', '商社', 'ボランティアグループ,奉仕団体', '喫茶店・カフェ', 'サンドイッチ・パン屋', 'その他のファミリーレストラン', '土木建築材料・水処理装置整備業', '食料品卸売業', '経営コンサルタント業', '居酒屋', '日用品雑貨製造業', '文化学術団体', '弁理士事務所', '焼鳥店', '証明写真機', '喫茶店', 'ソフトウェア開発業,ソフトウェアコンサルタント業', '労働組合・団体', 'デザイン業', '経営コンサルタント業', '税理士事務所', '労働組合・団体', 'レストラン,グルメ,食事,中華・中国料理', '鉄板焼', '洋服店', 'カイロプラクティック・整体', '水産物卸売業', '健康・自然食品小売業', '食堂,日本料理店関連', '医療用機器製造業', '懐石料理店,割ぽう料理店,料亭,うなぎ料理店,日本料理店', 'プラント設計・機械設計業', 'コンクリート工事業,一般土木建築工事業', '建築工事業', '化学工業薬品製造業', '生命保険業,損害保険業,保険代理店,他保険業', '衣料関連卸売業関連', '繊維製品製造業', '地下鉄道業,鉄道業', '地下鉄道業,鉄道業', '駅（地下鉄）', '駅（地下鉄）', '不動産取引業', '化学工業薬品製造業', 'カフェ', 'バー', 'スポーツマネジメント学校,スポーツエージェント業', '銘木製造業,農業・林業関連', '環境保護団体', '商社', '居酒屋', '水処理装置製造・整備業,日用品雑貨製造業', '業務用洗濯機製造業', '宝石小売業', '水産物卸売業', '居酒屋', 'かばん製造業', 'レストラン関連,パン屋・ベーカリー', '水産物卸売業', 'ソフトウェアコンサルタント業', 'かつら製造業', '化学製品貿易業', '中央、普通郵便局、特定郵便局、簡易郵便局', '弁護士事務所', '団体・組合,相談サービス業', '調査・コンサルタント業関連', '食料品卸売業,食料雑貨小売業', '心理・精神療法,労働衛生・労働安全コンサルタント業,経営コンサルタント業', 'スポーツ用品製造・卸売業', '喫茶店', '厨房用機械器具・焼却炉製造業', '税理士事務所', '中国料理店', '化学工業薬品製造業', '鉄鋼業', '税理士事務所', 'スイーツ・菓子小売業', '建設業', '映画制作・配給業', '喫茶店', 'カタログ・パンフレット印刷業', '研磨材・研磨剤製品製造業', '割烹,そば（蕎麦）', '司法書士事務所', '喫茶材料小売業', '網・ロープ製造業', 'スポーツ趣味組合,スポーツ団体', '製図・コピー・青写真サービス業', '情報処理サービス業', '水産物卸売業', '水処理装置製造・整備業,化学工業製品製造業', 'おでん料理店', '居酒屋', '接骨・柔道整復', '空港関連事業', '建築設計業', 'デザイン業', '内装工事業', '海運業関連', '不動産取引業', 'ペット関連サービス業,ペット美容室・ショップ', '居酒屋', '生花店', 'ビル管理業,エレベーター工事業,駐車場機械装置製造業', 'ソフトウェアコンサルタント業', '宝石卸売業,宝石加工業,趣味雑貨関連', 'コンピューター関連卸売業,ソフトウェアコンサルタント業', 'そう（惣）菜製造業', '鋼管製造業', 'クレジット・金融関連', '義眼製造業', '分譲住宅リフォーム工事業,内装工事業', '化学工業薬品製造業', '情報処理サービス業', '語学教室関連,翻訳業', 'ソフトウェアコンサルタント業', '建築設計業', 'コンビニエンスストア', 'ファミリーマート', 'ファミリーマート', '自動車修理・整備業,自動車整備・鈑金・塗装業,中古車買取車検代行サービス業', '紙加工品製造業', '人材派遣業', '行政書士事務所', 'フランス料理店,洋食店,レストラン', 'フランス料理店,洋食店,レストラン', 'すき焼き・しゃぶしゃぶ', 'うどん店,そば店,レストラン関連,居酒屋', '和食その他', '結婚相談業', '製本業', '不動産取引業', 'ソフトウェアコンサルタント業', '看板書き業', 'ダンス教室', '食料雑貨小売業', '不動産取引業', 'パン屋・ベーカリー,スイーツ・菓子小売業', '補助的金融商品取引業（ゴルフ・リゾート会員権）,補助的金融商品取引業（リゾート会員権）', '警備業', 'ビジネスホテル', 'キリスト教教会', '福祉施設', 'ケアプラン作成・在宅介護サービス業', '結婚式場業', 'ホテル', 'カイロプラクティック・整体', 'ハウスクリーニング業', '宝石小売業', '楽器店・楽器小売業,楽器製造業', '宝石卸売業,宝石加工業,趣味雑貨関連', 'エネオス', 'ガソリンスタンド', '酒店・酒屋', 'ドラッグストア', '薬店', '居酒屋・スナック・バー関連,バー', 'ダンス教室,舞踊教室', 'カイロプラクティック・整体,マッサージ・鍼灸・各種療法関連,小売関連', 'デザイン業', '和装小物製造・小売業,寺院用具仏壇・仏具店', '経営コンサルタント業', '施設介護サービス業', 'そば店', '観葉植物小売業,生花店,園芸用品店', '居酒屋', '保育所', 'イタリアン（イタリア料理）,パスタ,ワイン,イタリアン・フレンチ,シーフード（シーフード料理）', '図書館', '公共図書館', '図書館(地域)', '団体・組合', '理容店', '薬局・調剤薬局', 'ホテル', 'フレンチ（フランス料理）', '日本料理店関連,食堂,レストラン関連', 'すし店', 'レストラン,グルメ,食事,オールジャンル', '畜産業関連', '不動産取引業', '弁護士事務所', 'カタログ・パンフレット印刷業', '書籍販売取次業', 'うどん店,そば店,日本料理店関連', '労働組合・団体', '旅行業', '税理士事務所', '調査・コンサルタント業関連,Ｍ＆Ａコンサルタント業', 'コンタクトレンズ小売業', '広告業', '広告業', '広告業', '広告業', '広告業', '出版社', '葬儀・葬祭業', '眼鏡小売業', '薬局・調剤薬局', 'うどん店,そば店,郷土料理店', '日用雑貨小売業', '弁当製造業', 'すし店', '和装小物製造・小売業', '洋品雑貨卸売業', '情報処理サービス業', '寺院', 'インテリアクリーニング業,クリーニング業,エアコンクリーニング業,ガラスふきサービス業,清掃・メンテナンス業', '経営コンサルタント業', '皮革製品製造業', '宝石卸売業,宝石加工業,趣味雑貨関連', 'ソフトウェアコンサルタント業', '時計製造業', '地点名', 'ソフトウェア開発業,ソフトウェアコンサルタント業,情報システム開発業', 'ビニール製品製造業', '懐石料理店', '地点名', 'セブン-イレブン', 'リネンサプライ業', '宝石卸売業,宝石小売業,趣味雑貨関連', '鏡製造業', 'クリーニング業', '建築設計業', '製本業', '靴・履物卸売業', '日用品雑貨製造業', '農林水産組合・団体', '時計製造業', '生命保険業,損害保険業,ファイナンシャルプランナー', 'イタリア料理店,イタリア料理店関連', '箱製造業', 'カタログ・パンフレット印刷業', '不動産取引業', '宝石卸売業', 'ダンス教室,スポーツ教室,スポーツクラブ,スポーツ施設運営管理業', '洋品雑貨卸売業', '靴・履物卸売業', '表具業,表装業', '靴・履物卸売業', '宝石卸売業,宝石加工業,趣味雑貨関連', '建設コンサルタント業', '中央、普通郵便局、特定郵便局、簡易郵便局', '美容室・美容院', '食肉小売業', '電気機械器具製造・卸売業', '建築設計業,設計事務所,建設業,建築工事業,木造建築工事業', 'ケース製造業', '新聞事業関連,業界誌・専門誌出版業,各種専門図書出版業', '電子機器・計測器製造業', '出版社', '納骨堂,墓地管理業', '木製品製造業', 'ホテル', '宝石卸売業,宝石加工業,趣味雑貨関連', '文化学術団体', '宝石卸売業,宝石アクセサリー製造業,宝石加工業,趣味雑貨関連', '宝石卸売業,宝石加工業,趣味雑貨関連', '一般土木建築工事業', '宝石小売業', '建築設計業', 'すし店,ふぐ料理店,日本料理店関連,日本料理店,持帰り弁当業', '不動産取引業', '宝石卸売業,宝石加工業,趣味雑貨関連', '美容室・美容院', '地点名', '地域住民団体', '宝石卸売業,宝石加工業,趣味雑貨関連', '動物病院', '衣料関連卸売業関連', 'あん摩マッサージ指圧師', '内装工事業', '各種専門図書出版業', '和食', 'レストラン,グルメ,食事,日本料理・創作和食', '宝石小売業', '広告業', '衣料関連卸売業関連', 'ブランド品買取業', '新聞事業関連', '団体・組合', '団体・組合', '宝石卸売業,宝石小売業', 'ケアプラン作成・在宅介護サービス業', '酒店・酒屋', 'スクリーン印刷業', '居酒屋・スナック・バー関連', '経済組合・団体', '書籍・文具小売業関連', '自動車整備・鈑金・塗装業', '公園、緑地', '衣料品小売業', '漁業協同組合', '水産加工業', '酒店・酒屋', '農林水産組合・団体', '農林水産組合・団体', '総合リース業', '居酒屋・スナック・バー関連', 'その他の自然地名', 'その他の自然地名', '中古車買取・鈑金・塗装業', 'アポロステーション', 'コンクリート工事業', '家具小売業', '居酒屋・スナック・バー関連', '寝具類卸売業, 家具小売業, 羽毛成品製造業', 'エステティックサロン', 'コーヒー専門店', '税理士事務所', '沖縄料理', '接骨・柔道整復', 'インテリア用品小売業', '幼稚園', '電気・事務・設備機器卸売業関連, 電気照明器具製造業', '写真業', '建築塗装工事業', '造船業', '卸売業関連', '警備業, ホームセキュリティサービス業', 'アイスクリームショップ', 'サーティワン', '薬局・調剤薬局', '薬局・調剤薬局', '運送業, 建設機械器具レンタル・リース業', '公民館', '大型専門店（電化・家電）', '電器店', '書籍・文具小売業関連', '靴販売店', '履物小売業', '自動販売機販売・取扱いサービス業', '建築設計業, 設計事務所', '団体・組合', '中古車販売・自動車整備業', '行政書士事務所', 'ホテル, レストラン', '不動産取引業', 'スポーツ用品小売業', '便利屋', '他保険業', '100円ショップ', '小売関連', 'レンタルスペース・貸会場業', 'スイーツ・菓子小売業', '医療・薬・保険衛生関連, 害虫駆除サービス業', 'ラーメン店', '接骨・柔道整復', 'ビルサービス業, 清掃・メンテナンス業', '眼鏡小売業', '地点名', '証明写真機', 'ガソリンスタンド', 'アウトドアショップ, 漁具製造業', '郷土料理店, 居酒屋', 'オートバイ買取・販売・修理業, オートバイ販売業, オートバイ販売・整備業, オートバイ販売・修理業, オートバイ部品・用品オートバイ買取業', '居酒屋', 'ラーメン店', 'セブン - イレブン', 'コンビニエンスストア', 'レストラン関連', '居酒屋, 海鮮（海鮮料理）, 日本料理・郷土料理', 'レストラン関連, 居酒屋', 'うどん, 讃岐うどん, 天ぷら', 'うどん店', '丸亀製麺', 'スポーツ用品・趣味用品小売業関連, スポーツ用品小売業', '不動産取引業', 'クリーニング業, 染抜（しみぬき）業, ふとん丸洗いサービス業, 写真業', 'スーパーマーケット', '水処理装置製造・整備業', 'ケーキショップ, スイーツ・菓子小売業, 菓子製造業', '学習塾', 'インターネット関連サービス業', '美容室・美容院, ヘアデザイナー', 'ガリバー', '税理士事務所', '電話取引業', '建築設計業', '中央、普通郵便局、特定郵便局、簡易郵便局', '歯科技工所', 'スーパーマーケット', 'ホームセンター', '文化・芸能（専門サービス・専門職）関連', '不動産取引業', 'ジョイフル', 'スーパーマーケット', '一般土木建築工事業', '美容室・美容院', 'デイサービス, ケアプラン作成・在宅介護サービス業', '設計事務所', '美容室・美容院', '美容室・美容院', '大型専門店（衣料品）', '日用雑貨小売業, 家具小売業', '音楽教室', 'モスバーガー', 'ハンバーガー店, ファーストフード店', '娯楽用機械器具製造業', '産婦人科', 'クリーニング業', 'レンタルショップ, 物流運搬設備製造業', '設計事務所', '組合・団体関連', '組合・団体関連', '弁当屋', '石材卸売・石材製造業', '建設業', '化粧品製造・小売業', '漁業協同組合', '不動産取引業', 'ホテル', 'ホテル', '葬儀場、斎場', '民宿', 'あん摩マッサージ指圧師,はり師', '日本料理店関連', '割烹・料亭・懐石関連,日本料理店関連', 'プロパンガス業・不動産取引,燃料小売業', '左官業', '建設業', '割ぽう料理店,すし店,日本料理店関連', '清掃・メンテナンス業', '商社', '保育所', '建築工事業', '美容室・美容院,着付け業', '自動車整備・鈑金・塗装業', '清掃・メンテナンス業', 'すし店', '自動車販売業', 'ビル管理業', 'その他の自然地名', '中学', '信用金庫', '信用金庫', '一般土木建築工事業', 'ホテル', 'スーパーマーケット,青果物店・八百屋・果物屋', 'クリーニング業', '石工品製造業', '青果物店・八百屋・果物屋', '一般土木建築工事業', '橋・トンネル', '神社', '釣船業', '運送業', 'デイサービス,訪問介護事業,老人福祉事業,施設介護サービス業,デイケアケアプラン作成業', 'ペンション', 'ペンション', '小売関連,石工品製造業,石材製造業,墓石・みこし製造業', '鮮魚小売業', 'その他のスーパーマーケット', 'スーパーマーケット', 'その他文化施設', '施設介護サービス業', '学習塾', '食肉小売業', 'プロパンガス業・不動産取引', '石材卸売・石材製造業', '設計事務所', '地点名', '建築塗装工事業', 'コンビニエンスストア', 'ローソン', '石材卸売・石材製造業,石材製造業', '理容店', '石材卸売・石材製造業,石材製造業', 'レストラン,カフェ', 'うどん店,そば店,レストラン関連,製めん業', 'すし店,日本料理店関連', '美容室・美容院,着付け業', '石材卸売・石材製造業', '食堂', '果樹作・野菜作サービス業', '博物館', '薬局・調剤薬局', 'IC（有料道路）', '美容室・美容院', '鮮魚小売業', '酒店・酒屋', '日本料理店関連', 'コンビニエンスストア', '石材卸売・石材製造業', 'イタリア料理店,レストラン', 'ホテル', '鉄道路線名', 'ペンション', 'その他のコンビニ', '接骨・柔道整復', 'その他の自然地名', '薬局・調剤薬局', '小売関連', 'その他の自然地名', 'その他の自然地名', '肥料製造業', 'その他の自然地名', 'その他の自然地名', 'ホテル,温泉旅館,旅館,温泉浴場業', 'ファミリーマート', 'コンビニエンスストア', 'ファミリーマート', '民宿', '理容店', '公民館', '履物小売業', '公民館', 'その他の自然地名', 'その他の自然地名', '一般廃棄物処理業', '図書室・公民館', '景観地', '牛乳小売業', '各種情報提供サービス業', '老人福祉施設、有料老人ホーム', 'ケアプラン作成・在宅介護サービス業', '建設業,建築工事業,建設・工事業,木造建築工事業', 'ホテル', 'ホテル', 'ホテル', '駅（JR在来線）', '理容店', 'インテリア用品小売業,壁紙工事業,オーダーカーテン,室内装飾工事業,趣味雑貨関連', 'ドラッグストア', '薬店', '税理士事務所', '小学', '養豚業', '美容室・美容院', 'その他の自然地名', '機械据付工事業', '湖、沼、池、貯水池、潟、人工湖、浦（水部）', '湖、沼、池、貯水池、潟、人工湖、浦（水部）', '書籍・文具小売業関連', '歯科技工所', '山、岳、峰、丘、塚、尾根、頭', 'その他の自然地名', '民宿', '民宿', '区役所、役所、役場の支所、出張所', '小売関連', '食堂', '保育所', 'その他の自然地名', '清掃・メンテナンス業', 'エネオス', 'ガソリンスタンド', 'プロパンガス業・不動産取引,ガソリンスタンド', 'キャンプ場', 'キャンプ場', 'その他の自然地名', '農業協同組合', '農園・農場', '小売関連,農業用機械製造業', '建築リフォーム工事業,建築工事業,建設・工事業', '建設業,建築工事業', '石材卸売・石材製造業,小売関連', '山', 'その他の自然地名', '縫製加工業', 'その他の自然地名', 'その他の自然地名', 'とび工事業,鉄骨・木造建築工事業', '乳製品製造業', '学童保育所', '学童保育所', '焼鳥店', '卵・鳥肉小売業', '燃料小売業,製薪炭業,木炭製造業', 'JCT（高速道路）', 'JCT（高速道路）', '金型機械工具製造業', 'コンビニエンスストア', 'セブン-イレブン', 'コンビニエンスストア', 'ファミリーマート', 'ファミリーマート', '中古住宅売買業,建物売買業,貸家業,土地賃貸業,土地売買業', 'ガソリンスタンド,燃料小売業', 'アポロステーション', 'コーヒー専門店', '自動車修理・整備業,自動車整備・鈑金・塗装業,中古車買取・鈑金・塗装業', '地点名', '病院（動物は除く）', '福祉施設', 'デイサービス', '地点名', '薬局・調剤薬局', '動物病院', '建設業,一般土木建築工事業', '薬局・調剤薬局', '水道業', 'スイーツ・菓子小売業', '自動車販売業,中古車販売・自動車整備業', '税理士事務所', '福祉施設', 'デイサービス,介護老人保健施設', 'デイサービス,介護老人保健施設', 'デイサービス,介護老人保健施設', '有料老人ホーム', 'デイサービス,介護老人保健施設', '美容室・美容院', '薬局・調剤薬局', '地点名', '保育所', 'ガラス工芸品製造業', '薬局・調剤薬局', 'ドラッグストア', '地点名', '訪問介護事業,ケアプラン作成・在宅介護サービス業', '缶・管工事業', '薬店', 'ドラッグストア', 'インテリアクリーニング業,クリーニング業,染抜（しみぬき）業', '公民館', '美容室・美容院', '医療用機器製造業', '食料品卸売業', '書籍・文具小売業関連', '美容室・美容院', 'スポーツ教室,ダンス教室,スポーツクラブ,スポーツ施設運営管理業', '建築リフォーム工事業,空調設備工事業,水道業,風呂釜・浴槽ボイラー設備業,温水器製造業', 'ミシン製造業', '福祉施設', 'カフェ,喫茶店', '鉄鋼業', '婦人子供服製造・卸売業', '書籍・文具小売業関連', '衣料品小売業', '地点名', '調査・コンサルタント業関連', '溶融めっき業', '画廊', '持帰り弁当業', '団体・組合', 'アポロステーション', '自動車部分品・付属品卸売業,自動車洗車業,ガソリンスタンド,燃料小売業', '建築塗装工事業', '薬局・調剤薬局', '運送業', '金融商品取引業（証券業）', 'アミューズメントパーク,テーマパーク,遊園地', '建設業,一般土木建築工事業,舗装工事業', '美容室・美容院', 'タクシー・ハイヤー業', '学習塾,予備校', '薬局・調剤薬局', '日用品雑貨製造・卸売業', '鉄鋼業,溶接業・医療用機器製造業', '自動車販売業', '卸売業関連,金型機械工具製造業', '造船業', '日本料理店関連,日本料理店,居酒屋', '鉄鋼業', '鉄鋼業', '石油精製業', '水産物・海産物卸売業,贈答品小売業', 'ソーラーシステム・太陽光発電製造業', '小学', '鉄鋼業', '労働組合・団体', '食料雑貨小売業', '弁当製造業', 'スイーツ・菓子小売業,おもちゃ・玩具店', 'コンタクトレンズ小売業', '食料雑貨小売業', '電子機器・計測器製造業', '卸売業関連, 育林業, 植木栽培販売・卸売業, 苗木店, 育苗センター', '理容店', '寺院', '駅（JR在来線）', '地点名', '葬儀・葬祭業', 'エネオス', 'ガソリンスタンド', '石材卸売・石材製造業, 小売関連, 鉱山業, 石工品製造業, 石材製造業', '卸売業関連, スポーツ用品小売業', '鉄筋工事業', '洋服店', 'ＩＣ製造業', 'スポーツ教室', '包装・梱包材料小売業, プラスチック加工・製造業', '廃棄物処理業, 清掃・メンテナンス業', '水道衛生設備保守管理業, 水道業, 水道衛生工事・保守業', '自動車中古部品販売業, 自動車整備・解体業, 中古車買取・鈑金・塗装業, 自動販売機販売・取扱いサービス業', 'オートバイ部品・用品オートバイ買取業', '小学', 'その他の自然地名', 'デイサービス, ケアプラン作成・在宅介護サービス業', 'デイサービス, ケアプラン作成・在宅介護サービス業', '中古車買取・鈑金・塗装業', 'ラーメン店', '養鶏業', '美容室・美容院', 'ロボット製造業', '接骨・柔道整復', '町村役場・東京以外の区役所', '電器店, 家電修理業', '経済組合・団体', '養鶏業', 'レストラン関連', '石材卸売・石材製造業, 小売関連, 鉱山業, 石工品製造業, 石材製造業', 'ドラッグストア', '薬店', '衣料品小売業', '設計事務所, 造園業, 一般土木建築工事業, 植木職, 造園工事業', '衣料品小売業', '大型専門店（衣料品）', '中央、普通郵便局、特定郵便局、簡易郵便局', '竹工芸品小売業, 工芸品小売業', '建築リフォーム工事業, 建設業, 建築工事業, 鉄骨・木造建築工事業, 一般土木建築工事業, 木造建築工事業', '公民館', '陶工芸小売業', '洋服店', '駅（JR在来線）', '建設業, 建築工事業, 一般土木建築工事業', '介護移送支援・相談サービス業, ケアプラン作成・在宅介護サービス業, 施設介護サービス業', '水道業, 衛生設備工事業, 給排水工事業', '鮮魚小売業', 'マネキン人形製造業', 'マネキン人形製造業', '建設業', '薬局・調剤薬局', '塾・予備校関連, 学童保育所', 'コンタクトレンズ小売業', '自動車販売業, 中古車買取・鈑金・塗装業', 'ホームセンター', 'ホームセンター', '寺院', '娯楽用機械器具製造業', '近隣公園', '建築リフォーム工事業, 建設業, 建築工事業, 建設・工事業, 一般土木建築工事業, 木造建築工事業', '酒店・酒屋', '神社, 占い師・祈祷師', 'カラオケボックス', '中古車販売・自動車整備業, 自動車修理・整備業, 自動車整備・鈑金・塗装業, 中古車買取・鈑金・塗装業, カーディテイリングショップ', '小売関連, アルミ建材関連業', '生活協同組合', 'インターネット関連サービス業, コンピューター関連卸売業, ソフトウェア開発業, 情報処理サービス業, コンピューター周辺機器製造業', '電子回路設計業', 'クリーニング業, リネンサプライ業', '行政書士事務所', '内装工事業', '焼肉店', 'タクシー・ハイヤー業', '電気機械器具製造・修理業', '韓国料理店', '学習塾', '石材卸売・石材製造業, 小売関連, 石材製造業', '電器店', '大型専門店（電化・家電）', '労働組合・団体', '塾・予備校関連, 学童保育所', '互助会,葬儀・葬祭業', 'デザイン業,カタログ・パンフレット印刷業', '食料品卸売業', '薬局・調剤薬局', 'ドラッグストア', '建築塗装工事業', '化粧品製造・小売業', '化粧品製造・小売業', '清掃・メンテナンス業', '建築リフォーム工事業,建設業', '居酒屋・スナック・バー関連', 'コンビニエンスストア', 'セブン-イレブン', 'ごみ埋立業,清掃・メンテナンス業', '建築リフォーム工事業,介護リフォーム業', 'ラーメン', '銘木製造業', '映像サービス業,ウエディング会場', '公民館', '清掃具レンタル・リース業', 'コンビニエンスストア,たばこ・喫煙具専門小売店,酒店・酒屋', 'セブン-イレブン', 'ニコニコレンタカー', 'エアコンクリーニング業,ガラスふきサービス業,清掃・メンテナンス業,人材紹介所・人材バンク,家事サービス業', 'ガソリンスタンド', 'アポロステーション', 'ペット美容室・ショップ', '薬局・調剤薬局', '中学', 'タイル製造業', '中古車販売・自動車整備業', 'トランクルーム,倉庫業関連,貸倉庫業,レンタルスペース・貸会場業', 'ハウスクリーニング業,清掃・メンテナンス業', '小学', 'リフレクソロジー,エステティックサロン', 'プロパンガス業・不動産取引', '証明写真機', 'オートバイ買取・販売・修理業,オートバイ販売業,オートバイ販売・整備業,オートバイ整備・修理・中古オートバイ販売業,オートバイ販売・修理業,オートバイ部品・用品オートバイ買取業', '居酒屋・スナック・バー関連,カラオケ喫茶', '化粧品製造・小売業,スポーツ用品・趣味用品小売業関連,ビューティーアドバイザー,プロポーションメーキング,エステティックサロン', '清掃・メンテナンス業,清掃具レンタル・リース業', '中央、普通郵便局、特定郵便局、簡易郵便局', '100円ショップ', '１００円ショップ', '携帯ショップ', '電話取引業', '弁護士事務所', '建築リフォーム工事業,建設業,建築工事業', '贈答品小売業', '学習塾', 'コインランドリー', '不動産取引業', '自動車販売業,中古車販売・自動車整備業', '点字図書館', '福祉施設,図書館,学校教材関連', 'ドーナツショップ,ファーストフード店', 'はちみつ加工業', '興信所', '通信設備工事業', '福祉施設', 'アオキ', '洋服店', '中古住宅売買業,建物売買業,土地売買業,不動産取引業', '建築リフォーム工事業,建築工事業,内装工事業', '業務用洗濯機製造業', 'ピザ店,レストラン,洋食店', '自動車修理・整備業,中古車買取・鈑金・塗装業,自動車整備業', '大学院・大学', '社会生活組合・団体', 'ロボット製造業', '出版社', '家具小売業,ふとん丸洗いサービス業,レンタルショップ,ふとんレンタル・リース業,羽毛成品製造業', 'スポーツ趣味組合', '人形製造・小売業', '建築工事業,建設・工事業', '青果物店・八百屋・果物屋', '家電修理業', 'デイサービス,介護移送支援・相談サービス業', '餃子店', 'レンタルショップ', 'レンタルビデオ・ＤＶＤ・ＣＤ店', '接骨・柔道整復', '造園業', '洋食店', '家具店', '化粧品製造・小売業', '青果物店・八百屋・果物屋', '運送業', '代行サービス業,行政書士事務所', '地方銀行', '串焼き', '葬儀場、斎場', 'クリーニング業', 'キャンプ場', 'ペンション', '自動車販売業, 自動車修理・整備業, 自動車整備・鈑金・塗装業', '和食', 'ペット美容室・ショップ', '温泉旅館', '建築工事業', '医療・薬・保険衛生関連, 害虫駆除サービス業', '民宿', '青果物卸売業', '中古車販売・自動車整備業', '酒店・酒屋', '建築工事業, 大工', '民宿', '食堂', '温泉地', 'すし店', '理容店', '旅館', '電気工事業', '居酒屋', '美容室・美容院', '人間ドック老人福祉施設', '旅館', '衣料品小売業, 衣服裁縫修理業', '居酒屋', '郷土料理店', '置き薬', '建築工事業', '接骨・柔道整復', 'エネオス', 'ガソリンスタンド', 'ガソリンスタンド', 'ガソリンスタンド', 'ペンション', '寺院', '鮮魚小売業', '寺院', '花の名所', '人材派遣業, サービス業関連', '農業協同組合', '民宿', '民宿', '公民館', 'あん摩マッサージ指圧師, カイロプラクティック・整体', 'スーパーマーケット', 'その他のスーパーマーケット', '酒店・酒屋', '民宿', '建築板金業', '食料雑貨小売業', '名所・観光地等', '中央、普通郵便局、特定郵便局、簡易郵便局', '衣料品小売業', '地点名', '貸別荘', '中古車買取・鈑金・塗装業', 'ペット美容室・ショップ', 'アウトドアショップ', '温泉旅館, 旅館', '土地家屋調査士事務所', '造園業', 'ドライブイン', '名所・観光地等', '地点名', '製材業', '自動車修理・整備業, 自動車整備・鈑金・塗装業', '旅館', '菓子製造業', 'レストラン関連', '旅館', '水道業, 井戸工事業, 衛生設備工事業, 給排水工事業, 水道衛生工事・保守業', 'キャンプ場', '懐石・会席料理', '民宿', '民宿', 'アルミ建材関連業', 'エネオス', 'ガソリンスタンド', '民宿', '食堂, ドライブイン', '建築設計業', '運送業', '体育館', '産業廃棄物処分業', 'デイサービス, 在宅介護サービス業, 施設介護サービス業', '喫茶店', '喫茶店', 'うどん店, そば店']
