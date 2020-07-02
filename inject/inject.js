$(function () {
    $("<input type='button' value='添加新书签' id='addBookmark' class='custom_btn'>").insertBefore("#su");
    $('.s_form').css('width','800px');
    $('.s_btn_wr').css('width','220px');
    $('#addBookmark').click(function () {
        // 发送消息到content js
        window.postMessage({cmd: 'addBookmark',title: 'new bookmark'}, '*')
    });
})