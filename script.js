// 封筒をタップしたとき
function openEnvelope() {
    const envelope = document.getElementById('envelope');
    const wrapper = document.getElementById('postcard-wrapper');

    // 封筒を少し透明にして下にずらす
    envelope.style.opacity = '0.5';
    envelope.style.transform = 'translateY(50px)';
    envelope.style.pointerEvents = 'none'; // 連続タップ防止

    // ポストカードを表示して飛び出させる
    wrapper.classList.remove('hidden');
    wrapper.classList.add('popup');
}

// ポストカードをタップしたとき
function flipCard() {
    const postcard = document.getElementById('postcard');
    const instruction = document.getElementById('instruction');
    const sound = document.getElementById('birthday-sound'); // 音源を取得

    // すでに裏返っているなら何もしない（重複処理を防ぐ）
    if (postcard.classList.contains('flipped')) return;

    // 1. カードを裏返す
    postcard.classList.add('flipped');
    instruction.style.visibility = 'hidden';

    // 2. 裏返った瞬間に音源を再生する
    if (sound) {
        sound.currentTime = 0; // 再生位置を先頭に戻す
        sound.play().catch(error => {
            console.log("音声の自動再生がブロックされました:", error);
        });
    }

    // 3. メッセージを1行ずつ表示する（裏返りアニメーション完了後）
 // 3. メッセージを1行ずつ表示する
    setTimeout(() => {
        const lines = document.querySelectorAll('.msg-line');
        const closeBtn = document.getElementById('close-btn');
        // 文章を1行ずつ表示
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('show');
            }, index * 800);
        });
        // 最後の文章の表示が終わってからボタンを表示
        const displayTime = lines.length * 800 + 600;
        setTimeout(() => {
            if (closeBtn) {
                closeBtn.classList.add('show');
                console.log('閉じるボタンを表示しました');
            } else {
                console.log('閉じるボタンが見つかりません');
            }
        }, displayTime);
    }, 600);
}

// script.js の一番下（ファイルの末尾）にまるごと追加

function closeCard(event) {
    // ボタンのタップがカード全体のタップとして連動してしまうのを防ぐ
    event.stopPropagation();

    const envelope = document.getElementById('envelope');
    const wrapper = document.getElementById('postcard-wrapper');
    const postcard = document.getElementById('postcard');
    const instruction = document.getElementById('instruction');
    const lines = document.querySelectorAll('.msg-line');
    const closeBtn = document.getElementById('close-btn');

    // 1. メッセージと閉じるボタンを非表示（初期状態）に戻す
    lines.forEach(line => line.classList.remove('show'));
    if (closeBtn) closeBtn.classList.remove('show');

    // 2. 少し遅らせてカードを表（猫の面）に戻す
    setTimeout(() => {
        postcard.classList.remove('flipped');
    }, 200);

    // 3. さらに少し遅らせてカードを封筒の中に隠し、封筒を元通りにする
    setTimeout(() => {
        wrapper.classList.remove('popup');
        wrapper.classList.add('hidden');

        // 封筒を元の位置・透明度に戻し、再度タップできるようにする
        envelope.style.opacity = '1';
        envelope.style.transform = 'translateY(0)';
        envelope.style.pointerEvents = 'auto';
        
        // 案内テキストを再表示
        instruction.style.visibility = 'visible';
    }, 600);
}