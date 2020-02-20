import React from 'react';

const TodayInfo = () => {
  const date = (() => {
      const date = new Date()
      let year = date.getFullYear()
      let mon = date.getMonth() + 1
      let day = date.getDate()
      return {
          today: year + "-" + (mon < 10 ? "0" + mon.toString() : mon) + "-" + (day < 10 ? "0" + day.toString() : day),
          weekDay: date.getDay()
      }
  })()
  const weekDayList = ['日', '一', '二', '三', '四', '五', '六']
  const ICLastNumber = (date) => {
    if(date.weekDay === 0) return '不限'
    return (date.weekDay%2 === 1)? '1,3,5,7,9' : '2,4,6,8,0';
  }
  return (
    <div className="today-info bg-info text-white">
      <div className="d-flex justify-content-between">
        <div className="text-center">
          <div className="text-lg text-shadow">星期{weekDayList[date.weekDay]}</div>
          <div className="text-sm">{date.today}</div>
        </div>
        <div className="text-right">
          <div className="text-right text-sm mb-1">7天限購一次<br/>成人限購2片，兒童限購4片</div>
          <div className="text-sm text-dark d-inline-block notice-info">身份證末碼 <b className="text-danger">{ICLastNumber(date)}</b> {(date.weekDay === 0)? '皆':''}可購買口罩</div>
        </div>
      </div>
    </div>
  )
}

export default TodayInfo;
