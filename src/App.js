import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import logo from './logo.svg';
import './App.css';

function App() {
  // 선택한 날짜
  const [selectedDate, setSelectedDate] = useState(null);
  // 시간 입력 상태 관리
  const [selectedHour, setSelectedHour] = useState(0);
  const [selectedMinute, setSelectedMinute] = useState(0);
  // 제목과 내용 입력 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // 일정 목록을 상태로 관리
  const [events, setEvents] = useState([]);

  // 선택한 날짜를 포맷
  const formatDate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return date.toLocaleDateString('ko-KR', options);
  };

  // 시간 변경 시 호출
  const handleHourChange = e => {
    setSelectedHour(parseInt(e.target.value));
  };

  const handleMinuteChange = e => {
    setSelectedMinute(parseInt(e.target.value));
  };

  // 제목과 내용 변경 시 호출
  const handleTitleChange = e => {
    setTitle(e.target.value);
  };

  const handleContentChange = e => {
    setContent(e.target.value);
  };

  // 날짜가 변경될 때 호출
  const handleDateChange = date => {
    setSelectedDate(date);
    // 선택한 날짜가 변경될 때 일정 초기화
    setEvents([]);
  };

  // 날짜를 가공하여 원하는 형식으로 표시
  const formatDateTime = (date, hour, minute) => {
    const formattedDate = date.toLocaleDateString();
    const formattedTime = `${hour}:${minute}`;
    return `${formattedDate} ${formattedTime}`;
  };

  // 일정 추가
  const addEvent = () => {
    const dateTime = formatDateTime(selectedDate, selectedHour, selectedMinute);
    const newEvent = { calendarTitle: title, dateTime, calendarContent: content };
    // 기존의 일정 목록에 새로운 일정을 추가
    setEvents([...events, newEvent]);
  };

  // 일정 수정
  const editEvent = (index, updatedTitle, updatedContent) => {
  // 해당 인덱스의 일정을 호출
  const updatedEvent = { ...events[index] };
  // 제목과 내용을 업데이트
  updatedEvent.calendarTitle = title || updatedTitle; // 만약 입력한 값이 없으면 기존 값 사용
  updatedEvent.calendarContent = content || updatedContent; // 만약 입력한 값이 없으면 기존 값 사용
  // 해당 인덱스의 일정을 업데이트
  const updatedEvents = [...events];
  updatedEvents[index] = updatedEvent;
  // 업데이트된 일정 목록을 상태에 반영
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
      <div className="calendar-container">
        <Calendar onChange={handleDateChange} value={selectedDate} /> {/* 캘린더 컴포넌트를 렌더링하고, 날짜가 변경될 때 호출되는 함수를 전달*/}
      </div>
      {/* 선택된 날짜가 있는 경우에만 일정을 표시 */}
      {selectedDate && (
        <div>
          {/* 선택된 날짜를 화면에 출력 */}
          <h2>{formatDate(selectedDate)}</h2>
          {/* 시간 입력 폼 */}
          <div>
            <input type="number" value={selectedHour} onChange={handleHourChange} />
            <label>시간:</label>
            <input type="number" value={selectedMinute} onChange={handleMinuteChange} />
            <label>분:</label>
          </div>
          {/* 제목과 내용 입력 폼 */}
          <div>
            <label>제목:</label>
            <input type="text" value={title} onChange={handleTitleChange} />
            <label>내용:</label>
            <input type="text" value={content} onChange={handleContentChange} />
          </div>
          {/* 일정 목록을 출력 */}
          {events.map((event, index) => (
            <div key={index}>
              {/* 일정의 제목과 날짜, 내용을 출력 */}
              <h3>{event.calendarTitle}</h3>
              <p>날짜와 시간: {event.dateTime}</p>
              <p>내용: {event.calendarContent}</p>
              {/* 일정을 수정하고 삭제하는 버튼을 추가*/}
              <button onClick={() => editEvent(index, 'New Title', 'New Content')}>일정 수정</button>
              <button onClick={() => deleteEvent(index)}>일정 삭제</button>
            </div>
          ))}
          {/* 일정을 추가하는 버튼을 추가 */}
          <button onClick={addEvent}>일정 추가</button>
        </div>
      )}
    </div>
  );
}

export default App;
