# TodoApp

React、TypeScript、Tailwind CSS を使用し、ローカルストレージでデータを永続化した「Todoアプリ」です。

## アプリの機能
### (1) 期限順にソート
このボタンを押すことで期限順にソートすることができます。

### (2) 優先度順にソート
このボタンを押すことで優先度順にソートすることができます。

### (3) 新しいタスクの追加
このボタンを押すとポップアップが出現し、タスクのステータスを設定することで新規タスクが追加されます。

### (4) 完了済みタスクの削除
このボタンを押すことで完了済みのタスクを削除することができます。

### (5) タスクの個別削除
タスクの☆の右側にある✘印を押すことでタスクを個別に削除することができます。

### (6) 期限によるUIの変化
期限の24時間になると、背景のUIが薄黄色に変化し目立つようになります。
期限を過ぎたものは、背景のUIが薄黄色になり文字が赤色になります。

### (7) メモ機能
新規タスクの追加時にメモを設定できます。
メモがリンクの場合はクリックすることでリンク先に飛ぶことができます。

## こだわった点
　特にこだわった点は「期限によるUIの変化」と「メモ機能」の２点です。
「期限によるUIの変化」では、
`dayjs(todo.deadline).isAfter(today) && dayjs(todo.deadline).isBefore(tomorrow) && "bg-yellow-100 text-yellow-800",
dayjs(todo.deadline).isBefore(today) && "bg-yellow-100 text-red-500"`

## 開発履歴

- 2024年10月24日：プロジェクト開始

## ライセンス

MIT License

Copyright (c) 2024 ksk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.