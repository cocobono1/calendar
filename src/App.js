import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import logo from './logo.svg';
import './App.css';

function App() {
  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(null);
  // 일정 목록을 상태로 관리
  const [events, setEvents] = useState([]);

  // 선택한 날짜를 포맷
  const formatDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('ko-KR', options);
  };

  // 날짜가 변경될 때 호출
  const handleDateChange = date => {
    setSelectedDate(date);
    // 선택한 날짜가 변경될 때 일정 초기화
    setEvents([]);
  };

  // 일정 추가
  const addEvent = (calendarTitle, dateTime, calendarContent) => {
    const newEvent = { calendarTitle, dateTime, calendarContent };
    // 기존의 일정 목록에 새로운 일정을 추가
    setEvents([...events, newEvent]);
  };

  // 일정 수정 
  const editEvent = (index, calendarTitle, dateTime, calendarContent) => {
    const updatedEvent = { calendarTitle, dateTime, calendarContent };
    const updatedEvents = [...events];
    // 해당 인덱스의 일정
    updatedEvents[index] = updatedEvent;
    setEvents(updatedEvents);
  };

  // 일정 삭제
  const deleteEvent = index => {
    const updatedEvents = [...events];
    // 해당 인덱스의 일정을 제거
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  return (
    <div className="App"> 
      <h1>Promise Keeper</h1> 
      <Calendar onChange={handleDateChange} value={selectedDate} /> {/* 캘린더 컴포넌트를 렌더링하고, 날짜가 변경될 때 호출되는 함수를 전달*/}
      {/* 선택된 날짜가 있는 경우에만 일정을 표시 */}
      {selectedDate && (
        <div>
          {/* 선택된 날짜를 화면에 출력 */}
          <h2>{formatDate(selectedDate)}</h2>
          {/* 일정 목록을 출력 */}
          {events.map((event, index) => (
            <div key={index}>
              {/* 일정의 제목과 날짜, 내용을 출력 */}
              <h3>{event.calendarTitle}</h3>
              <p>Date and Time: {event.dateTime}</p>
              <p>Content: {event.calendarContent}</p>
              {/* 일정을 수정하고 삭제하는 버튼을 추가*/}
              <button onClick={() => editEvent(index, 'New Title', 'New Date and Time', 'New Content')}>일정 수정</button>
              <button onClick={() => deleteEvent(index)}>일정 삭제</button>
            </div>
          ))}
          {/* 일정을 추가하는 버튼을 추가 */}
          <button onClick={() => addEvent('New Event', '2024-04-28 14:00', 'Event Content')}>일정 추가</button>
        </div>
      )}
    </div>
  );
}

export default App;
