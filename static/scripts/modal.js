// 点击结点，在对应位置显示悬浮窗
$(() =>
{
    const $icons = $('.icon');
    const $main = $('#main');
    $icons.click(async (e) =>
    {
        const {top, left} = $(e.target).position();
        const $modal = $(`<div class="modal" data-fornodeid="1">
    <div class="modalHeaderArea">
        <div class="modalHeader">结点信息</div>
        <div class="modalClose">×</div>
    </div>
    <div class="modalBody">
        <div class="area idArea">
            <span>ID:</span>
            <span class="nodeId">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
        </div>
        <div class="area">
            <span>ID:</span>
            <span class="nodeId">aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</span>
        </div>
        <div class="area formArea">
            <label>输入框标签<input type="text"></label>
            <div class="radioArea">
                <span class="radioContent">标签</span>
                <label class="radioContent"><input type="checkbox">是</label>
                <label class="radioContent"><input type="checkbox">否</label>
            </div>
        </div>
    </div>
    <div class="modalFooter">
        <div class="btnArea">
            <button class="btn confirmBtn">确定</button>
            <button class="btn cancelBtn">取消</button>
        </div>
    </div>
</div>`);
        $modal.css({
            display: 'none',
            left: left,
            top: top < 50 ? 50 : top > 480 ? 480 : top
        });

        $modal.find('.modalClose').click(async (e) =>
        {
            e.preventDefault();
            await fadeOutAsync($modal, 150);
            $modal.remove();
        });
        $modal.find('.cancelBtn').click(async (e) =>
        {
            e.preventDefault();
            await fadeOutAsync($modal, 150);
            $modal.remove();
        });

        $main.append($modal);

        await fadeInAsync($modal, 150);
    });
});