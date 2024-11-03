// クライアントサイドでのレンダリングを有効にする
'use client'

// 必要なライブラリとコンポーネントをインポート
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Bot, Heart, HelpCircle, MessageSquare, Star } from "lucide-react"

// メインコンポーネント
export default function Component() {
  // 現在表示中のビューを管理するstate
  const [currentView, setCurrentView] = useState("post-creation")

  // 表示するコンテンツを切り替えるための関数
  const renderContent = () => {
    switch (currentView) {
      case "post-creation":
        return <PostCreationView />
      case "how-to-use":
        return <HowToUseView />
      case "contact":
        return <ContactView />
      case "free-consultation":
        return <FreeConsultationView />
      default:
        return <PostCreationView />
    }
  }

  return (
    // メインレイアウト - 画面全体をフレックスボックスで構成
    <div className="flex h-screen bg-pink-50">
      {/* サイドバー - メニューを含む左側のパネル */}
      <div className="w-64 bg-white border-r border-pink-100 p-4 shadow-sm">
        <div className="space-y-4">
          <div className="font-bold text-lg mb-6 text-pink-700">メニュー</div>
          {/* 投稿作成ボタン */}
          <button
            onClick={() => setCurrentView("post-creation")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full w-full text-left transition-all ${
              currentView === "post-creation"
                ? "bg-pink-100 text-pink-700"
                : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            <Bot className="w-5 h-5" />
            <span className="font-medium">投稿作成</span>
          </button>
          {/* 使い方ボタン */}
          <button
            onClick={() => setCurrentView("how-to-use")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full w-full text-left transition-all ${
              currentView === "how-to-use"
                ? "bg-pink-100 text-pink-700"
                : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">ツールの使い方</span>
          </button>
          {/* お問い合わせボタン */}
          <button
            onClick={() => setCurrentView("contact")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full w-full text-left transition-all ${
              currentView === "contact"
                ? "bg-pink-100 text-pink-700"
                : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">お問い合わせ</span>
          </button>
          {/* 無料相談ボタン */}
          <button
            onClick={() => setCurrentView("free-consultation")}
            className={`flex items-center space-x-2 px-4 py-2.5 rounded-full w-full text-left transition-all ${
              currentView === "free-consultation"
                ? "bg-pink-100 text-pink-700"
                : "text-gray-600 hover:bg-pink-50"
            }`}
          >
            <Star className="w-5 h-5" />
            <span className="font-medium">無料スポット相談</span>
          </button>
        </div>
      </div>

      {/* メインコンテンツエリア - 右側のパネル */}
      <div className="flex-1 p-8 bg-gradient-to-b from-pink-50 to-white">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー部分 */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 text-transparent bg-clip-text">
              リール動画台本自動生成ツール
            </h1>
            {/* お気に入りボタン */}
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-pink-600 hover:text-pink-700 hover:bg-pink-100"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* 選択されたビューのコンテンツを表示 */}
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

// 投稿作成ビューコンポーネント
function PostCreationView() {
  // フォームデータの状態管理
  const [formData, setFormData] = useState({
    theme: '',
    target: '',
    instructions: '',
    url: ''
  });
  // ローディング状態の管理
  const [isLoading, setIsLoading] = useState(false);
  // 生成されたスクリプトの状態管理
  const [generatedScript, setGeneratedScript] = useState('');
  // エラー状態の管理
  const [error, setError] = useState('');

  // フォーム送信処理
  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // 内部APIエンドポイントにリクエスト
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
      }

      const data = await response.json();
      setGeneratedScript(data.answer);
      
    } catch (error) {
      console.error('エラー:', error);
      setError('生成中にエラーが発生しました。もう一度お試しください。');
    } finally {
      setIsLoading(false);
    }
  };

  // 入力フィールドの変更ハンドラ
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <>
      {/* タブコンポーネント */}
      <Tabs defaultValue="plot" className="space-y-6">
        {/* タブリスト */}
        <TabsList className="bg-pink-100/50 p-1 rounded-full">
          <TabsTrigger
            value="plot"
            className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:text-pink-700"
          >
            動画台本生成
          </TabsTrigger>
          <TabsTrigger
            value="data"
            className="rounded-full px-6 data-[state=active]:bg-white data-[state=active]:text-pink-700"
          >
            データ登録
          </TabsTrigger>
        </TabsList>

        {/* 動画台本生成タブのコンテンツ */}
        <TabsContent value="plot">
          <Card className="border-pink-100 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-medium mb-4 text-pink-700">
                    生成指示：作りたいリール動画台本自動生成ツールのイメージを入力
                  </h2>
                  <div className="space-y-4">
                    {/* テーマ入力フィールド */}
                    <div>
                      <Label htmlFor="theme" className="text-pink-700">
                        テーマ：
                      </Label>
                      <Input
                        id="theme"
                        value={formData.theme}
                        onChange={handleInputChange}
                        placeholder="例：AIマネタイズ"
                        className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </div>
                    {/* ターゲット入力フィールド */}
                    <div>
                      <Label htmlFor="target" className="text-pink-700">
                        ターゲット：
                      </Label>
                      <Input
                        id="target"
                        value={formData.target}
                        onChange={handleInputChange}
                        placeholder="例：AIツールを活用して0→1達成したい20代の若い人"
                        className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </div>
                    {/* 台本概要入力フィールド */}
                    <div>
                      <Label htmlFor="instructions" className="text-pink-700">
                        台本の概要：
                      </Label>
                      <Textarea
                        id="instructions"
                        value={formData.instructions}
                        onChange={handleInputChange}
                        placeholder="台本の概要や主要なポイントを簡潔に記入してください"
                        className="min-h-[100px] rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                      />
                    </div>
                  </div>
                </div>

                {/* 参考URL入力フィールド */}
                <div>
                  <Label htmlFor="url" className="text-pink-700">
                    参考URL
                  </Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    placeholder="https://"
                    className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
                  />
                </div>

                {/* アクションボタン */}
                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    className="rounded-full border-pink-200 text-pink-700 hover:bg-pink-50"
                  >
                    全データ削除
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  >
                    {isLoading ? '送信中...' : '送信'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* データ登録タブのコンテンツ */}
        <TabsContent value="data">
          <Card className="border-pink-100 shadow-lg rounded-2xl">
            <CardContent className="pt-6">
              <div className="min-h-[400px] flex items-center justify-center text-pink-400">
                データ登録フォームがここに表示されます
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 生成結果表示エリア */}
      <Card className="mt-6 border-pink-100 shadow-lg rounded-2xl">
        <CardContent className="pt-6">
          <h2 className="text-lg font-medium mb-4 text-pink-700">生成結果</h2>
          <div className="min-h-[200px] p-4">
            {isLoading ? (
              <div className="flex items-center justify-center text-pink-400">
                生成中...
              </div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : generatedScript ? (
              <div className="whitespace-pre-wrap text-gray-700">
                {generatedScript}
              </div>
            ) : (
              <div className="flex items-center justify-center text-pink-400">
                生成結果：動画台本が表示されます
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

// 使い方ビューコンポーネント
function HowToUseView() {
  return (
    <Card className="border-pink-100 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-pink-700">ツールの使い方</h2>
        <p className="text-gray-600">
          このツールの使用方法に関する詳細な説明がここに表示されます。ステップバイステップのガイドや、よくある質問への回答などが含まれます。
        </p>
      </CardContent>
    </Card>
  )
}

// お問い合わせビューコンポーネント
function ContactView() {
  return (
    <Card className="border-pink-100 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-pink-700">お問い合わせ</h2>
        <p className="text-gray-600 mb-4">
          ご質問やご意見がございましたら、以下のフォームからお問い合わせください。
        </p>
        {/* お問い合わせフォーム */}
        <form className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-pink-700">
              お名前
            </Label>
            <Input
              id="name"
              placeholder="山田 太郎"
              className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-pink-700">
              メールアドレス
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@example.com"
              className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="message" className="text-pink-700">
              メッセージ
            </Label>
            <Textarea
              id="message"
              placeholder="お問い合わせ内容をご記入ください"
              className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            送信
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

// 無料相談ビューコンポーネント
function FreeConsultationView() {
  return (
    <Card className="border-pink-100 shadow-lg rounded-2xl">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold mb-4 text-pink-700">無料スポット相談</h2>
        <p className="text-gray-600 mb-4">
          AIツールの活用方法や、ビジネスへの導入についての無料相談を承っております。以下のフォームから予約をお願いします。
        </p>
        {/* 無料相談予約フォーム */}
        <form className="space-y-4">
          <div>
            <Label htmlFor="consultation-name" className="text-pink-700">
              お名前
            </Label>
            <Input
              id="consultation-name"
              placeholder="山田 太郎"
              className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="consultation-email" className="text-pink-700">
              メールアドレス
            </Label>
            <Input
              id="consultation-email"
              type="email"
              placeholder="example@example.com"
              className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="consultation-date" className="text-pink-700">
              希望日時
            </Label>
            <Input
              id="consultation-date"
              type="datetime-local"
              className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <div>
            <Label htmlFor="consultation-topic" className="text-pink-700">
              相談内容
            </Label>
            <Textarea
              id="consultation-topic"
              placeholder="相談したい内容を簡単にご記入ください"
              className="rounded-xl border-pink-200 focus:border-pink-500 focus:ring-pink-500"
            />
          </div>
          <Button className="rounded-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
            予約する
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}