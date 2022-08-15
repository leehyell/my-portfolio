document.addEventListener('scroll', function() {
    var currentScrollValue = document.documentElement.scrollTop;
    if(currentScrollValue > 0) {
        $('.header_nickname').addClass('nick_on');
    }else {
        $('.header_nickname').removeClass('nick_on');
    }
});
var window_name = window.location.href;
if(window_name.includes('?type=work') == true) {
    //하는일
    $('.about_nav').removeClass('about_nav_on');
    $('.about_nav2').addClass('about_nav_on');
    $('.about_box').hide();
    $('.about_work').show();
}else {
    //연혁
    $('.about_nav').removeClass('about_nav_on');
    $('.about_nav1').addClass('about_nav_on');
    $('.about_box').hide();
    $('.about_history').show();
}
function workReadMore() {
    $('#work_info_txt').toggleClass('no_overflow');
    if($('.work_readmore_btn').text() == '더보기') {
        $('.work_readmore_btn').text('감추기');
    }else {
        $('.work_readmore_btn').text('더보기');
    }
}
function getTime() {
    var clockTarget = document.getElementById("today_time");
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var clockDate = date.getDate();
    var day = date.getDay();
    var week = ['일', '월', '화', '수', '목', '금', '토']; 
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    clockTarget.value = `${year}.${month+1}.${clockDate}(${week[day]})` +
    ` ${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }`;

    if(`${week[day]}` != '월' || `${week[day]}` != '화' || `${week[day]}` != '수' || `${week[day]}` != '목' || `${week[day]}` != '금') {
        //평일
        document.getElementById('btn_call').classList.add('profile_disabled');

        if(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }` < '18:30:00') {
            document.getElementById('btn_call').classList.add('profile_disabled');
        }else {
            document.getElementById('btn_call').classList.remove('profile_disabled');
        }
    }else {
        //주말
        document.getElementById('btn_call').classList.remove('profile_disabled');
        
        if(`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes }`  : minutes }:${seconds < 10 ? `0${seconds }`  : seconds }` < '11:00:00') {
            document.getElementById('btn_call').classList.add('profile_disabled');
        }else {
            document.getElementById('btn_call').classList.remove('profile_disabled');
        }
    }
}
function timeLoad() {
    getTime();
    setInterval(getTime, 1000);
};

function callTo(ths) {
    var ths_id = ths.dataset.id;
    if($('#'+ths_id).hasClass('profile_disabled') == true) {
        $('#warning_txt').show();
    }else {
        $('#warning_txt').hide();
        window.location.href='tel:010-6449-6852';
    }
}
function smsTo() {
    window.location.href='sms:010-6449-6852';
}
function mailTo() {
    window.location.href='mailto:helena1005@naver.com';
}

//작품모음
function calendarOnOff(ths) {
    var calendar_id = ths.dataset.id;
    if(window_name.includes('type=list') && $('#'+calendar_id).hasClass('calendar_on') == true) {
        window.location.href = 'javascript:location.replace("my_work.html?type=list&calendar_status=off")';
    }else if(window_name.includes('type=list') && $('#'+calendar_id).hasClass('calendar_on') == false) {
        window.location.href = 'javascript:location.replace("my_work.html?type=list&calendar_status=on")';
    }else if(window_name.includes('type=pic') && $('#'+calendar_id).hasClass('calendar_on') == true) {
        window.location.href = 'javascript:location.replace("my_work.html?type=pic&calendar_status=off")';
    }else if(window_name.includes('type=pic') && $('#'+calendar_id).hasClass('calendar_on') == false) {
        window.location.href = 'javascript:location.replace("my_work.html?type=pic&calendar_status=on")';
    }
};
if(window_name.includes('calendar_status=on') == true) {
    $('#calendar_icon').addClass('calendar_on');
    $('#calendarForm').show();
    $('.work_choose_btn1').attr('href', 'javascript:location.replace("my_work.html?calendar_status=on&type=pic")');
    $('.work_choose_btn2').attr('href', 'javascript:location.replace("my_work.html?calendar_status=on&type=list")');
    $('.pic_row_a').show();
    calendarMake();
}else {
    $('#calendar_id').removeClass('calendar_on');
    $('#calendarForm').hide();
    $('.work_choose_btn1').attr('href', 'javascript:location.replace("my_work.html?calendar_status=off&type=pic")');
    $('.work_choose_btn2').attr('href', 'javascript:location.replace("my_work.html?calendar_status=off&type=list")');
    $('.pic_row_a').show();
}
function calendarMake() {
    calendarMaker($("#calendarForm"), new Date());
};
var nowDate = new Date();
var todayDate = new Date();
var td_year = todayDate.getFullYear();
var td_month = todayDate.getMonth() + 1;
var td_day = todayDate.getDate();
$('#today_txt').text(td_year+'년 '+('0'+td_month).slice(-2)+'월 '+('0'+td_day).slice(-2)+'일');
function calendarMaker(target, date, date2) {
    if (date == null || date == undefined) {
        date = new Date();
    }
    if (date2 == null || date2 == undefined) {
        date2 = new Date();
    }
    nowDate = date;
    todayDate = date2;
    if ($(target).length > 0) {
        var year = nowDate.getFullYear();
        var year2 = todayDate.getFullYear();
        var month = nowDate.getMonth() + 1;
        var month2 = todayDate.getMonth() + 1;
        var day = todayDate.getDate();
        $(target).empty().append(assembly(year, month));
    } else {
        console.error("custom_calendar Target is empty!!!");
        return;
    }
    var thisMonth = new Date(nowDate.getFullYear(), nowDate.getMonth(), 1);
    var thisLastDay = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, 0);
    var tag = "<tr>";
    var cnt = 0;
    //빈 공백 만들어주기
    for (i = 0; i < thisMonth.getDay(); i++) {
        tag += "<td></td>";
        cnt++;
    }

    //날짜 채우기
    for (i = 1; i <= thisLastDay.getDate(); i++) {
        if (cnt % 7 == 0) { tag += "<tr>"; }
        if(year + '' + ('0'+month).slice(-2) + '' + ('0'+i).slice(-2) == year2 + ('0'+month2).slice(-2) + ('0'+day).slice(-2)) {//오늘 날짜
            tag += "<td id="+ (year+ '' + ('0'+month).slice(-2) + '' + ('0'+i).slice(-2)) +" class='calendar_td td_today'>" + ('0'+i).slice(-2) + "</td>";
        }else {
            tag += "<td id="+ (year+ '' + ('0'+month).slice(-2) + '' + ('0'+i).slice(-2)) +" class='calendar_td'>" + ('0'+i).slice(-2) + "</td>";
        }
        cnt++;
        if (cnt % 7 == 0) {
            tag += "</tr>";
        }
    }
    $(target).find("#custom_set_date").append(tag);
    calMoveEvtFn();

    function assembly(year, month) {
        var calendar_html_code =
            "<table class='custom_calendar_table'>" +
            "<thead class='cal_date'>" +
            "<th><button type='button' class='prev'><img src='./img/calendar_before.svg' alt=''></button></th>" +
            "<th colspan='5' class='date_title'><p><span>" + year + "</span>년 <span>" + ('0'+month).slice(-2) + "</span>월</p></th>" +
            "<th><button type='button' class='next'><img src='./img/calendar_after.svg' alt=''></button></th>" +
            "</thead>" +
            "<thead  class='cal_week'>" +
            "<th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th>" +
            "</thead>" +
            "<tbody id='custom_set_date'>" +
            "</tbody>" +
            "</table>";
        return calendar_html_code;
    }
    function calMoveEvtFn() {
        //전달 클릭
        $(".custom_calendar_table").on("click", ".prev", function () {
            nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth() - 1, nowDate.getDate());
            calendarMaker($(target), nowDate);

            $('#today_txt').text(td_year + '년 ' + ('0'+td_month).slice(-2) + '월 ' + ('0'+td_day).slice(-2) + '일');
            $('.pic_row_a').show();
            $('.no_data_txt').hide();
        });
        //다음날 클릭
        $(".custom_calendar_table").on("click", ".next", function () {
            nowDate = new Date(nowDate.getFullYear(), nowDate.getMonth() + 1, nowDate.getDate());
            calendarMaker($(target), nowDate);
            
            $('#today_txt').text(td_year + '년 ' + ('0'+td_month).slice(-2) + '월 ' + ('0'+td_day).slice(-2) + '일');
            $('.pic_row_a').show();
            $('.no_data_txt').hide();
        });
        //일자 선택 클릭
        $(".custom_calendar_table").on("click", "td", function () {
            if($(this).hasClass('select_day') == true) {
                $(".custom_calendar_table .select_day").removeClass("select_day");
                $(this).removeClass("select_day").addClass("select_day");
            }else {
                $(".custom_calendar_table .select_day").removeClass("select_day");
                $('#today_txt').text(td_year + '년 ' + ('0'+td_month).slice(-2) + '월 ' + ('0'+td_day).slice(-2) + '일');
                $('.pic_row_a').show();
                $('.no_data_txt').hide();
            }
        });
    }
    $('#20200603').append('<span class="work_in work_end"></span>');
    $('#20220616').append('<span class="work_in work_end"></span>');
    $('#20210222').append('<span class="work_in work_end"></span>');
    $('#20210331').append('<span class="work_in work_end"></span>');
    $('#20220707').append('<span class="work_in work_end"></span>');
    $('#20220810').append('<span class="work_in work_end"></span>');
    
    $('.calendar_td ').on('click', function() {
        var ths_td_id = $(this).attr('id');
        $('#today_txt').text($('.date_title p').text() + ' '+ $(this).text() + '일');
        $('.pic_row_a').hide();
        if($(this).find('span').hasClass('work_in') == true) {
            $('#work_'+ths_td_id).show();
            $('#work'+ths_td_id).show();
            $('.no_data_txt').hide();
        }else {
            $('.no_data_txt').show();
        };
        $(this).toggleClass("select_day");
    });
}
console.log(window_name);
if(window_name.includes('type=list') == true) {
    //리스트
    $('.work_choose_btn').removeClass('work_choose_on ');
    $('.work_choose_btn2').addClass('work_choose_on ');
    $('.work_choose_box').hide();
    $('.work_choose_list').show();
    $('.pic_whole_nocalendar').hide();
    $('.list_whole_nocalendar').show();
}else {
    //사진
    $('.work_choose_btn').removeClass('work_choose_on ');
    $('.work_choose_btn1').addClass('work_choose_on ');
    $('.work_choose_box').hide();
    $('.work_choose_pic').show();
    $('.pic_whole_nocalendar').show();
    $('.list_whole_nocalendar').hide();
}

//gallery
function ivClick(ths) {
    popShow();
    var ths_type = ths.dataset.type;
    var ths_id = ths.dataset.id;
    var ths_src = ths.dataset.src;
    var ths_alt = ths.dataset.alt;
    var ths_date = ths.dataset.date;

    if(ths_type == 'image') {
        $('#gallery_video').hide();
        $('#'+ths_id).show();
        $('#'+ths_id).attr('src', ths_src);
        $('.img_video_type span').text('이미지');
    }else if(ths_type == 'video') {
        $('#gallery_img').hide();
        $('#'+ths_id).show();
        $('#'+ths_id).attr('src', ths_src);
        $('.img_video_type span').text('비디오');
    }
    $('#'+ths_id).attr('alt', ths_alt);
    $('.img_video_info').text(ths_alt);
    $('.img_video_date').text(ths_date);
}
function popShow() {
    $('body').css('overflow', 'hidden');
    $('.img_video_whole').show();
}
function popHide() {
    $('body').css('overflow', 'auto');
    $('.img_video_whole').hide();
    $('.img_video_info').text('');
    $('#gallery_img').attr('src', '');
    $('#gallery_video').attr('src', '');
}