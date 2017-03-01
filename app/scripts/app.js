'use strict';

/**
 * @ngdoc overview
 * @name remainingDays
 * @description
 * # remainingDays
 *
 * Main module of the application.
 */
var app = angular.module('remainingDays');

app.directive('remainingDay', function ($interval) {
    return {
        restrict: 'E',
        scope: {
            date: '@end'
        },
        template: '{{remaining}}',
        link: function (scope, element, attrs) {
            var year = scope.date.substring(0, 4);
            var month = scope.date.substring(5, 7);
            var day = scope.date.substring(8, 10);
            var end = new Date(year, month - 1, day, 0, 0, 0, 0); // 이벤트 날짜 및 시간 ( Month 는 -1하여 등록 );

            var today = new Date(); // 현재
            if (year == today.getFullYear()
                && month == today.getMonth() + 1
                && day == today.getDate()) {
                scope.remaining = 'D-DAY';
            } else {
                var dateInterval = $interval(function () {
                    var now = new Date(); // 현재
                    var gap = end.getTime() - now.getTime(); // 이벤트 종료 갭
                    var dd = Math.floor((gap / (1000 * 60 * 60 * 24))); // 남은 날짜
                    var hh = Math.floor((gap / (1000 * 60 * 60)) % 24) + ( dd * 24 ); // 남은 시간
                    var mm = Math.floor((gap / (1000 * 60)) % 60); // 남은 분
                    var ss = Math.floor((gap / 1000) % 60); // 남은 초
                    if (hh < 0) {
                        scope.remaining = 'End';
                        $interval.cancel(dateInterval);
                    } else {
                        hh = hh < 10 ? '0' + hh : hh;
                        mm = mm < 10 ? '0' + mm : mm;
                        ss = ss < 10 ? '0' + ss : ss;
                        scope.remaining = hh + ' : ' + mm + ' : ' + ss;
                    }
                }, 1000);
            }
        }
    };
});

