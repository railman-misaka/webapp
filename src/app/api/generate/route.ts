import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('受信したデータ:', body);
    
    // バリデーション
    if (!body.theme || !body.target || !body.instructions) {
      return NextResponse.json(
        { error: '必須項目が入力されていません' },
        { status: 400 }
      );
    }

    // テスト用のモックレスポンス
    const mockResponse = {
      answer: `
# 動画台本

## テーマ
${body.theme}

## ターゲット
${body.target}

## 概要
${body.instructions}

## 構成
1. オープニング
2. メインコンテンツ
3. クロージング
      `.trim()
    };

    return NextResponse.json(mockResponse);

  } catch (error) {
    console.error('詳細なエラー:', error);
    return NextResponse.json(
      { error: 'サーバーでエラーが発生しました' },
      { status: 500 }
    );
  }
} 