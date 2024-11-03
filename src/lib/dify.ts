// Dify APIクライアントの実装
export class DifyClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    // 環境変数から設定を読み込み
    this.apiKey = process.env.DIFY_API_KEY!;
    this.baseUrl = 'https://api.dify.ai/v1';
  }

  async generateScript(inputs: {
    theme: string;
    target: string;
    instructions: string;
    reference_url: string;
  }) {
    const response = await fetch(`${this.baseUrl}/completion-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        inputs,
        response_mode: 'blocking',
        user: 'user-123'
      })
    });

    if (!response.ok) {
      throw new Error('APIリクエストに失敗しました');
    }

    return response.json();
  }
} 