import React, { useMemo, useState } from 'react'
import './QuizPage.css'
import { useChatbaseWidget } from '../hooks/useChatbaseWidget';

type Choice = {
  id: string
  text: string
}

type Question = {
  id: string
  text: string
  choices: Choice[]
  correctId: string
  explanation?: string
}

const sampleQuestions: Question[] = [
  {
    id: 'q1',
    text: 'Chủ tịch Hồ Chí Minh sinh năm nào?',
    choices: [
      { id: 'a', text: '1890' },
      { id: 'b', text: '1895' },
      { id: 'c', text: '1900' },
      { id: 'd', text: '1911' },
    ],
    correctId: 'a',
    explanation: 'Bác Hồ sinh ngày 19/5/1890 tại Kim Liên, Nam Đàn, Nghệ An.'
  },
  {
    id: 'q2',
    text: 'Tác phẩm "Đường Kách Mệnh" ra đời vào khoảng thời gian nào?',
    choices: [
      { id: 'a', text: '1925-1927' },
      { id: 'b', text: '1930-1931' },
      { id: 'c', text: '1941-1945' },
      { id: 'd', text: '1946-1950' },
    ],
    correctId: 'a',
    explanation: 'Đường Kách Mệnh tập hợp các bài giảng của Nguyễn Ái Quốc tại Quảng Châu (1925-1927).'
  },
  {
    id: 'q3',
    text: '"Cần, kiệm, liêm, chính" là nội dung thuộc hệ giá trị nào trong tư tưởng Hồ Chí Minh?',
    choices: [
      { id: 'a', text: 'Giá trị văn hoá' },
      { id: 'b', text: 'Đạo đức cách mạng' },
      { id: 'c', text: 'Chủ nghĩa xã hội' },
      { id: 'd', text: 'Đường lối kháng chiến' },
    ],
    correctId: 'b',
    explanation: 'Cần, kiệm, liêm, chính, chí công vô tư là những chuẩn mực đạo đức cách mạng.'
  },
  {
    id: 'q4',
    text: 'Năm nào Việt Nam giành độc lập, khai sinh nước Việt Nam Dân chủ Cộng hoà?',
    choices: [
      { id: 'a', text: '1930' },
      { id: 'b', text: '1945' },
      { id: 'c', text: '1954' },
      { id: 'd', text: '1975' },
    ],
    correctId: 'b',
    explanation: 'Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.'
  },
  {
    id: 'q5',
    text: 'Theo Bác Hồ, “Dễ trăm lần không dân cũng chịu, khó vạn lần dân liệu cũng xong” thể hiện nguyên tắc nào?',
    choices: [
      { id: 'a', text: 'Lấy dân làm gốc' },
      { id: 'b', text: 'Công – nông – trí' },
      { id: 'c', text: 'Đoàn kết quốc tế' },
      { id: 'd', text: 'Tự lực tự cường' },
    ],
    correctId: 'a',
    explanation: 'Tư tưởng “lấy dân làm gốc” thể hiện nhất quán trong quan điểm của Hồ Chí Minh.'
  },
]

const QuizPage: React.FC = () => {
  useChatbaseWidget(false);  // Hide widget on quiz page

  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const total = sampleQuestions.length
  const q = sampleQuestions[current]

  const score = useMemo(() => {
    return sampleQuestions.reduce((acc, qu) => acc + (answers[qu.id] === qu.correctId ? 1 : 0), 0)
  }, [answers])

  const progressPct = Math.round(((current) / total) * 100)

  const handleSelect = (choiceId: string) => {
    setAnswers(prev => ({ ...prev, [q.id]: choiceId }))
  }

  const next = () => {
    if (current < total - 1) setCurrent(c => c + 1)
  }

  const prev = () => {
    if (current > 0) setCurrent(c => c - 1)
  }

  const submit = () => {
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const restart = () => {
    setAnswers({})
    setCurrent(0)
    setSubmitted(false)
  }

  return (
    <div className="quiz-page">
      <div className="quiz-card" role="region" aria-labelledby="quiz-title">
        <header className="quiz-header">
          <h1 id="quiz-title">Trắc nghiệm Tư tưởng Hồ Chí Minh</h1>
          <p className="quiz-subtitle">Chọn đáp án đúng cho mỗi câu hỏi. Bạn có thể chuyển câu trước/sau.</p>

          <div className="quiz-progress" aria-label={`Tiến độ: ${progressPct}%`}>
            <div className="quiz-progress__bar" style={{ width: `${Math.max(progressPct, (submitted ? 100 : progressPct))}%` }} />
            <span className="quiz-progress__text">Câu {current + 1}/{total}</span>
          </div>
        </header>

        {!submitted ? (
          <section className="quiz-body">
            <div className="quiz-question">
              <div className="quiz-question__index">Câu {current + 1}</div>
              <div className="quiz-question__text">{q.text}</div>
            </div>

            <div className="quiz-choices" role="list">
              {q.choices.map(ch => {
                const selected = answers[q.id] === ch.id
                return (
                  <button
                    key={ch.id}
                    role="listitem"
                    className={`quiz-choice ${selected ? 'is-selected' : ''}`}
                    onClick={() => handleSelect(ch.id)}
                    aria-pressed={selected}
                  >
                    <span className="quiz-choice__bullet" aria-hidden>
                      {selected ? '●' : '○'}
                    </span>
                    <span>{ch.text}</span>
                  </button>
                )
              })}
            </div>

            <div className="quiz-actions">
              <button className="hcm-btn" onClick={prev} disabled={current === 0}>Trước</button>
              {current < total - 1 ? (
                <button className="hcm-btn hcm-btn--primary" onClick={next} disabled={!answers[q.id]}>Sau</button>
              ) : (
                <button className="hcm-btn hcm-btn--primary" onClick={submit} disabled={!answers[q.id]}>Nộp bài</button>
              )}
            </div>
          </section>
        ) : (
          <section className="quiz-result" role="status" aria-live="polite">
            <div className="quiz-score">
              <div className="quiz-score__value">{score}/{total}</div>
              <div className="quiz-score__label">Số câu đúng</div>
            </div>

            <div className="quiz-review">
              {sampleQuestions.map((qu, idx) => {
                const user = answers[qu.id]
                const isCorrect = user === qu.correctId
                const correctText = qu.choices.find(c => c.id === qu.correctId)?.text
                const userText = qu.choices.find(c => c.id === user)?.text || '—'
                return (
                  <div key={qu.id} className={`review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
                    <div className="review-item__head">
                      <span className="review-item__index">Câu {idx + 1}</span>
                      <span className={`badge ${isCorrect ? 'badge--success' : 'badge--danger'}`}>{isCorrect ? 'Đúng' : 'Sai'}</span>
                    </div>
                    <div className="review-item__question">{qu.text}</div>
                    <div className="review-item__answers">
                      <div className="answer-row"><span className="label">Bạn chọn:</span> <span>{userText}</span></div>
                      <div className="answer-row"><span className="label">Đáp án đúng:</span> <span>{correctText}</span></div>
                    </div>
                    {qu.explanation && (
                      <div className="review-item__explain">{qu.explanation}</div>
                    )}
                  </div>
                )
              })}
            </div>

            <div className="quiz-actions">
              <button className="hcm-btn" onClick={restart}>Làm lại</button>
              <a className="hcm-btn hcm-btn--primary" href="#/">Về trang chủ</a>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

export default QuizPage
